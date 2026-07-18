import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/forms.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({

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

            const { data } = await api.post("/auth/login", form);

            login(data.token, data.user);

            alert("Login Successful");

            navigate("/");

        } catch (error) {

            alert(error.response?.data?.message || "Login Failed");

        }

    };

    return (
        <div className="form-container">
        <form onSubmit={handleSubmit}>

            <h1>Login</h1>

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

                Login

            </button>

        </form>
</div>
    );

}

export default Login;