import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Header from './pages/Header';
import Entrepreneurs from './pages/Entrepreneurs';
import Timetoafrica from './pages/Timetoafrica';
import Actualites from './pages/Actualites';
import Interviews from './pages/Interviews';
import Agenda from './pages/Agenda';
import Opportunites from './pages/Opportunites';
import Emplois from './pages/Emplois';


function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/entrepreneur" element={<Entrepreneurs />} />
          <Route path='/time-to-africa' element={<Timetoafrica />} />
          <Route path='/actualites' element={<Actualites />} />
          <Route path='/' element={<Interviews />} />
          <Route path='/agenda' element={<Agenda />} />
          <Route path='/opportunites' element={<Opportunites />} />
          <Route path='/emplois' element={<Emplois />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
