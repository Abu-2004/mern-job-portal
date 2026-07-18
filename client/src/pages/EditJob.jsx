import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/forms.css";


function EditJob() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        jobType: ""
    });

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {

        try {

            const { data } = await api.get(`/jobs/${id}`);

            setForm(data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/jobs/${id}`, form);

            alert("Job Updated Successfully");

            navigate("/dashboard");

        } catch (error) {

            alert(error.response?.data?.message || "Update Failed");

        }

    };

    return (

        <div className="form-container">
            <h1>Edit Job</h1>

            <form onSubmit={handleSubmit}>

                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                />


                <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company"
                />


                <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location"
                />


                <input
                    type="number"
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                />


                <textarea
                    rows="5"
                    name="description"
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


                <button type="submit">

                    Update Job

                </button>

            </form>

        </div>

    );

}

export default EditJob;