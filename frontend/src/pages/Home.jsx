import "./Home.css";
import { Link } from "react-router-dom";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WorkIcon from "@mui/icons-material/Work";
import Interviews from "./Interviews";

function Home() {
  return (
    <div className="App">
      <div className="tab_head">
        <div className="searchPage__headerBody">
          <div className="searchPage_options">
            <div className="searchPage_optionsLeft">
              <div className="searchPage_option">
                <PodcastsIcon />
                <Link to="/">Podcast/Interview</Link>
              </div>
              <div className="searchPage_option">
                <NewspaperIcon />
                <Link to="/actualites">Actualités</Link>
              </div>
              <div className="searchPage_option">
                <CalendarTodayIcon />
                <Link to="/agenda">Agenda</Link>
              </div>
              <div className="searchPage_option">
                <AccountBalanceIcon />
                <Link to="/opportunite">Opportunités de financement</Link>
              </div>
              <div className="searchPage_option">
                <WorkIcon />
                <Link to="/emplois">Emplois</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Interviews />
    </div>
  );
}

export default Home;
