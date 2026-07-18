import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchJobs();

    }, []);

    const fetchJobs = async () => {

        try {

            const { data } = await api.get("/jobs");

            setJobs(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    

    const searchJobs = async () => {

    try {

        const { data } = await api.get(`/jobs/search?keyword=${search}`);

        setJobs(data);

    } catch (error) {

        console.log(error);

    }

};

    return (

    <>

        <div className="search-box">

            <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button onClick={searchJobs}>
                Search
            </button>

        </div>

        <div className="job-container">

            {

                jobs.map((job) => (

                    <JobCard
                        key={job._id}
                        job={job}
                    />

                ))

            }

        </div>

    </>

);

}

export default Jobs;