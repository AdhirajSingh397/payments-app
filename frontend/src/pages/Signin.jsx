import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";

export const Signin = () => {
    const [username, setUsername] = useState(""); // Changed from email to username
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignIn = async () => {
        try {
            // Basic validation for username and password
            if (!username || !password) {
                alert("Please enter both username and password.");
                return;
            }

            // Make the sign-in request
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username, // Changed from email to username
                password,
            });

            // Assuming the response contains a token on success
            const token = response.data.token;
            if (token) {
                localStorage.setItem("token", token);
                alert("Sign-in successful!");
                
                // Redirect to the dashboard
                navigate("/dashboard"); // Navigate to the dashboard route
            } else {
                alert("Sign-in failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            alert("Sign-in failed. Please try again.");
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox 
                        placeholder="harkirat" // Updated placeholder to reflect username
                        label={"Username"} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <InputBox 
                        placeholder="123456" 
                        label={"Password"} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <div className="pt-4">
                        <Button label={"Sign in"} onClick={handleSignIn} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
};
