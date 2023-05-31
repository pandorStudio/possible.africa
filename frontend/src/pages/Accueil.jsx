// import "./Home.css";
import { Link as ReachLink } from "react-router-dom";
import Interviews from "./Interviews";
import { Container } from "@chakra-ui/react";

import { HomeHeader } from "../components/HomeHeader";
import Organisations from "./Organisations";

// import PodcastsIcon from "@mui/icons-material/Podcasts";
// import NewspaperIcon from "@mui/icons-material/Newspaper";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import WorkIcon from "@mui/icons-material/Work";
// import Interviews from "./Interviews";

function Home() {
  return (
    <>
    <Container maxW="full" p={0}> 
        <HomeHeader/>    
        <Organisations/>  
    </Container>
    </>
  );
}

export default Home;
