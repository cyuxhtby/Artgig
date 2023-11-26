import React from 'react';
import { Box, Text, VStack, keyframes, Button } from "@chakra-ui/react";
import Link from "next/link";

const glow = keyframes`
  0% { text-shadow: 0 0 10px #808080, 0 0 20px #808080, 0 0 30px #808080, 0 0 40px #808080; }
  100% { text-shadow: 0 0 20px #808080, 0 0 30px #808080, 0 0 40px #808080, 0 0 50px #808080, 0 0 60px #808080; }
`;

const Hero = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="75%"
      w={"100%"}
      px={{ base: 4, md: 24 }}
    >
      <VStack spacing={4}>
        <Text
           fontSize={{base: "2.1rem", md: "5xl"}} 
           fontWeight="bold"
        >
          YEAR END SALE
        </Text>
        <Link href="/products" passHref>
          <Button > 
            Shop Now
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default Hero;
