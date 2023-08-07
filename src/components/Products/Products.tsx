import { Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types";

interface ProductsProps {
  products: Product[] | [];
}

export const Products: React.FC<ProductsProps> = ({ products }) => {
  if (!products.length) {
    return (
      <Flex w="full" direction="column" justifyContent="center" alignItems="center" gap={4}>
        <Heading>No products yet!</Heading>
        <Text>
          You don&apos;t have any products yet! Go and create some from the
          Shopify Admin Dashboard
        </Text>
      </Flex>
    );
  }

  return (
    <SimpleGrid minChildWidth="300px" spacing={10} mb={24}>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default Products;
