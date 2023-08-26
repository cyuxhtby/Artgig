import React from 'react';
import {
  useAddress,
  useContract,
  useOwnedNFTs,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import {
    Box,
    Button,
    Container,
    Flex,
    Text,
    Spinner,
    Center,
} from "@chakra-ui/react";

const contractAddress = "0xeAB3244339655A43b4DbDB831eb9FeDf6089dCdB";


const Collectables: React.FC = () => {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useOwnedNFTs(contract, address);
  

  // Log errors for debugging
  if (error) {
    console.error("Error fetching NFTs:", error);
  }

  // Check if wallet is connected
  if (!address) {
    return <Text mt={12} align="center" fontSize="xx-large">Sign in to view your collectables</Text>;
  }

  // Render loading state
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  } 

  // Render error state
  if (error || !data) {
    return <Box>Error fetching collectables</Box>;
  }

  if (data && data.length === 0) {
    return <Text mt={12} align="center" fontSize="xx-large">"You don&apos;t have any collectables yet. Purchase a product to get started!"</Text>;
  }

  return (
    <Container>
      <Flex direction="column" align="center" justify="center">
        <Text mt={8} fontSize="xx-large">Your Collectables</Text>
        {data.map((nft, index) => (
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
