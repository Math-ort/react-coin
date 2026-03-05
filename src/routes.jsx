import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Coin from "./Coin";
import Favorites from "./Favorites";
import './App.css';

function AppRoutes() {
    return (
        <>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/coin/:id">Coin</Link>
            <Link to="/favorites">Favorites</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/coin/:id" element={<Coin />}/>
            <Route path="/favorites" element={<Favorites />}/>
        </Routes>
        </>
    )
}

export default AppRoutes;