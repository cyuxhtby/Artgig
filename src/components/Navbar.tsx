import { useCart } from "@/hooks/useCart";
import {
  Badge,
  Box,
  Container,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { CgShoppingBag } from "react-icons/cg";


import { Signin } from "./Signin";


export const Navbar: React.FC = () => {
  const { data: cart, isLoading } = useCart();

  return (
    <>
      <Container
        maxW="100%"
        maxH="50%"
        position="sticky"
        top={0}
        bg="#FFFFFF"
        zIndex={1}
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
            <Flex gap={4} justifyContent="center" alignItems="center" >
              <Image src="/artgig.svg" alt="logo" h={14} />
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
    </>
  );
};
