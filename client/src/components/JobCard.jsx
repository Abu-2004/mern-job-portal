import { Link } from "react-router-dom";
import "../styles/jobs.css";

function JobCard({ job }) {

    return (

        <div className="job-card">

            <h2>{job.title}</h2>

            {
                job.companyLogo && (

                    <img

                        src={`http://localhost:5000${job.companyLogo}`}

                            alt="logo"

                            style={{

                            width:"60px",

                            height:"60px",

                            objectFit:"cover",

                            borderRadius:"10px",

                            marginBottom:"10px"

                        }}

                    />

                )
            }

            <p>📍 {job.location}</p>

            <p>💰 ₹{job.salary}</p>

            <p>💼 {job.jobType}</p>

            <Link to={`/jobs/${job._id}`}>

                <button>

                    View Details

                </button>

            </Link>

        </div>

    );

}

export default JobCard;