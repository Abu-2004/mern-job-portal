import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Applicants() {

    const { id } = useParams();

    const [applicants, setApplicants] = useState([]);

    useEffect(() => {

        fetchApplicants();

    }, []);

    const fetchApplicants = async () => {

        try {

            const { data } = await api.get(`/jobs/${id}/applicants`);

            setApplicants(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="form-container">

            <h1>Applicants</h1>

            {

                applicants.length === 0 ?

                <p>No Applicants Yet</p>

                :

                applicants.map((user)=>(

                    <div
                        key={user._id}
                        style={{
                            border:"1px solid #ddd",
                            padding:"15px",
                            marginBottom:"15px",
                            borderRadius:"10px"
                        }}
                    >

                        <h3>{user.fullName}</h3>

                        <p>{user.email}</p>

                        {

                            user.resume &&

                            <a
                                href={`http://localhost:5000${user.resume}`}
                                target="_blank"
                                rel="noreferrer"
                            >

                                📄 View Resume

                            </a>

                        }

                    </div>

                ))

            }

        </div>

    );

}

export default Applicants;