import { SimpleTokenGate } from "@/CommerceKit/Gates/simple-gate";
import { NormalProduct } from "@/components/Products/NormalProduct";
import { UpsellModal } from "@/CommerceKit/Upsells/UpsellModal";
import { NFT_RECEIPTS_ADDRESS } from "@/lib/environment-variables";
import { getAllProducts, getProductByHandle } from "@/lib/shopify";
import { GraphQLProducts, Product } from "@/types";
import { FiPackage } from "react-icons/fi";
import { RiVipDiamondFill } from "react-icons/ri";

import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
  useDisclosure,
  useNumberInput,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useState } from "react";
import { mutate } from "swr";
import { DigitalToPhysical } from "@/components/DigitalToPhysical";



const Product: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  product,
}) => {
  const toast = useToast();
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    valueAsNumber,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: product?.tags?.includes("gated") ? 1 : 10,
  });
  const incrementProps = getIncrementButtonProps();
  const decrementProps = getDecrementButtonProps();
  const inputProps = getInputProps();
  const [selectedSize, setSelectedSize] = useState({
    id: product?.variants?.edges?.[0].node.id,
    title: product?.variants?.edges?.[0].node.title
  });

  const [activeView, setActiveView] = useState<'product' | 'nft'>('product');

  const isGated = product?.tags?.includes("gated");

  const handleAddToCart = async () => {
    try {
      const quantity = valueAsNumber;
      const merchandiseId = selectedSize.id;

      await fetch("/api/cart/addLine", {
        method: "POST",
        body: JSON.stringify({
          quantity,
          merchandiseId,
          productHandle: product.handle,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await mutate("/api/cart");
      toast({
        title: "Added to cart",
        description: "Your item has been added to your cart",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const GateComponent = isGated
    ? SimpleTokenGate
    : ({ children }: any) => children;

  // const isSpecialProduct = product.title === "Special Product";

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GateComponent gateContractAddress={NFT_RECEIPTS_ADDRESS}>
      <Container maxW={{ base: "100vw", lg: "container.page" }} px={0} py={6} mb={{ base: 16, lg: 0}}>
        <Box mb={4}>
          <Link href="/products">
            <Text color="#646D7A" mb={4}>&larr; Back to all products</Text>
          </Link>
        </Box>
        {/* Main content area */}
        <Flex direction={{ base: "column", lg: "row" }} h={{ lg: "100vh" }} >
          {/* Scrollable column for images */}
          <Box >
            <DigitalToPhysical product={product} activeView={activeView} setActiveView={setActiveView} />
          </Box>        
          {/* Fixed column for product information */}
          <Box
            position={{base: "relative", lg: "fixed"}}
            top="8"
            right="0"
            h={{ base: "auto", lg: "100vh" }}
            w={{ base: "full", lg: "50%" }}
            p={{ base: 4, lg: 20 }}
            zIndex="2" //above overlay 
          >
            <Flex direction="column" gap={4} h="full" justify="center" alignItems="start">
              <Heading as="h1" fontSize="40px" mb={3}>
                {product.title}
              </Heading>
              <Text fontSize="lg" color="#646D7A" >
                {product.description}
              </Text>
              <Text fontSize="lg" color="#F0F0F" mb={1}>
                {product.variants.edges[0].node.priceV2.amount}{" "}
                {product.variants.edges[0].node.priceV2.currencyCode}
              </Text>
              
              <Box mt={2} mb={-4}>
                <IconButton
                  icon={<FiPackage size={24} />}
                  aria-label="Show Product"
                  variant={activeView === 'product' ? 'solid' : 'outline'}
                  onClick={() => setActiveView('product')}
                  m="4px"
                />
                <IconButton
                  icon={<RiVipDiamondFill size={20} />}
                  aria-label="Show NFT"
                  variant={activeView === 'nft' ? 'solid' : 'outline'}
                  onClick={() => setActiveView('nft')}
                  m="4px"
                />
                <Text color="#646D7A" style={{ paddingTop: "10px" } } ><i>Both items included</i></Text>
              </Box>
              <Box w={{ base: '100%', lg: '100%' }}>
                <NormalProduct
                  product={product}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  incrementProps={incrementProps}
                  openModal={onOpen}
                  decrementProps={decrementProps}
                  inputProps={inputProps}
                  handleAddToCart={handleAddToCart}
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
      <UpsellModal isOpen={isOpen} onSubmit={handleAddToCart} onClose={onClose} />
    </GateComponent>
  );
};

export default Product;

export interface ProductProps {
  product: Product;
}

export const getStaticProps: GetStaticProps<ProductProps> = async (ctx) => {
  const params = ctx.params;
  if (!params || !params.handle) {
    return {
      notFound: true,
    };
  }
  const handle = params.handle as string;
  try {
    const product = await getProductByHandle(handle);
    if (!product) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { body } = await getAllProducts();
  const products = body.data.products as GraphQLProducts;
  return {
    fallback: "blocking",
    paths: products.edges.map(({ node }) => ({
      params: {
        handle: node.handle,
      },
    })),
  };
};
