import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AddHotelPage } from "./pages/AddHotelPage";
import { SearchHotelsPage } from "./pages/SearchHotelsPage";

function App() {
  return (
    <>
      <BrowserRouter>
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
