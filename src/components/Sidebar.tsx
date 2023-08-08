import React from 'react';
import { Box, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Link, Flex, DrawerCloseButton } from "@chakra-ui/react";
import { AiFillCaretRight, AiOutlineCaretLeft } from "react-icons/ai";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null); // Initialized with null

  const links = [
    { title: "Collectables", url: "/collectables" },
    { title: "YouTube", url: "https://youtube.com" },
    // add more links as needed
  ];

  return (
    <>
      <IconButton 
        aria-label="Open Sidebar"
        icon={isOpen ? <AiOutlineCaretLeft/> : <AiFillCaretRight/>}
        onClick={isOpen ? onClose : onOpen}
        color="black"
        bg="white"
        minWidth="20px"
        height="40px"
        borderRadius="0px"
        position="fixed"
        left={isOpen ? "300px" : "0"} // Adjust the left position based on the isOpen state
        top="50%"
        transform="translateY(-50%)"
        transition="left 0.5s" // Add a transition effect to the left property
        zIndex="modal"
        ref={btnRef}
      />

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} finalFocusRef={btnRef}>
        <DrawerOverlay>
          <DrawerContent bg="white">
            <DrawerBody>
              <Flex direction="column" align="center" justify="center" h="100%">
                {links.map((link, index) => (
                  <Link 
                    key={index} 
                    href={link.url} 
                    color="black" 
                    _hover={{ color: "gray.300" }}
                  >
                    {link.title}
                  </Link>
                ))}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Sidebar;
