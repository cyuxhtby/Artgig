import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Textarea,
  Button,
  useToast
} from "@chakra-ui/react";

export default function Contact() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  const toast = useToast();

  const handleSubmit = (e : React.FormEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  
    if (!name.trim() || !contact.trim() || !message.trim()) {
      return; 
    }
  
    // handle the submission of the data
  
    setName('');
    setContact('');
    setMessage('');
  
    toast({
      title: "Message sent",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  

  return (
    <div>
      {/* Contact Form Section */}
      <Flex
        as="form" 
        onSubmit={handleSubmit} 
        direction="column"
        align="center"
        justify="center"
        minHeight="100vh"
        w="full"
        p={10}
      >
        <Heading fontSize={["2xl", "3xl"]} mb={6}>
          Get In Touch
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
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
    </div>
  );
}
