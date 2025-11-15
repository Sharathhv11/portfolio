import Nav from "./components/nav/Nav.jsx"
import "./App.css"
import  Home from "./components/home/Home.jsx";
import HamBurger from "./components/hamBurger/HamBurger.jsx";
import { useSelector } from "react-redux";

function App(){
  const menu = useSelector(state => state.ui.menuOpen);
  console.log(menu);
  return <>
      <Nav/> 
      <HamBurger/>
      {/* <Home/> */}
    </>
  
}

export default App;
