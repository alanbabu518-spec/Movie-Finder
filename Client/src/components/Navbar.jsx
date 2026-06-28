import React from "react";
import './Navbar.css';
import { FaSearch, FaCamera } from 'react-icons/fa';
import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Navbar({ search, setSearch, watchlist = [], setShowGenrePanel, Favorite }) {
    const token = localStorage.getItem("token");
    const Username = localStorage.getItem("Username");
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("Username");
        localStorage.removeItem("userId");
        window.location.reload();
    };
    const [showmenu, setShowmenu] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [profilePic, setProfilePic] = useState("");

    const saveUsername = async () => {

        const userId =
            localStorage.getItem("userId");

        const response = await fetch(
            `https://movie-finder-43pb.onrender.com//api/users/profile/${userId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username
                })
            }
        );

        const data =
            await response.json();

        setUsername(data.name);

        setEditMode(false);
    }

    const handleProfileUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = async () => {
            try {
                const imageData = reader.result;

                const userId = localStorage.getItem("userId");

                const response = await fetch(
                    `https://movie-finder-43pb.onrender.com//api/users/profile/${userId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            profilePic: imageData,
                        }),
                    }
                );

                const data = await response.json();
                setProfilePic(data.ProfilePic);
            } catch (err) {
                console.log(err);
            }
        };

        reader.readAsDataURL(file);
    };


    useEffect(() => {

        const fetchProfile = async () => {

            const userId = localStorage.getItem("userId");

            if (!userId) return;

            try {
                const response = await fetch(
                    `https://movie-finder-43pb.onrender.com//api/users/${userId}`
                );

                const data = await response.json();

                setUsername(data.name);
                setProfilePic(data.ProfilePic);

            } catch (err) {
                console.log(err);
            }
        };

        fetchProfile();

    }, []);


    return (

        <nav className="navbar">
            <div className="navbar-left">
                <img className="logoimg" src="/movie-logo.png" alt="logo" />
                <Link to="/" className="logo" style={{ color: "white" }}>Movie</Link>
                <Link to="/" className="logo" style={{ marginLeft: "7px" }}>Finder</Link>
            </div>

            <div className="navbar-right">

                <Link to="/" className="navigator">Home</Link>
                <button className="navigator-genre-btn" onClick={() => setShowGenrePanel(true)}>Genre</button>

                {token && (
                    <>
                        <Link to="/Watchlist" className="navigator">Watchlist(
                            <span className="watchlist-count">{watchlist.length}
                            </span>
                            )
                        </Link>

                        <Link to="/Favorites" className="navigator">Favorites
                        </Link>
                    </>
                )}
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
                {!token && (
                    <>
                        <Link to="/login" className="navigator" style={{ color: "#e50916" }}>Login</Link>
                        <Link to="/Register" className="navigator" style={{ color: "#e50916" }}>Register</Link>
                    </>
                )}

                {token && (
                    <div className="user-avatar"
                        onClick={() => setShowSidebar(true)}>
                        {Username?.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            {showSidebar && (
                <>
                    <div className="overlayy"
                        onClick={() => setShowSidebar(false)}></div>
                    <div className="profile-sidebar"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="profile-avatar" onClick={() => setShowSidebar(true)}>

                            {profilePic ? (
                                <img
                                    src={profilePic}
                                    alt="profile"
                                    className="avatar-img"
                                />
                            ) : (
                                <div className="avatar-letter">
                                    {Username.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <label htmlFor="profile-upload" className="camera-btn">
                                <FaCamera />
                            </label>

                            <input
                                type="file"
                                id="profile-upload"
                                hidden
                                onChange={handleProfileUpload}
                            />

                        </div>
                        <h2 style={{ color: "red", textAlign: "center", marginTop: "20px" }}>Hi {Username}</h2>
                        <button className="sidebar-btn"
                            onClick={() => navigate("/login")}>
                            Switch Account
                        </button>
                        <button className="sidebar-btn logout"
                            onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </>
            )}
        </nav>


    );
}


export default Navbar;