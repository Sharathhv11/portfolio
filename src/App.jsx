import Nav from "./components/nav/Nav.jsx"
import "./App.css"
import HamBurger from "./components/hamBurger/HamBurger.jsx";
import { useSelector } from "react-redux";
import Home from "./components/home/Home.jsx";

function App(){
  return <>
      <Nav/> 
      <HamBurger/>
      <Home/>
    </>
  
}

export default App;
