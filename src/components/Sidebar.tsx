import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Link,
  Flex,
  Button,
} from '@chakra-ui/react';
import { PiCaretRightBold } from "react-icons/pi";


const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const btnRef = React.useRef(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e : any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Save the event so it can be triggered later.
      setInstallEvent(e);
      // Update UI notify the user they can install the PWA
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
  }
  
  
  const handleInstallClick = () => {
    // Check if the installEvent is not null
    if (installEvent) {
      // Show the install prompt
      installEvent.prompt();
  
      // Wait for the user to respond to the prompt
      installEvent.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setInstallEvent(null);
        setShowInstallButton(false);
      });
    }
  };
  
  const links = [
    { title: 'Your Collection', url: '/collectables' },
    { title: 'Creater Studio', url: '/studio' },
    // add more links as needed
  ];

  return (
    <>
      <Box
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        position="fixed"
        left={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex="modal"
      >
        <Box pl={2}>
          <PiCaretRightBold size={24} />
        </Box>

        <Drawer placement="left" onClose={onClose} isOpen={isOpen} finalFocusRef={btnRef}>
          <DrawerOverlay>
            <DrawerContent bg="white">
              <DrawerBody>
                <Flex direction="column" align="center" justify="center" h="100%">
                  {links.map((link, index) => (
                    <Link key={index} href={link.url} color="black" _hover={{ color: 'gray.300' }}>
                      {link.title}
                    </Link>
                  ))}
                  {showInstallButton && (
                    <Button mt={4} onClick={handleInstallClick}>Install App</Button>
                  )}
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
