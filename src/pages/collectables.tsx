import React from 'react';
import {
  useClaimNFT,
  useContract,
  Web3Button,
  useAddress,
  useNFT,
  ThirdwebNftMedia,
  ConnectWallet
} from "@thirdweb-dev/react";
import {
    Box,
    Button,
    Container,
    Flex,
    Text,
} from "@chakra-ui/react";

const contractAddress: string = "0x95dD8aFfBeBB813F554e0F75fd99E0a110673813";

const Mint: React.FC = () => {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { mutateAsync: claimNft } = useClaimNFT(contract);
  const { data: nft, isLoading, error } = useNFT(contract, '0');
  
  // Render loading state
  if (isLoading) {
    console.log(error);
    return <Box>Loading...</Box>;
  } 
  
  // Render error state
  if (error || !nft) return <Box>NFT not found</Box>;

  return (
    <Container>
    <Flex direction="column" align="center" justify="center">
      <ThirdwebNftMedia metadata={nft.metadata} width="6rem" />
      <Text my={4}>Lovley NFT</Text> {/* Replace "NFT Title" with the actual title of your NFT */}
      <ConnectWallet
      theme="dark"
      btnTitle="Connect Wallet"
      />
      <Web3Button
        contractAddress={contractAddress}
        action={() =>
          claimNft({
            to: address, // Use useAddress hook to get current wallet address
            quantity: 1, // Amount of NFTs to claim
          })
        }
      >
        Mint Now
      </Web3Button>
    </Flex>
  </Container>
  );
}

export default Mint;
