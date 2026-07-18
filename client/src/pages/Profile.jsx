import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/forms.css";

function Profile() {

    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {

        try {

            const { data } = await api.get("/users/profile");

            setUser(data);

        } catch (error) {

            console.log(error);

        }

    };

    const uploadResume = async () => {

        if (!file) {

            return alert("Please select a resume");

        }

        const formData = new FormData();

        formData.append("resume", file);

        try {

            const { data } = await api.post(
                "/upload/resume",
                formData
            );

            alert(data.message);

            // Refresh profile to get updated resume URL
            fetchProfile();

        } catch (error) {

            alert(error.response?.data?.message || "Upload Failed");

        }

    };

    if (!user) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="form-container">

            <h1>My Profile</h1>

            <p><strong>Name:</strong> {user.fullName}</p>

            <p><strong>Email:</strong> {user.email}</p>

            <p><strong>Phone:</strong> {user.phone || "Not Added"}</p>

            <p><strong>Location:</strong> {user.location || "Not Added"}</p>

            <hr />

            <h3 style={{ marginTop: "20px" }}>Upload Resume</h3>

            <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button
                style={{ marginTop: "15px" }}
                onClick={uploadResume}
            >
                Upload Resume
            </button>

            {user.resume && (

                <div style={{ marginTop: "20px" }}>

                    <a
                        href={`http://localhost:5000${user.resume}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        📄 View Resume
                    </a>

                </div>

            )}

        </div>

    );

}

export default Profile;