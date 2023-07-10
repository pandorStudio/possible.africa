import { Box, HStack, VStack } from '@chakra-ui/react'
import FacebookCustomIcon from './icons/FacebookCustomIcon'
import LinkSolidCustomIcon from './icons/LinkSolidCustomIcon'
import LinkedinCustomIcon from './icons/LinkedinCustomIcon'
import TwitterCustomIcon from './icons/TwitterCustomIcon'
import { useState } from 'react'
import { LinkedinShareButton, TwitterShareButton, FacebookShareButton, WhatsappShareButton, EmailShareButton } from 'react-share';
import WhatsappCustomIcon from './icons/WhatsappCustomIcon'
import MailCustomIcon from './icons/MailCustomIcon'


function Socialshare(title, content) {

    const [showTooltip, setShowTooltip] = useState(false);

    const iconSx = {
        ":hover": {
          cursor: "pointer",
        },
      };
      const postUrl = window.location.href;


    const handleCopyLink = () => {
      navigator.clipboard.writeText(postUrl)
        .then(() => {
          // console.log('Link copied to clipboard!');
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

    <HStack alignItems="center" h="100%"  position="relative">
                  <TwitterShareButton 
            url={postUrl}
            title="Titre"
        >
                  <TwitterCustomIcon sx={iconSx} />
        </TwitterShareButton>
        <FacebookShareButton 
            url={postUrl}
            quote="Contenu "
            hashtag='#possibledotafrica'
        >
                  <FacebookCustomIcon sx={iconSx}/>
        </FacebookShareButton>
       <LinkedinShareButton 
            url={postUrl}
            title="Titre "
            summary="summary"
        >
                  <LinkedinCustomIcon sx={iconSx}/>
        </LinkedinShareButton>

        <WhatsappShareButton 
            url={postUrl}
            title="Titre "
            separator='-'
        >
                  <WhatsappCustomIcon sx={iconSx}/>
        </WhatsappShareButton>

        <EmailShareButton 
            url={postUrl}
            subject="Titre"
            body="Contenu "
            separator='-'
        >
            <MailCustomIcon sx={iconSx}/>
        </EmailShareButton>

                    {showTooltip && <Box placement='top' bg="gray.800" borderRadius={4} color="white" px={2} fontSize="sm" zIndices="tooltip" position="absolute" top="-30px"  left="67%" className='tooltip'>Copié</Box>}
                    <LinkSolidCustomIcon sx={iconSx} onClick={handleCopyLink}/>
                </HStack>
    )
}

export default Socialshare