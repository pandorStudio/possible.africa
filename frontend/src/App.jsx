import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomeHeader } from "./components/HomeHeader";
import Accueil from "./pages/Accueil";
import Actualites from "./pages/Actualites/Actualites.jsx";
import OneActualite from './pages/Actualites/OneActualite';
import Agenda from "./pages/Agenda";
import Emplois from "./pages/Emplois";
import Entrepreneurs from "./pages/Entrepreneurs";
import Interviews from "./pages/Interviews";
import OneAgenda from "./pages/OneAgenda.jsx";
import OneEmplois from "./pages/OneEmplois.jsx";
import OneInterview from "./pages/OneInterview.jsx";
import OneOpportunity from "./pages/OneOpportunity.jsx";
import OneOrganisation from "./pages/OneOrganisation.jsx";
import Opportunites from "./pages/Opportunites";
import Organisations from "./pages/Organisations";
import Search from "./pages/Search.jsx";
import TimeForAfrica from "./pages/TimeForAfrica";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={[<Header key="1"/>, <Footer key="2"/>]}>
                <Route index element={<Accueil />} />
                <Route path="/entrepreneurs" element={<Entrepreneurs />} />
                <Route path='/timeforafrica' element={<TimeForAfrica />} />
                <Route path="/" element={<HomeHeader />}>
                    <Route path='/organisations' >
                        <Route index path='/organisations'  element={<Organisations />} />
                        <Route path='/organisations/:slug' element={<OneOrganisation />} />
                    </Route>
                    <Route path='/actualites' >
                        <Route index path='/actualites' element={<Actualites />} />
                        <Route path='/actualites/:slug' element={<OneActualite />} />
                    </Route>
                    <Route path='/interviews' >
                        <Route index path='/interviews' element={<Interviews />} />
                        <Route path='/interviews/:slug' element={<OneInterview />} />
                    </Route>
                    <Route path='/agenda' >
                        <Route index path='/agenda' element={<Agenda />} />
                        <Route path='/agenda/:slug' element={<OneAgenda />} />
                    </Route>
                    <Route path='/opportunites'>
                        <Route index path='/opportunites' element={<Opportunites />} />
                        <Route path='/opportunites/:slug' element={<OneOpportunity />} />
                    </Route>
                    <Route path='/emplois' >
                        <Route index path='/emplois' element={<Emplois />} />
                        <Route path='/emplois/:slug' element={<OneEmplois />} />
                    </Route>
                    <Route path='/search' >
                        <Route index path='/search'  element={<Search />} />
                    </Route>
                </Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
