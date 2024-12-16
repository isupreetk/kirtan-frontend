import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
// import Footer from "./components/Footer/Footer";

function App() {
  return (

<Provider store={appStore}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  </Provider>  
);
}

export default App;
