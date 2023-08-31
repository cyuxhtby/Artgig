import type { NextApiRequest, NextApiResponse } from "next";
import { prepareGaslessRequest, SDKOptions, SmartContract, ThirdwebSDK, isExtensionEnabled} from "@thirdweb-dev/sdk/evm";
import crypto from "crypto";
import { shopifyFetchAdminAPI } from "@/lib/utils";
import { GET_ORDER_BY_ID_QUERY } from "@/queries";
import { Readable } from "stream";
import {
  APP_NETWORK,
  RELAYER_URL,
  THIRDWEB_SECRET_KEY
} from "@/lib/environment-variables";
import https from "https";
import { Metafield } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

interface Data {}

type PurchasedItems = {
    id: string;
    quantity: number;
    assetContract?: {
      value: string;
      type: string;
    };
    variant: {
        id: string;
        price: {
            amount: number;
        };
        product: {
            id: string;
            title: string;
            description: string;
            featuredImage: {
                id: string;
                url: string;
            };
            assetContract?: Metafield;
        };
    };
    customAttributes: {
      key: string;
      value: string;
    }[];
}[]

type ResponseBody = {
  data: {
    order: {
      id: string;
      tags: string[];
      lineItems: {
        edges: {
          node: {
            id: string;
            quantity: number;
            assetContract?: { 
              value: string;
              type: string;
            };
            variant: {
              id: string;
              price: {
                amount: number;
              };
              product: {
                id: string;
                title: string;
                description: string;
                featuredImage: {
                  id: string;
                  url: string;
                };
                assetContract?: Metafield;
              }
            };
            customAttributes: {
              key: string;
              value: string;
            }[];
          };
        }[];
      };
    };
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    console.time("beforeMint")
    const secretKey = process.env.SHOPIFY_WEBHOOK_KEY as string;

    const hmac = req.headers["x-shopify-hmac-sha256"];
    const body = await getRawBody(req);
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(body)
      .digest("base64");

    // Compare our hash to Shopify's hash
    if (hash === hmac) {
      const shopifyOrderId = req.headers["x-shopify-order-id"];

      const response = await shopifyFetchAdminAPI({
        query: GET_ORDER_BY_ID_QUERY,
        variables: {
          id: `gid://shopify/Order/${shopifyOrderId}`,
        },
      });

      if (!response || !response.body || !response.body.data || !response.body.data.order) {
        console.error("Invalid or incomplete response from Shopify:", response);
        // Log the errors object for more details
        if (response.body && response.body.errors) {
          console.error("Shopify Errors:", JSON.stringify(response.body.errors, null, 2));
        }
        res.status(500).send("Invalid response from Shopify");
        return;
      }

      const respBody = response.body as ResponseBody;

      if (!respBody.data.order.lineItems) {
        res.status(500).send("Order did not contain any line items");
        return;
      }

      const itemsPurchased = respBody.data.order.lineItems.edges.map(
        (edge) => edge.node,
      );

      
      // Warning: use of `any`
      const productContract: string | any = itemsPurchased[0].variant.product.assetContract?.value;


      let wallet = "";
      try {
        wallet =
          itemsPurchased[0].customAttributes.find(
            (e: any) => e.key === "wallet",
          )?.value || "";
      } catch (e) {
        console.log("error getting wallet address", e);
      }

      const sdkOptions: SDKOptions | undefined = RELAYER_URL
        ? {
            secretKey: THIRDWEB_SECRET_KEY,
            gasless: {
              openzeppelin: { relayerUrl: RELAYER_URL },
            },
          }
        : undefined;

      const sdk = ThirdwebSDK.fromPrivateKey(
        process.env.GENERATED_PRIVATE_KEY as string,
        APP_NETWORK,
        sdkOptions,
      );
        
      const nftCollection = await sdk.getContract(productContract);
    

    
      console.time("prepare")
      // For each item purchased, mint the wallet address an NFT
      const claimPromises = itemsPurchased.map(async (item) => {
        // Grab the information of the product ordered
        const product = item.variant.product;

        // claim lazy minted NFT
        // Warning: use of `any` 
        const preparedTx : any = await nftCollection.erc721.claimTo.prepare(wallet, item.quantity);
       

        return preparedTx;
      });

      console.timeLog("prepare")

      console.time("minting")
      // Await all promises to resolve
      await Promise.all(claimPromises)
        .then((txs) => Promise.all(txs.map(async (tx) => {
          const request = await prepareGaslessRequest(tx);
          const url = new URL(request.url);
          const options = {
            hostname: url.hostname,
            path: url.pathname + url.search,
            method: request.method,
          };
          await new Promise<void>((resolve, reject) => {
            const req = https.request(options);
            req.on("error", (err) => {
              console.log("error", err);
              reject(err);
            });

            req.write(request.body);
            req.end(() => {
              console.log("Delegated Request");
              resolve();
            })
          });
        })))
        .catch((err) => {
        console.error("Error in minting process:", err);
      });
      console.timeLog("minting")
      console.timeEnd("beforeMint")

      res.status(200).send("OK");
    } else {
      res.status(403).send("Forbidden");
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Something went wrong");
    return;
  }
}