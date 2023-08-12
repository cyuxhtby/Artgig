import React from 'react';
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
} from '@chakra-ui/react';
import { AiFillCaretRight, AiOutlineCaretLeft } from 'react-icons/ai';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  const links = [
    { title: 'Collectables', url: '/collectables' },
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
        <IconButton
          aria-label="Open Sidebar"
          icon={isOpen ? <></> : <AiFillCaretRight />}
          color="black"
          bg="white"
          minWidth="20px"
          height="40px"
          borderRightRadius="5px"
          borderLeftRadius="0px"
          transition="left 0.5s"
          ref={btnRef}
        />

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
