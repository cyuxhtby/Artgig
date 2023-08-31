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
import { FiShoppingBag } from "react-icons/fi";

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
              <Image src="/artgig.svg" alt="logo" h={12} />
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
                <IconButton
                  as={Link}
                  href="/cart"
                  icon={<FiShoppingBag/>}
                  aria-label="cart-btn"
                  zIndex={2}
                  size="s"
                  variant="ghost"
                  color="black"
                  padding="2px"
                />
                <Badge
                  zIndex={4}
                  position="absolute"
                  top={0}
                  right={0}
                  transform="translate(50%, -50%)"
                  color="black"
                >
                  {cart?.lines?.edges?.reduce((acc, curr) => {
                    return acc + curr.node.quantity;
                  }, 0) || 0}
                </Badge>
              </Box>
            )}
          <Signin />
          </Flex>
        </Flex>
      </Container>
    </>
  );
};
