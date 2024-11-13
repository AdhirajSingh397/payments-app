import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { Button } from "../components/Button"; // Import the Button component
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const Dashboard = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem("token");

        // Redirect to the sign-in page
        navigate("/signin");
    };

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={"10,000"} />
                <Users />
                {/* Add logout button */}
                <div className="mt-8">
                    <Button label="Logout" onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
};
