import './Register.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import BASE_URL from "../Services/api";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            `${BASE_URL}/api/users/register`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            }
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("Username", data.name);
            toast.success("registration sucessfull");
            navigate("/")
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="Registerpage">
            <div className="Registerfield">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} className="text">
                    <input type="text" placeholder="Enter your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} /><br></br>
                    <input type="email" placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} /><br></br>
                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} /><br></br>
                    <a href="/Login" className="register-link">Already Have An Account?</a><br></br>
                    <button type="submit" className="register-btn">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register;
