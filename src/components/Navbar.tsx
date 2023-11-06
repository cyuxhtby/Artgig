import { useState, useEffect, useRef } from 'react';
import { useCart } from "@/hooks/useCart";
import {
  Badge,
  Box,
  Container,
  Flex,
  Image,
  Slide,
} from "@chakra-ui/react";
import Link from "next/link";

import { Signin } from "./Signin";

export const Navbar: React.FC = () => {
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
          px={"10%"}
        >
          <Link href="/">
            <Flex gap={4} justifyContent="center" alignItems="center">
              <Image src="/artgig.svg" alt="logo" h={16} />
            </Flex>
          </Link>
          <Flex
            textAlign="center"
            justifyContent="center"
            alignItems="center"
            gap={4}
          >
            <Signin />
            {!isLoading && (
              <Box position="relative">
                <Link href="/cart">
                  <Badge
                    zIndex={4}
                    position="relative"
                    color="black"
                    bg="white"
                    p={1}
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
          </Flex>
        </Flex>
      </Container>
    </Slide>
    </div>
  );
};
