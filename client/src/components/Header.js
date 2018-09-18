import React, {Component} from "react";
import {Link} from "react-router-dom";
//=====================================================================================================================================
export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div id="logo"></div>
        {/* <div id="eye"></div> */}
        <div></div>
        <div className="header-links"><Link to="/">Home</Link></div>
        {/* <div className="header-links"><Link to="/anime">Anime</Link></div> */}
        {/* <div className="header-links"><Link to="/man ga">Manga</Link></div> */}
        <div className="header-links"><Link to='/favorites'>Favorites</Link></div>
        <div className="header-links"><Link to="/search">Search</Link></div>
        <div className="header-links"><Link to='/login'>Login</Link></div>
        <div className="header-links"><Link to='/register'>Register</Link></div>
      </div>
    )
  }
}
//=====================================================================================================================================
