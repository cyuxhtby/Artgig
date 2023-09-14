import React from 'react';
import Link from 'next/link';
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
  Button,
  Grid,
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
    return <Text mt={20} align="center" fontSize="xx-large" fontWeight="bold">Sign in to view your collectables</Text>;
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
    <Container maxW="container.xl" py={8}>
      <Flex direction="column" align="center" justify="center">
        <Text mb={16} mt={12} fontSize="2xl" fontWeight="bold">Your Digital Pieces</Text>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} width="100%">
          {allData.map((nft, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md">
              <Box width="100%" maxWidth="200px" mx="auto">
                <ThirdwebNftMedia metadata={nft.metadata} width="100%" />
              </Box>
              <Text mt={2} fontSize="lg" fontWeight="bold" textAlign="center">{nft.metadata.name}</Text>
              <Text mt={1} fontSize="md" textAlign="center">{nft.metadata.description}</Text>
            </Box>
          ))}
        </Grid>

        <Link href="/export" passHref>
          <Button
            as="a"
            mt={16}
            mb={16}
            variant="outline"
            borderColor="white"
            color="white"
            size="lg"
            _hover={{
              backgroundColor: "rgba(255, 255, 255, 0.2)"
            }}
          >
            Export collection
          </Button>
        </Link>

      </Flex>
    </Container>
  );
}

export default Collectables;
