import { Outlet, Link as ReachLink } from "react-router-dom";
// import Logo from "../assets/logopossibleafrica.png"
import {
  CalendarIcon,
  LawIcon,
  MenuIcon,
  NewspaperIcon,
  OrganisationsIcon,
  PodcastIcon,
  WorkIcon,
} from "../assets/icons";

import {
  Box,
  Container,
  Flex,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import CustomLink from "./CustomLink";
import MenuLink from "./MenuLink";
import { useLocation } from "react-router-dom";
import LogoAfricaLeads from "../assets/LogoAfrileads.svg";

export const HomeHeader = () => {
  const location = useLocation().pathname;

  // console.log(location);
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <>
      <Box
        as="section"
        pb={{
          base: "1",
          md: "5",
        }}
        borderStyle="solid"
        borderColor="gray.100"
        borderBottomWidth={1}
      >
        <Box as="nav" bg="bg-surface">
          <Container
            py={{
              base: "4",
              lg: "5",
            }}
            px={0}
            maxW={{ base: "100%", md: "65%" }}
          >
            {isDesktop ? (
              <Flex justify="center" gap="10">
                {[
                  {
                    name: "Actualités",
                    link: "/actualites" || "",
                    icons: <NewspaperIcon />,
                  },
                  {
                    name: "Organisations",
                    link: "/organisations",
                    icons: <OrganisationsIcon />,
                  },
                  {
                    name: "Africaleads",
                    link: "https://www.africaleads.ai",
                    icons: <img src={LogoAfricaLeads} height={20} width={20} />,
                    target: "_blank",
                  },
                ].map((item) => (
                  <MenuLink
                    key={item.name}
                    as={ReachLink}
                    to={item.link}
                    target={item.target}
                    className={
                      location == item.link
                        ? " py-3 w-40 flex justify-center rounded-xl text-[#2BB19C]"
                        : "py-3 w-40 flex justify-center rounded-xl"
                    }
                  >
                    <Flex
                      flexDir="row"
                      gap={1}
                      className={
                        location == item.link ? "text-[#2BB19C] font-bold" : ""
                      }
                    >
                      {item.icons}
                      <Text
                        // fontWeight="400"
                        fontSize="md"
                        className={location == item.link ? "font-bold" : ""}
                      >
                        {item.name}
                      </Text>
                    </Flex>
                  </MenuLink>
                ))}
              </Flex>
            ) : (
              <Flex
                justify="flex-start"
                gap="8"
                overflow="scroll"
                className="scrollContainer"
                px="8"
              >
                {[
                  {
                    name: "Actualités",
                    link: "/actualites",
                    icons: <NewspaperIcon />,
                  },
                  {
                    name: "Organisations",
                    link: "/organisations",
                    icons: <OrganisationsIcon />,
                  },
                  {
                    name: "Africaleads",
                    link: "https://www.africaleads.ai",
                    icons: <img src={LogoAfricaLeads} height={20} width={20} />,
                    target: "_blank",
                  },
                ].map((item) => (
                  <CustomLink
                    key={item.name}
                    as={ReachLink}
                    to={item.link}
                    className={
                      location == item.link ||
                      (location == "/" && item.link == "/actualites")
                        ? " py-3 w-40 flex justify-center rounded-xl text-[#2BB19C]"
                        : "py-3 w-40 flex justify-center rounded-xl"
                    }
                  >
                    <Flex
                      flexDir="row"
                      gap={1}
                      className={
                        location == item.link ? "text-[#2BB19C] font-bold" : ""
                      }
                    >
                      {item.icons}
                      <Text
                        // fontWeight="400"
                        fontSize="md"
                        className={location == item.link ? "font-bold" : ""}
                      >
                        {item.name}
                      </Text>
                    </Flex>
                  </CustomLink>
                ))}
              </Flex>
            )}
          </Container>
        </Box>
      </Box>

      <Outlet />
    </>
  );
};
