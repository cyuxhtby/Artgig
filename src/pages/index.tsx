import { Flex } from "@chakra-ui/react";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <Flex
      direction="column"
      justify="center" 
      alignItems="center" 
      height="100vh" 
    >
      <Hero />
    </Flex>
  );
}
