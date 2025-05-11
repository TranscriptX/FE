import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const[loading, setLoading] = useState(false);
    const[error, setError] = useState("");
    const[successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const inputStyle = "w-[400px] px-[4px] py-[12px] mt-[8px] border border-color_secondary rounded-[5px] focus:outline-none focus:ring-2 focus:ring-dark_grey text-[16px] focus:shadow-[0_2px_1px_rgba(0,0,0,0.25)]";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        const { username, email, password, confirmPassword } = formData;

        if (!username || !email || !password || !confirmPassword) {
            setError("Please fill in all the fields.");
            return;
        }
        if (password != confirmPassword){
            setError("Passwords don't match")
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)){
            setError("Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number.");
            return;
        }

        try{
            setLoading(true);
            const response = await fetch("URL API UTK REGISTER", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });

            const result = await response.json();

            if (response.ok){
                setSuccessMessage(result.message);
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                navigate("../login");
            }else{
                setError(result.message || "Something went wrong. Please try again.");
            }
        }catch(err){
            setError("Failed to register. Please check your network connection.");
        }finally{
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar currentPage="Register"/>
            <div>
                <div>
                    <h2 className="text-3xl font-bold text-center">Register</h2>
                </div>
            </div>
        </>
        
    )

};

export default RegisterPage