import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/details.css";


function JobDetails() {

    const { id } = useParams();

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    useEffect(() => {

        fetchJob();

    }, []);

    const fetchJob = async () => {

        try {

            const { data } = await api.get(`/jobs/${id}`);

            setJob(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!job) {
        return <h2>Job Not Found</h2>;
    }

    const applyJob = async () => {

      try {

          await api.post(`/jobs/${id}/apply`);

          alert("Applied Successfully");

      } catch (error) {

          alert(error.response?.data?.message || "Apply Failed");

      }

    };

    const saveJob = async () => {

      try {

          const { data } = await api.post(`/jobs/${id}/save`);

          alert(data.message);

      } catch (error) {

          alert(error.response?.data?.message || "Failed");

      }

    };

    return (

        <div className="details-container">

    <div className="details-card">

        <h1>{job.title}</h1>

        <h2>{job.company}</h2>

        <p>📍 {job.location}</p>

        <p>💰 ₹{job.salary}</p>

        <p>💼 {job.jobType}</p>

        <hr />

        <h3>Description</h3>

        <p>{job.description}</p>

        <div className="details-buttons">

            {user && (
                <>
                   <button onClick={applyJob}>
                        Apply Now
                    </button>

                    <button onClick={saveJob}>
                        Save Job
                    </button>
                </>
            )}

        </div>

    </div>

</div>
    );

}

export default JobDetails;