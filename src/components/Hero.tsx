import React from 'react';
import { Box, VStack, Link, Button, Text } from '@chakra-ui/react';
import Snowfall from 'react-snowfall';

const Hero: React.FC = () => {
  return (
    <Box position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="75%" w={"100%"} px={{ base: 4, md: 24 }}>
      <Snowfall 
        snowflakeCount={50}
        wind={[-1.5, 1.0]}
      />
      <VStack spacing={4} zIndex={2}>
        <Text fontSize={{ base: "2.1rem", md: "5xl" }} fontWeight="bold">
          YEAR END DROP
        </Text>
        <Link href="/products">
          <Button>Shop Now</Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default Hero;
