import { Signin } from "@/components/Signin";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useUser } from "@thirdweb-dev/react";

export const LoyaltyTokens: React.FC = () => {
  const { isLoggedIn } = useUser();

  const renderContent = () => {
    if (isLoggedIn) {
      return {
        title: "You are earning digital art!",
        description:
          "We reward loyal customers with digital art. Collect more digital art to move up your membership level. Depending on your membership level, you can unlock access to more exclusive merchandise in our store.",
      };
    }
    return {
      title: "Earn art with every purchase!",
      description: "Sign in with your email address to receive digital art that count towards your membership level with every purchase.",
    };
  };

  const { title, description } = renderContent();

  return (
    <Flex
      my={4}
      p={4}
      direction="column"
      gap={2}
      border="1px solid rgba(255,255,255,.1)"
      borderRadius="lg"
    >
      <Heading size="sm">{title}</Heading>
      <Text>{description}</Text>
      {!isLoggedIn && (
        <Box mt={4}>
          <Signin />
        </Box>
      )}
    </Flex>
  );
};