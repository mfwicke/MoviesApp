import "swiper/react";
import "boxicons";
import "./App.scss";

import { Route, BrowserRouter } from "react-router-dom";

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

import Routes from "./config/Routes";

function App() {
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <>
            <Header {...props} />
            <Routes />
            <Footer />
          </>
        )}
      />
    </BrowserRouter>
  );
}

export default App;
