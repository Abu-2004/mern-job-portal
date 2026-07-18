import { Link } from "react-router-dom";
import "../styles/global.css";

function Home() {
    return (
        <div className="hero">

            <h1>Find Your Dream Job</h1>

            <p>
                Search thousands of jobs from top companies and
                build your career with Job Portal.
            </p>

            <Link to="/jobs">
                <button className="primary-btn">
                    Browse Jobs
                </button>
            </Link>

        </div>
    );
}

export default Home;