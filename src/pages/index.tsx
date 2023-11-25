import React from 'react';
import { Box, Flex, Heading, Text, Icon, VStack, Input, Textarea, Button } from '@chakra-ui/react';
import Hero from "@/components/Hero";
import  Contact  from "@/components/Contact";
import Link from "next/link";
import { FiPackage } from "react-icons/fi";
import { RiVipDiamondFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";


export default function Home() {
  return (
    <VStack
      spacing={8} 
      align="center"
      justify="center"
      color="white"
      minHeight="300vh" // 3 full viewports
    >
      <Box height="100vh">
        <Hero />
      </Box>
      
      {/* Content Section */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="100vh"
        w="full"
        p={10}
      >
        <Heading fontSize={['3xl', '4xl']} fontWeight="bold">
          Exclusive Products & Digital Collectibles
        </Heading>
        <Flex align="center" justify="center" mt={4}>
          <Icon as={FiPackage} w={12} h={12} />
          <Text fontSize="3xl" mx={4}>+</Text>
          <Icon as={RiVipDiamondFill} w={12} h={12} />
        </Flex>
        <Text fontSize="xl" mt={4} textAlign="center" maxW="lg">
          The purchase of an item grants a digital collectable to your account
        </Text>
      </Flex>

      {/* Contact Form Section */}
     <Contact/>
      {/* Footer Section */}
      <Flex
        as="footer"
        direction="column"
        align="center"
        justify="center"
        w="full"
        py={2}
       
      >
        <Link href="https://x.com/artgigxyz">
          <Icon as={FaSquareXTwitter} w={5} h={5} />
        </Link>
        <Text fontSize="md" mb={2}>
          Artgig 2023
        </Text> 
      </Flex>
    </VStack>
  );
}
