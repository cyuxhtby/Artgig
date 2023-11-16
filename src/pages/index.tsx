import  Hero  from "@/components/Hero";
import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <div style={{padding: "20px"}}>
      <Hero headline="Early Black Friday deal." subHeadline="Shop latest for 25% off" ctaText="Latest"/>
      </div>
    <Flex direction="column">
    </Flex>
    </div>
  );
}
