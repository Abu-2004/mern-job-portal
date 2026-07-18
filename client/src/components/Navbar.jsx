import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {

    const { user, logout } = useAuth();

    return (

        <nav className="navbar">

            <Link to="/" className="logo">

                Job Portal

            </Link>

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/jobs">Jobs</Link>

                {
                    user && (
                        <>
                            <Link to="/dashboard">Dashboard</Link>

                            <Link to="/saved-jobs">Saved Jobs</Link>

                            <Link to="/profile">Profile</Link>
                        </>
                    )
                }

            </div>

            <div className="nav-auth">

                {
                    user ?

                        <button onClick={logout}>
                            Logout
                        </button>

                        :

                        <>
                            <Link to="/login">Login</Link>

                            <Link to="/register">Register</Link>
                        </>
                }

            </div>

        </nav>

    );

}

export default Navbar;