import React from 'react'
import "./hamburger.css"
import { useSelector } from 'react-redux';
const HamBurger = () => {
  const menu = useSelector(state => state.ui.menuOpen);


  return (
    <div className="hamburger" style={menu?{right:"0"}:{right:"100%"}}>HamBurger</div>
  )
}

export default HamBurger;
    