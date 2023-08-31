import React from 'react';
import {
  useAddress,
  useContract,
  useOwnedNFTs,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import {
  Box,
  Container,
  Flex,
  Text,
  Spinner,
  Center,
} from "@chakra-ui/react";

const useFetchNFTs = (contractAddress: string) => {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useOwnedNFTs(contract, address);
  return { data, isLoading, error };
};

const Collectables: React.FC = () => {
  const address = useAddress();
  const contractAddresses = [
    "0x120C07FB4170f5102528a5c6Cf1324106CD44f0f",
    "0x5fDCeC241e0dEB47441fd94Ff7DEa82b8847e0c1",
    // Add more contract addresses here
  ];

  const nftDataArray = contractAddresses.map(useFetchNFTs);

  const allData = nftDataArray.flatMap(({ data }) => data || []);
  const isLoading = nftDataArray.some(({ isLoading }) => isLoading);
  const error = nftDataArray.find(({ error }) => error)?.error;

  // Check if wallet is connected
  if (!address) {
    return <Text mt={12} align="center" fontSize="xx-large">Sign in to view your collectables</Text>;
  }

  // Log errors for debugging
  if (error) {
    console.error("Error fetching NFTs:", error);
    return <Box>Error fetching collectables</Box>;
  }

  // Render loading state
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  } 

  // If user has no collectables
  if (allData.length === 0) {
    return <Text mt={12} align="center" fontSize="xx-large">You don&apos;t have any collectables yet. Purchase a product to get started!</Text>;
  }

  return (
    <Container>
      <Flex direction="column" align="center" justify="center">
        <Text mt={8} fontSize="xx-large">Your Collectables</Text>
        {allData.map((nft, index) => (
          <Box key={index} mb={1}>
            <ThirdwebNftMedia metadata={nft.metadata} width="6rem" />
            <Text mt={1} fontSize="lg" fontWeight="bold">{nft.metadata.name}</Text>
            <Text mt={1} fontSize="md">{nft.metadata.description}</Text>
          </Box>
        ))}
      </Flex>
    </Container>
  );
}

export default Collectables;
