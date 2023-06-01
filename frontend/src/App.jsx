import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Header} from "./components/Header";
import Accueil from "./pages/Accueil";
import Entrepreneurs from "./pages/Entrepreneurs";
import TimeForAfrica from "./pages/TimeForAfrica";
import Actualites from "./pages/Actualites/Actualites.jsx";
import Interviews from "./pages/Interviews";
import Agenda from "./pages/Agenda";
import Opportunites from "./pages/Opportunites";
import Emplois from "./pages/Emplois";
import { HomeHeader } from "./components/HomeHeader";
import Organisations from "./pages/Organisations";
import OneActualite from "./pages/Actualites/OneActualite.jsx";
import OneOrganisation from "./pages/OneOrganisation.jsx";
import OneInterview from "./pages/OneInterview.jsx";
import OneAgenda from "./pages/OneAgenda.jsx";
import OneOpportunity from "./pages/OneOpportunity.jsx";
import OneEmplois from "./pages/OneEmplois.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
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
                </Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
