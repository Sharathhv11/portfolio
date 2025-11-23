import React from 'react'
import { useSelector } from 'react-redux'
import "./style/home.css"
const Home = () => {
    const theme = useSelector(state=>state.ui.theme);
    
  return (
    <main style={{backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5"}}>

    </main>
  )
}


export default Home;
