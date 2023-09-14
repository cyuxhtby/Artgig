import { Container, Flex, Text, Box } from "@chakra-ui/react";
import {
  PAPER_CLIENT_ID
} from "@/lib/environment-variables";

const ExportPage: React.FC = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction="column" align="center" justify="center">
        

        <Text fontSize="lg" mb={6} textAlign="center" mt={12}>
          You have the option to export your private key to set up your account in an external wallet like MetaMask. This provides you with full control over your assets. Remember, your private key is sensitive; handle with care and never share it.
          </Text>

        <Box width="100%" p={4} mb={4}>
          <iframe 
            title="Export NFTs"
            width="100%" 
            height="400px" 
            src={`https://withpaper.com/sdk/2022-08-12/embedded-wallet/export?clientId=${PAPER_CLIENT_ID}`} 
            sandbox="allow-scripts allow-same-origin"
          />
        </Box>
      </Flex>
    </Container>
  );
}

export default ExportPage;
