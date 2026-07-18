import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";


function SavedJobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        fetchSavedJobs();

    }, []);

    const fetchSavedJobs = async () => {

        try {

            const { data } = await api.get("/users/saved-jobs");

            setJobs(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="job-container">

    {

        jobs.map(job => (

            <JobCard

                key={job._id}

                job={job}

            />

        ))

    }

</div>
    );

}

export default SavedJobs;