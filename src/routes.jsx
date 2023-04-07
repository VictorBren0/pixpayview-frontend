import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login/Index";
import Header from "./components/Header";
import Erro from "./pages/Erro";
import Footer from "./components/Footer";

function RoutesApp() {
    return(
        <BrowserRouter>
        <Header/>
            <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/login" element={ <Login/> }/>
                <Route path="*" element={ <Erro/> }/>

            </Routes>
            <Footer/>
        </BrowserRouter>
    )

}
export default RoutesApp;