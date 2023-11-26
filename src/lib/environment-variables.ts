// the domain the app is hosted on (for auth purposes)
export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "";
// the chainId or chain name that the app is running on.
export const APP_NETWORK = process.env.NEXT_PUBLIC_APP_NETWORK || "mumbai";
// the NFT Collection contract address for the receipts
export const NFT_RECEIPTS_ADDRESS =
  process.env.NEXT_PUBLIC_NFT_RECEIPTS_ADDRESS || "";
// the relayer url (to enable gasless transactions)
export const RELAYER_URL = process.env.NEXT_PUBLIC_OPENZEPPELIN_URL || "";
// paper wallet client ID (to enable email wallet)
export const PAPER_CLIENT_ID = process.env.NEXT_PUBLIC_PAPER_CLIENT_ID || "";
// thirdweb client id (to use certain thirdweb services)
export const THIRDWEB_CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ""; 
// thirdweb client secret key (if using on server)
export const THIRDWEB_SECRET_KEY = process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY || ""; 
// pipedream url for contact form 
export const PIPEDREAM_URL =  process.env.PIPEDREAM_URL || "";