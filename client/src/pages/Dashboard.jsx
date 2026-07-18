import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import "../styles/jobs.css";
import "../styles/dashboard.css";

function Dashboard() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyJobs();
    }, []);

    const fetchMyJobs = async () => {

        try {

            const { data } = await api.get("/jobs/my-jobs");

            setJobs(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const deleteJob = async (id) => {

        const confirmDelete = window.confirm("Delete this job?");

        if (!confirmDelete) return;

        try {

            await api.delete(`/jobs/${id}`);

            setJobs(jobs.filter(job => job._id !== id));

            alert("Job Deleted");

        } catch (error) {

            alert(error.response?.data?.message || "Delete Failed");

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <>

            <div className="dashboard-header">

                <h1>My Jobs</h1>

                <Link to="/create-job">

                    <button className="primary-btn">

                        + Create Job

                    </button>

                </Link>

            </div>

            <div className="job-container">

                {

                    jobs.map(job => (

                        <div
                            key={job._id}
                            className="job-card"
                        >

                            <h2>{job.title}</h2>

                            <h3>{job.company}</h3>

                            <p>📍 {job.location}</p>

                            <p>💰 ₹{job.salary}</p>

                            <div className="dashboard-buttons">

                                <Link to={`/edit-job/${job._id}`}>

                                    <button>

                                        Edit

                                    </button>

                                </Link>

                                <button
                                    onClick={() => deleteJob(job._id)}
                                >

                                    Delete

                                </button>

                                <Link to={`/applicants/${job._id}`}>

                                    <button>

                                        Applicants

                                    </button>

                                </Link>

                            </div>

                        </div>

                    ))

                }

            </div>

        </>

    );

}

export default Dashboard;