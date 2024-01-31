import React, { useState, useEffect } from 'react';
import { Product } from "@/types";
import {
  AspectRatio,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Tag,
  Text,
  Skeleton,
  background,
  Box
} from "@chakra-ui/react";
import Link from "next/link";
import { useContract, useNFT, ThirdwebNftMedia } from "@thirdweb-dev/react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, title, description, handle, assetContract } = product;
  const contractData = useContract(assetContract?.value);
  const nftData = useNFT(contractData?.contract || null, '0');
  const [hasCheckedNFT, setHasCheckedNFT] = useState(false);

  const contract = assetContract ? contractData.contract : null;
  const { data: nft, isLoading, error } = contract ? nftData : { data: null, isLoading: false, error: null };


  const isGated = product.tags.includes("gated");
  const src = product.images.edges[0].node.originalSrc;
  const alt = product.images.edges[0].node.altText;

  useEffect(() => {
    if (nft || error) {
      setHasCheckedNFT(true);
    }
  }, [nft, error]);

  return (
    <Card
      as={LinkBox}
      key={id}
      bg="transparent"
      h="full"
      shadow="none"
      borderWidth={1}
      borderColor="transparent"
      _hover={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
      position="relative"
      maxW="300px"
    >
      {isGated && (
        <Tag
          position="absolute"
          color="white"
          top={0}
          right={61}
          zIndex={1}
          p={2}
          bg="#1F1F1F"
          border="1px solid #525252"
          fontWeight={600}
        >
          <Image mr={1} src="/lock.svg" alt="lock" h="4" /> Members Exclusive
        </Tag>
      )}
      <CardBody>
        <Box borderRadius="lg" overflow="hidden">
          {!assetContract ? (
            <AspectRatio ratio={1}>
              <Skeleton
                isLoaded={false}
                startColor="gray.500"
                endColor="gray.700"
              />
            </AspectRatio>
          ) : !hasCheckedNFT || isLoading ? (
            <AspectRatio ratio={1}>
              <Skeleton
                isLoaded={hasCheckedNFT && !isLoading}
                startColor="gray.500"
                endColor="gray.700"
              />
            </AspectRatio>
          ) : error ? (
            <Text color="red.500">Error loading NFT.</Text>
          ) : nft ? (
            <ThirdwebNftMedia
              metadata={nft.metadata}
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            /> 
          ) : (
            <AspectRatio ratio={1}>
              <Box width="100%" height="100%">
                <Image
                  objectFit="contain"
                  src={src}
                  alt={alt}
                  borderRadius="lg"
                />
              </Box>
            </AspectRatio>
          )}
        </Box>
        <Flex direction="column" gap={2} mt={4}>
          <Flex align="center" justify="space-between">
            <LinkOverlay as={Link} href={`/products/${handle}`}>
              <Heading size="md">{title}</Heading>
            </LinkOverlay>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};
