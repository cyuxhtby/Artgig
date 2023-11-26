import React, { useState } from 'react';
import { Box, Flex, Heading, Text, Icon, VStack, Input, Textarea, Button , useToast} from '@chakra-ui/react';
import Hero from "@/components/Hero";
import Link from "next/link";
import { FiPackage } from "react-icons/fi";
import { RiVipDiamondFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Home() {

  const [name, setName] = useState('');
const [contact, setContact] = useState('');
const [message, setMessage] = useState('');

const toast = useToast();

const handleSubmit = async (e : React.FormEvent<HTMLDivElement>) => {
  e.preventDefault(); 

  if (!name.trim() || !contact.trim() || !message.trim()) {
    return; 
  }

  try {
    const response = await fetch('api/submitForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, contact, message }),
    });

    const data = await response.json();

    if (response.ok) {
      setName('');
      setContact('');
      setMessage('');
      toast({
        title: "Message sent",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Handle error
      toast({
        title: "Error",
        description: data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  } catch (error) {
    console.error(error);
    // Handle error
  }
};

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
        <Heading fontSize={['2xl', '4xl']} fontWeight="bold" pb={4} >
          Exclusive Products & Digital Collectibles
        </Heading>
        <Flex align="center" justify="center" mt={4} pb={4}>
          <Icon as={FiPackage} w={12} h={12} />
          <Text fontSize="3xl" mx={4}>+</Text>
          <Icon as={RiVipDiamondFill} w={12} h={12} />
        </Flex>
        <Text fontSize="lg" mt={4} textAlign="center" maxW="lg" pb={4} fontWeight="bold">
          The purchase of an item grants a digital collectable to your account
        </Text>
      </Flex>

      {/* Contact Form Section */}
      <Flex
        as="form" 
        onSubmit={handleSubmit} 
        direction="column"
        align="center"
        justify="center"
        minHeight="100vh"
        w={{base: "92%", md: "60%"}}
        
      >
        <Heading fontSize={["2xl", "3xl"]} mb={6}>
          Get In Touch
        </Heading>
        <Box width="100%" px={{ base: 4, md: 0 }}>
          <Flex direction="column" gap={4}>
            <Input
              placeholder="Name"
              variant="filled"
              _placeholder={{ color: "gray.500" }}
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <Input
              placeholder="Contact"
              variant="filled"
              _placeholder={{ color: "gray.500" }}
              value={contact} 
              onChange={(e) => setContact(e.target.value)} 
            />
            <Textarea
              placeholder="Message"
              variant="filled"
              _placeholder={{ color: "gray.500" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" colorScheme="purple" variant="solid" mt={4}>
              Send Message
            </Button>
          </Flex>
        </Box>
      </Flex>
     
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
