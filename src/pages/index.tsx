// import  Hero  from "@/components/Hero";
import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Flex direction="column" justify="flex-start" alignItems="flex-start">
        <h1>Shop latest releases</h1>
        <Link href="/products">
        <Button >
          Products
        </Button>
        </Link>
        <div style={{ padding: "20px" }}>
      
        </div>
      </Flex>
    
    
    </div>
  );
}
