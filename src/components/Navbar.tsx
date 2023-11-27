import { useState, useEffect, useRef } from 'react';
import { useCart } from "@/hooks/useCart";
import {
  Badge,
  Box,
  Container,
  Flex,
  Image,
  Slide,
  IconButton,
  useDisclosure
} from "@chakra-ui/react";
import Link from "next/link";

import { Signin } from "./Signin";
import { ConnectWallet, lightTheme } from '@thirdweb-dev/react';
import { IoMenu } from "react-icons/io5";
import Sidebar from './Sidebar';



export const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const { data: cart, isLoading } = useCart();
  const lastScrollTop = useRef(0);
  const [isScrolledUp, setIsScrolledUp] = useState(true);

  const handleScroll = () => {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTop.current + 10) {
      setIsScrolledUp(false); 
    } else if (currentScrollTop < lastScrollTop.current - 10) {
      setIsScrolledUp(true); 
    }

    lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }

  function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...funcArgs: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    return function(...args: Parameters<T>) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => func(...args), wait);
    };
}


  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 10);
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    }
  }, []); 

  const navbarHeight = "100px";

  return (
    <div style={{ height: navbarHeight, zIndex: 1 }}>
      <Slide direction="top" in={isScrolledUp} style={{ zIndex: 1 }}>
        <Container
          maxW="100%"
          maxH="50%"
          position="sticky"
          top={0}
          bg="#FFFFFF"
        >
          <Flex
            w="full"
            direction="row"
            gap={4}
            justifyContent="space-between"
            alignItems="center"
            py={4}
            px={{ base: "4%", md: "10%" }}
            ml={{ base: "-20px", md: "0px" }}
          >
            <IconButton
              aria-label="Open menu"
              icon={<IoMenu size={24} />}
              display={{ base: "flex", sm: "none" }}
              color="black"
              variant="unstyled"
              onClick={onOpen}
              mr={{ base: "-2rem", sm: "-40%" }}
              ml={"-12px"}
            />
            <Link href="/">
              <Flex gap={2} pr={{ base: "0px", sm: "0" }} pl={2}>
                <Image
                  src="/artgig.svg"
                  alt="Artgig logo"
                  h={{ base: "10", md: "14" }}
                />
              </Flex>
            </Link>
            <Flex
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              gap={4}
            >
              {!isLoading && (
                <Box position="relative">
                  <Link href="/cart">
                    <Badge
                      zIndex={4}
                      position="relative"
                      color="black"
                      bg="white"
                      p={0}
                      mr={"-10px"}
                      fontSize="s"
                      borderRadius="full"
                      _hover={{
                        bg: "white",
                        color: "grey",
                        opacity: 0.9,
                      }}
                    >
                      {cart?.lines?.edges?.reduce((acc, curr) => {
                        return acc + curr.node.quantity;
                      }, 0) || 0}
                    </Badge>
                  </Link>
                </Box>
              )}
              <Box mr={{ base: "-40px", md: "0px" }}>
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
                  style={{ color: "white" }}
                />
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Slide>
      <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </div>
  );
};
