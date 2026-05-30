import React from "react";
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";

function Navbar({ search, setSearch ,watchlist=[],setShowGenrePanel}) {
    return (
        
        <nav className="navbar">
            <div className="navbar-left">
                <img className="logoimg" src="/movie-logo.png" alt="logo" />
                <Link to="/" className="logo"style={{color:"white"}}>Movie</Link>
                <Link to="/" className="logo"style={{marginLeft:"7px"}}>Finder</Link>
            </div>

            <div className="navbar-right">

                <Link to="/" className="navigator">Home</Link>
                <button className="navigator-genre-btn" onClick={()=>setShowGenrePanel(true)}>Genre</button>
                <Link to="/Watchlist" className="navigator">Watchlist(
                    <span className="watchlist-count">{watchlist.length}
                    </span>
                )  
                </Link>
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