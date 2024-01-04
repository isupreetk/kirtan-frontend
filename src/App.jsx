import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage1 from "./pages/HomePage1/HomePage1";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage1 />}></Route>
        {/* <Route path="/:urlAlbum" element={<HomePage />}></Route>
        <Route path="/:urlAlbum/:urlArtist" element={<HomePage />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
