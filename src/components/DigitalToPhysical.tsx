import React, { useState, useEffect, useMemo } from 'react';
import { useContract, useNFT, ThirdwebNftMedia } from "@thirdweb-dev/react";
import { Image, Skeleton, Text, Flex, Box } from "@chakra-ui/react";
import { Product } from "@/types";
import SwiperCore from 'swiper';
import { Pagination }  from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';



interface DigitalToPhysicalProps {
  product: Product;
  activeView: 'product' | 'nft'; // This prop determines the current view
  setActiveView: (view: 'product' | 'nft') => void; // Method to change the view
}


export const DigitalToPhysical: React.FC<DigitalToPhysicalProps> = ({ product, activeView, setActiveView }) => {
  const { assetContract } = product;
  const contractData = useContract(assetContract?.value);
  const nftData = useNFT(contractData?.contract || null, '0');
  const [hasCheckedNFT, setHasCheckedNFT] = useState(false);


  const contract = assetContract ? contractData.contract : null;
  const { data: nft, isLoading, error } = contract ? nftData : { data: null, isLoading: false, error: null };

  const [loadedImages, setLoadedImages] = useState(0);
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);



  const handleImageLoad = () => {
    setLoadedImages(prev => prev + 1);
  };

  const handleSwiperInstance = (swiper: SwiperCore) => {
    setSwiper(swiper);
}


  const swiperParams = {
    modules: [Pagination], 
    slidesPerView: 'auto' as const, // you can set this to 'auto' if you want it to adjust based on container width
    pagination: {
      autoHeight: true,
    
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3,
    }
  };

  const imagesLength = useMemo(() => product.images.edges.length, [product.images.edges]);

  useEffect(() => {
    if (nft || error) {
      setHasCheckedNFT(true);
    }
    if(loadedImages === imagesLength && swiper && swiper.update){
      swiper.update();
      swiper.slideTo(0)
    }
  }, [nft, error, loadedImages, swiper, imagesLength]);
  

  return (
    <Flex direction="column" gap={4} wrap="nowrap">
      {activeView === 'product' && (
        <>
          {/* Mobile render */}
          <Box display={{ base: "block", lg: "none" }} width="100%" maxWidth="50vh" height="100%" overflow="hidden" zIndex="0">
          <Swiper {...swiperParams} onSwiper={handleSwiperInstance} style={{width: '100%', height: '100%', "--swiper-pagination-color": "#FFFFFF","--swiper-pagination-bullet-inactive-color": "#999999" } as React.CSSProperties}>
                    {product.images.edges.map((imageEdge, index) => (
                        <SwiperSlide key={index} style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}} >
                            <Image
                                onLoad={handleImageLoad}
                                objectFit="contain"
                                src={imageEdge.node.originalSrc}
                                alt={imageEdge.node.altText}
                                borderRadius="lg"
                                padding="5px"
                                overflow='hidden'
                                
                                
                            />
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
            </Box>

          {/* Desktop render */}
          <Box display={{ base: "none", lg: "block" }} width="100%" maxWidth="600px" height="100%">
            {product.images.edges.map((imageEdge, index) => (
              <Image
                key={index}
                objectFit="cover"
                src={imageEdge.node.originalSrc}
                alt={imageEdge.node.altText}
                borderRadius="lg"
                width="100%"
                height="100%"
                marginBottom="100px"
              />
            ))}
          </Box>
        </>
      )}
      {activeView === 'nft' && assetContract && (
        <>
          <Box display={{ base: "block", lg: "none" }} width="100%" maxWidth="50vh" height="100%">
            {isLoading ? (
              <Skeleton isLoaded={!isLoading} startColor="gray.500" endColor="gray.700" width="100%" height="100%" />
            ) : error ? (
              <Text color="red.500">Error loading NFT.</Text>
            ) : nft ? (
              <ThirdwebNftMedia metadata={nft.metadata} width="100%" height="100%" style={{ borderRadius: '10px', objectFit: 'cover' }} />
            ) : null}
          </Box>
          <Box display={{ base: "none", lg: "block" }} width="100%" maxWidth="600px" height="100%">
            {isLoading ? (
              <Skeleton isLoaded={!isLoading} startColor="gray.500" endColor="gray.700" width="100%" height="100%" />
            ) : error ? (
              <Text color="red.500">Error loading NFT.</Text>
            ) : nft ? (
              <ThirdwebNftMedia metadata={nft.metadata} width="100%" height="100%" style={{ borderRadius: '10px', objectFit: 'cover' }} />
            ) : null}
          </Box>
        </>
      )}
    </Flex>
  );
}

