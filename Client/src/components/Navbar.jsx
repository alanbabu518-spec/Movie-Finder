import React, { useEffect, useState } from "react";
import "./Navbar.css";
import {
    FaSearch,
    FaCamera,
    FaBars,
    FaTimes,
    FaHome,
    FaFilm,
    FaHeart,
    FaBookmark
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../Services/api";

function Navbar({
    search,
    setSearch,
    watchlist = [],
    setShowGenrePanel,
    Favorite
}) {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("Username");

    const [showSidebar, setShowSidebar] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [username, setUsername] = useState(storedUsername || "");
    const [profilePic, setProfilePic] = useState("");

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("Username");
        localStorage.removeItem("userId");
        window.location.reload();
    };

    const saveUsername = async () => {
        const userId = localStorage.getItem("userId");

        const response = await fetch(
            `${BASE_URL}/api/users/profile/${userId}`,
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

        const data = await response.json();

        setUsername(data.name);
        localStorage.setItem("Username", data.name);
    };

    const handleProfileUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = async () => {
            try {
                const imageData = reader.result;
                const userId = localStorage.getItem("userId");

                const response = await fetch(
                    `${BASE_URL}/api/users/profile/${userId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            profilePic: imageData
                        })
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
                    `${BASE_URL}/api/users/${userId}`
                );

                const data = await response.json();

                setUsername(data.name);
                setProfilePic(data.ProfilePic);

                localStorage.setItem("Username", data.name);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProfile();
    }, []);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const firstLetter = (
        username ||
        storedUsername ||
        "U"
    ).charAt(0).toUpperCase();

    return (
        <nav className="navbar">

            <div className="navbar-left">

                <button
                    className="hamburger-btn"
                    onClick={() => setMobileMenuOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <Link to="/" className="logo-container">
                    <img
                        className="logoimg"
                        src="/movie-logo.png"
                        alt="Movie Finder"
                    />

                    <span className="logo movie-logo">
                        Movie
                    </span>

                    <span className="logo finder-logo">
                        Finder
                    </span>
                </Link>

            </div>

            <div className="navbar-right">

                <Link to="/" className="navigator">
                    Home
                </Link>

                <button
                    className="navigator-genre-btn"
                    onClick={() => setShowGenrePanel(true)}
                >
                    Genre
                </button>

                {token && (
                    <>
                        <Link
                            to="/Watchlist"
                            className="navigator"
                        >
                            Watchlist (
                            <span className="watchlist-count">
                                {watchlist.length}
                            </span>
                            )
                        </Link>

                        <Link
                            to="/Favorites"
                            className="navigator"
                        >
                            Favorites
                        </Link>
                    </>
                )}

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="search">
                        <FaSearch className="search-icon" />

                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </form>

                {!token && (
                    <>
                        <Link
                            to="/login"
                            className="navigator login-link"
                        >
                            Login
                        </Link>

                        <Link
                            to="/Register"
                            className="navigator login-link"
                        >
                            Register
                        </Link>
                    </>
                )}

                {token && (
                    <div
                        className="user-avatar"
                        onClick={() => setShowSidebar(true)}
                    >
                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt="profile"
                                className="navbar-avatar"
                            />
                        ) : (
                            firstLetter
                        )}
                    </div>
                )}

            </div>

            {mobileMenuOpen && (
                <>
                    <div
                        className="menu-overlay"
                        onClick={closeMobileMenu}
                    ></div>

                    <aside className="navigation-drawer">

                        <div className="drawer-header">

                            <div className="drawer-logo">
                                <img
                                    src="/movie-logo.png"
                                    alt="Movie Finder"
                                />

                                <span>
                                    Movie <b>Finder</b>
                                </span>
                            </div>

                            <button
                                className="drawer-close"
                                onClick={closeMobileMenu}
                            >
                                <FaTimes />
                            </button>

                        </div>

                        <div className="drawer-links">

                            <Link
                                to="/"
                                className="drawer-link"
                                onClick={closeMobileMenu}
                            >
                                <FaHome />
                                <span>Home</span>
                            </Link>

                            <button
                                className="drawer-link drawer-button"
                                onClick={() => {
                                    setShowGenrePanel(true);
                                    closeMobileMenu();
                                }}
                            >
                                <FaFilm />
                                <span>Genres</span>
                            </button>

                            {token && (
                                <Link
                                    to="/Favorites"
                                    className="drawer-link"
                                    onClick={closeMobileMenu}
                                >
                                    <FaHeart />
                                    <span>Favorites</span>
                                </Link>
                            )}

                            {token && (
                                <Link
                                    to="/Watchlist"
                                    className="drawer-link"
                                    onClick={closeMobileMenu}
                                >
                                    <FaBookmark />
                                    <span>Watchlist</span>

                                    <span className="drawer-count">
                                        {watchlist.length}
                                    </span>
                                </Link>
                            )}

                        </div>

                        {!token && (
                            <div className="drawer-auth">

                                <Link
                                    to="/login"
                                    className="drawer-auth-btn"
                                    onClick={closeMobileMenu}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/Register"
                                    className="drawer-auth-btn register-btn"
                                    onClick={closeMobileMenu}
                                >
                                    Register
                                </Link>

                            </div>
                        )}

                        {token && (
                            <div className="drawer-user">

                                <div className="drawer-user-avatar">

                                    {profilePic ? (
                                        <img
                                            src={profilePic}
                                            alt="profile"
                                        />
                                    ) : (
                                        firstLetter
                                    )}

                                </div>

                                <div className="drawer-user-info">
                                    <span>Welcome</span>
                                    <strong>
                                        {username || storedUsername}
                                    </strong>
                                </div>

                            </div>
                        )}

                    </aside>
                </>
            )}

            {showSidebar && (
                <>
                    <div
                        className="overlayy"
                        onClick={() => setShowSidebar(false)}
                    ></div>

                    <div
                        className="profile-sidebar"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="profile-avatar">

                            {profilePic ? (
                                <img
                                    src={profilePic}
                                    alt="profile"
                                    className="avatar-img"
                                />
                            ) : (
                                <div className="avatar-letter">
                                    {firstLetter}
                                </div>
                            )}

                            <label
                                htmlFor="profile-upload"
                                className="camera-btn"
                            >
                                <FaCamera />
                            </label>

                            <input
                                type="file"
                                id="profile-upload"
                                hidden
                                onChange={handleProfileUpload}
                            />

                        </div>

                        <h2
                            style={{
                                color: "red",
                                textAlign: "center",
                                marginTop: "20px"
                            }}
                        >
                            Hi {username || storedUsername}
                        </h2>

                        <button
                            className="sidebar-btn"
                            onClick={() => navigate("/login")}
                        >
                            Switch Account
                        </button>

                        <button
                            className="sidebar-btn logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>
                </>
            )}

        </nav>
    );
}

export default Navbar;
