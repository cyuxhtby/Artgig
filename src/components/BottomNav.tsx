// BottomNav.tsx
import { Box, Flex, Link, IconButton } from '@chakra-ui/react';
import { Signin } from "./Signin"; 
import { ConnectWallet,lightTheme } from '@thirdweb-dev/react';

const BottomNav: React.FC = () => {
  return (
    <Box
      position="fixed"
      bottom="0"
      w="full"
      bg="white"
      p={1}
      boxShadow="md"
      style={{ zIndex: 10 }}
    >
      <Flex justifyContent="space-around " alignItems="center">
        {/* Link to Home */}
        <Link href="/" aria-label="Home" color="black">
          <p>Home</p>
        </Link>

        {/* Link to Collectables */}
        <Link href="/collectables" aria-label="Your Collection" color="black">
          <p>Collectibles</p>
        </Link>

        {/* Link to Cart */}
        <Link href="/cart" aria-label="Cart" color="black">
          <p>Cart</p>
        </Link>

        {/* Signin Button */}
        <Box mr={-4}>
          <ConnectWallet
            theme={lightTheme({
              colors: {
                accentText: "#8f33ff",
                accentButtonBg: "#8f33ff",
              },
            })}
            btnTitle={"Sign in"}
            auth={{ loginOptional: false }}
            switchToActiveChain={true}
            modalSize={"compact"}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default BottomNav;