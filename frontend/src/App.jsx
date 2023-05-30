import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Header} from "./components/Header";
import Accueil from "./pages/Accueil";
import Entrepreneurs from "./pages/Entrepreneurs";
import TimeForAfrica from "./pages/TimeForAfrica";
import Actualites from "./pages/Actualites";
import Interviews from "./pages/Interviews";
import Agenda from "./pages/Agenda";
import Opportunites from "./pages/Opportunites";
import Emplois from "./pages/Emplois";
import { HomeHeader } from "./components/HomeHeader";




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
                    <Route path='/actualites' element={<Actualites />} />
                    <Route path='/interviews' element={<Interviews />} />
                    <Route path='/agenda' element={<Agenda />} />
                    <Route path='/opportunites' element={<Opportunites />} />
                    <Route path='/emplois' element={<Emplois />} />
                </Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
