import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AddHotelPage } from "./pages/AddHotelPage";
import { SearchHotelsPage } from "./pages/SearchHotelsPage";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/addHotel" element={<AddHotelPage/>}/>
          <Route path="/search" element={<SearchHotelsPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
