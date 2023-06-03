import { Box, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import TwitterCustomIcon from './icons/TwitterCustomIcon'
import FacebookCustomIcon from './icons/FacebookCustomIcon'
import LinkedinCustomIcon from './icons/LinkedinCustomIcon'
import LinkSolidCustomIcon from './icons/LinkSolidCustomIcon'

function Socialshare(titre) {

    const [showTooltip, setShowTooltip] = useState(false);

    const iconSx = {
        ":hover": {
          cursor: "pointer",
        },
      };

    const handleCopyLink = () => {
      const postUrl = window.location.href;
      navigator.clipboard.writeText(postUrl)
        .then(() => {
          console.log('Link copied to clipboard!');
          setShowTooltip(true);
          setTimeout(() => {
            setShowTooltip(false);
          }, 2000);
  
        })
        .catch((error) => {
          console.error('Failed to copy link to clipboard:', error);
        });
    };
  return (

    <HStack alignItems="center" h="100%">
                  <TwitterCustomIcon sx={iconSx} href={`https://twitter.com/intent/tweet?text=Découvrez les actualités en clickant sur le lien ${encodeURIComponent(window.location.href)}`}/>
                  <FacebookCustomIcon sx={iconSx}/>
                  <LinkedinCustomIcon sx={iconSx} href={`https://www.linkedin.com/shareArticle/?mini=true&url=${encodeURIComponent(window.location.href)}`}/>
                    <LinkSolidCustomIcon sx={iconSx} onClick={handleCopyLink}/>
                    {showTooltip && <Box placement='top' bg="gray.800" borderRadius={4} color="white" px={2} fontSize="sm" zIndices="tooltip">Copié</Box>}
                </HStack>
    )
}

export default Socialshare