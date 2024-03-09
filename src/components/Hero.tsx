import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

const Hero = () => {
  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      height="80%"
      spacing={4}
    >
      <Box as="span" position="relative" display="inline-flex" alignItems="center" justifyContent="center">
        <Box as="span" position="absolute" right="-60px" top="-35px">
          <Image 
            src="/shake.png"
            alt="handshake"
            width={95}
            height={95}
            style={{ filter: "invert(1)" }}
          />
        </Box>
      </Box>
    </VStack>
  );
};

export default Hero;
