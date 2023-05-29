import { CalendarIcon, LawIcon, NewspaperIcon, PodcastIcon, WorkIcon } from "../assets/icons";
// import "./Home.css";
import { Link as ReachLink } from "react-router-dom";
import Interviews from "./Interviews";
import { Box, Container, Flex } from "@chakra-ui/react";
import { Link } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Actualites from "./Actualites";
import Agenda from "./Agenda";
import Opportunites from "./Opportunites";
import { Divider } from '@chakra-ui/react'
import { HomeHeader } from "../components/HomeHeader";

// import PodcastsIcon from "@mui/icons-material/Podcasts";
// import NewspaperIcon from "@mui/icons-material/Newspaper";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import WorkIcon from "@mui/icons-material/Work";
// import Interviews from "./Interviews";

function Home() {
  return (
    <Container maxW="container.xl" p={0}>     
       <HomeHeader/>
  {/* <Tabs colorScheme='teal'>
  <TabList>
    <Tab><Flex alignItems='center' gap='1'><PodcastIcon />
            <Link as={ReachLink} to="/">Podcast/Interview</Link></Flex></Tab>
   <Tab><Flex alignItems='center' gap='1'> <NewspaperIcon />
                <Link as={ReachLink} to="/actualites">Actualités</Link></Flex></Tab>
   <Tab><Flex alignItems='center' gap='1'> <CalendarIcon />
                <Link as={ReachLink} to="/agenda">Agenda</Link></Flex></Tab>
   <Tab><Flex alignItems='center' gap='1'>   <LawIcon />
                <Link as={ReachLink} to="/opportunites">Opportunités de financement</Link></Flex></Tab>
   <Tab><Flex alignItems='center' gap='1'> <WorkIcon />
                <Link as={ReachLink} to="/emplois">Emplois</Link></Flex></Tab>
  </TabList>
  <Divider />
  <TabPanels>
    <TabPanel>
     <Interviews />
    </TabPanel>
    <TabPanel>
      <Actualites/>
    </TabPanel>
    <TabPanel>
      <Agenda/>
    </TabPanel>
    <TabPanel>
      <Opportunites/>
    </TabPanel>
  </TabPanels>
</Tabs> */}
    </Container>
  );
}

export default Home;
