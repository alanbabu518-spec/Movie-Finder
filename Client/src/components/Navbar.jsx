import React from "react";
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/movie-logo.png';
import { Link } from "react-router-dom";

function Navbar({ search, setSearch }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img className="logoimg" src={logo} alt="logo" />
                <a href="/" className="logo">Movie Finder</a>
            </div>

            <div className="navbar-right">

                <Link to="/" className="navigator">Home</Link>
                <Link to="/Genre" className="navigator">Genre</Link>
                <Link to="/Watchlist" className="navigator">Watchlist</Link>
                <form>
                    <div className="search">
                        <FaSearch className='search-icon' />
                        <input type="text"
                            placeholder="Search Movies"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }} />
                    </div>
                </form>

            </div>
        </nav>


    );
}


export default Navbar;