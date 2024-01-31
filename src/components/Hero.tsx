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
        <Text fontSize={{ base: '4xl', md: '6xl' }} fontWeight="bold" color="white">
          FRIEND DAY
        </Text>
        <Box as="span" position="absolute" right="-70px" top="-35px">
          <Image 
            src="/friend-day-heart.svg"
            alt="Heart"
            width={75}
            height={75}
          />
        </Box>
      </Box>
      <Text fontSize={{ base: 'md', md: '2xl' }} fontWeight="semibold" color="white">
        COMING SOON
      </Text>
    </VStack>
  );
};

export default Hero;
