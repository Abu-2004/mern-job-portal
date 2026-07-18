import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/forms.css";


function CreateJob() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        jobType: "Full-Time"
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        // Create the job
        const { data } = await api.post("/jobs", form);

        // Upload logo if selected
        if (logo) {

            const formData = new FormData();

            formData.append("logo", logo);

            formData.append("jobId", data._id);

            console.log(logo);
            console.log(formData.get("logo"));
            console.log(data);

            await api.post("/upload/logo", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

        }

        alert("Job Created Successfully");

        navigate("/dashboard");

    } catch (error) {

        alert(error.response?.data?.message || "Failed");

    }

};

    const [logo,setLogo]=useState(null);

    return (

        <div className="form-container">

            <h1>Create Job</h1>

            <form onSubmit={handleSubmit}>

                <input
                    name="title"
                    placeholder="Job Title"
                    value={form.title}
                    onChange={handleChange}
                />


                <input
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                />


                <input
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                />


                <input
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    value={form.salary}
                    onChange={handleChange}
                />


                <textarea
                    name="description"
                    placeholder="Description"
                    rows="5"
                    value={form.description}
                    onChange={handleChange}
                />


                <select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                >

                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Internship</option>
                    <option>Remote</option>

                </select>

                <input

                    type="file"

                    accept="image/*"

                    onChange={(e)=>setLogo(e.target.files[0])}

                />


                <button type="submit">

                    Create Job

                </button>

            </form>

        </div>

    );

}

export default CreateJob;