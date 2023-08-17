import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';

const Studio: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [file]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Flex justifyContent="center" my="auto">
      <Card w="container.sm" bg="transparent" shadow="none">
        <CardHeader textAlign="center">
          <Text fontSize="2xl">Upload Your Image</Text>
        </CardHeader>
        <CardBody>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mb={6}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="imageUpload"
            />
            <label htmlFor="imageUpload">
              <Button as="span" colorScheme="blue">
                Choose an image
              </Button>
            </label>
          </Box>
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              borderRadius="5px"
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            />
          )}
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Studio;
