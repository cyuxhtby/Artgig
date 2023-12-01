import React from 'react';
import { Box, Heading, Text, List, ListItem, ListIcon, Link } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

const InfoPage = () => {
  return (
    <Box p={{ base: 4, md: 8 }} pb={8}>
      <Heading as="h1" size={{base: "lg", md: "2xl"}} mb={4}>Digital Collectibles</Heading>
      
      <Text fontSize={{ base: "sm", md: "xl" }} mb={4}>
        Digital collectibles are individual, virtual items stored on a blockchain. They can represent anything from artwork and music to virtual real estate and beyond. Each collectible is verified for authenticity and ownership using blockchain technology.
      </Text>

      <Heading as="h2" size={{base: "lg", md: "xl"}} mb={4}>Benefits in E-Commerce</Heading>
      <List spacing={3} mb={4}>
        <ListItem fontSize={{ base: "sm", md: "md" }}>
          <ListIcon as={MdCheckCircle} color="green.500" />
          <strong>Ownership:</strong> Verified through blockchain, ensuring that each collectible is unique and owned by a single entity.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          <strong>Exclusivity:</strong> Possession of certain collectibles can grant access to exclusive content or experiences.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          <strong>Token Gating:</strong> Unlock special features or access within our store, creating a more personalized and engaging shopping experience.
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
          <strong>Tradeability:</strong> The ability to buy, sell, or trade collectibles adds a layer of interactivity and fun.
        </ListItem>
      </List>

      <Heading as="h2" size={{base: "lg", md: "xl"}} mb={4}>Your Journey with Digital Collectibles</Heading>
      <Text fontSize={{ base: "sm", md: "lg" }} mb={4}>
        By integrating digital collectibles into our store, we offer you a novel way to engage with products and the community. From exclusive experiences to ownership of limited edition items, your journey into the world of digital collectibles starts here.
      </Text>

      <Text fontSize={{ base: "sm", md: "lg" }} mb={4}>
        These types of online shopping experiences, while exciting, are still in their infancy. We&apos;re here to assist with any issues that may arise and welcome your feedback to help us improve. <Link href='/#contact' style={{ textDecoration: "underline" }}>Get in touch</Link>
      </Text>
    </Box>
  );
};

export default InfoPage;
