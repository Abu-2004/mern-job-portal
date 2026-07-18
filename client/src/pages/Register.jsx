import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/forms.css";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        fullName: "",
        email: "",
        password: ""

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

            await api.post("/auth/register", form);

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            alert(error.response?.data?.message || "Registration Failed");

        }

    };

    return (
<div className="form-container">
        <form onSubmit={handleSubmit}>

            <h1>Register</h1>

            <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
            />


            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />


            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
            />

            

            <button type="submit">

                Register

            </button>

        </form>
</div>
    );

}

export default Register;