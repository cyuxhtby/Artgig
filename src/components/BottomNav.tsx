// BottomNav.tsx
import { Box, Flex, Link, IconButton } from '@chakra-ui/react';
import { Signin } from "./Signin";  // Assuming Signin component is accessible

const BottomNav: React.FC = () => {
  return (
    <Box
      position="fixed"
      bottom="0"
      w="full"
      bg="white"
      p={4}
      boxShadow="md"
      style={{ zIndex: 10 }}
    >
      <Flex justifyContent="space-around" alignItems="center">
        {/* Link to Home */}
        <Link href="/" aria-label="Home">
          <IconButton aria-label="Home" icon={<Box as="img" src="/artgig.svg" alt="Home" />} />
        </Link>

        {/* Link to Collectables */}
        <Link href="/collectibles" aria-label="Your Collection" color="black">
          <p>Collectibles</p>
        </Link>

        {/* Link to Cart */}
        <Link href="/cart" aria-label="Cart" color="black">
        <p>Cart</p>
        </Link>

        {/* Signin Button */}
        <Signin />
      </Flex>
    </Box>
  );
};

export default BottomNav;
