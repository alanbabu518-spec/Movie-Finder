import "./Login.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../Services/api";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            `${BASE_URL}/api/users/login`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
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
            localStorage.setItem("userId", data._id);
            toast.success("Login sucessfull");
            navigate("/")
        } else {
            toast.error("Invalid Email or Password");
        }
    };

    return (
        <div className="loginpage">
            <div className="loginfield">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="text">
                    <input type="email" placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br></br>
                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br></br>
                    <a href="/Register" className="register-link">Don't Have An Account?</a><br></br>
                    <button type="submit" className="loginbtn">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
