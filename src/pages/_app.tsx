import React, { useState, useEffect } from 'react';
import BottomNav from "@/components/BottomNav";
import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import {
  APP_NETWORK,
  DOMAIN,
  PAPER_CLIENT_ID,
  RELAYER_URL,
  THIRDWEB_CLIENT_ID,
  THIRDWEB_SECRET_KEY
} from "@/lib/environment-variables";
import theme from "@/theme";
import { ChakraProvider, Container, Flex } from "@chakra-ui/react";
import {
  ThirdwebAuthConfig,
  // paperWallet,
  SDKOptions,
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  phantomWallet,
  embeddedWallet,
  darkTheme,
} from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { NextPage } from 'next';


// const paperWalletConfig = paperWallet({
//   paperClientId: PAPER_CLIENT_ID,
// });
// paperWalletConfig.meta.name = "Email";
// paperWalletConfig.meta.iconURL = "https://ipfs.thirdwebcdn.com/ipfs/QmUUoZxPuAgxKHeT5cCY4vwmN8sZRiV9ptzBhuM47Y24NY/email%20wallet%20shopify.png";

export default function App({ Component, pageProps }: AppProps) {
  const [isPwa, setIsPwa] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsPwa(isStandalone);
  }, []);

  const supportedWallets = [
    // ...(PAPER_CLIENT_ID
    //   ? [
    //     paperWalletConfig,
    //   ]
    //   : []),
    metamaskWallet(),
    coinbaseWallet(),
    walletConnect(),
    phantomWallet(),
    embeddedWallet(),
  ];

  const authConfig: ThirdwebAuthConfig = {
    domain: DOMAIN,
    authUrl: "/api/auth",
  };

  const sdkOptions: SDKOptions | undefined = RELAYER_URL
    ? {
      gasless: {
        openzeppelin: { relayerUrl: RELAYER_URL },
      },
    }
    : undefined;
    
  return (
   
    <Flex direction="column" minHeight="100vh">
      <ChakraProvider theme={theme}>
        <ThirdwebProvider
          supportedWallets={supportedWallets}
          authConfig={authConfig}
          sdkOptions={sdkOptions}
          activeChain={APP_NETWORK || "mumbai"}
          clientId={THIRDWEB_CLIENT_ID}
          secretKey={THIRDWEB_SECRET_KEY}
        >
          <Head>
            <title>Commerce Reimagined</title>
          </Head>
          {isPwa ? null : <Navbar/>}
          <Container maxW="container.page" flexGrow={1}>
            <Component {...pageProps} />
          </Container>
          {isPwa ? <BottomNav/> : <Sidebar/>}
        </ThirdwebProvider>  
      </ChakraProvider>
    </Flex>
  );
}