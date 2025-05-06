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
    const inputStyle = "w-[400px] px-[4px] py-[12px] mt-[8px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500";

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
            const response = await fetch("Link API untuk register", {
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
            <div className="min-h-screen flex flex-row items-center justify-center bg-white">

                <div className="w-full max-w-[10px] min-h-[520px] bg-color_secondary rounded-md shadow-md translate-x-3 translate-y-3 pl-[10px]"></div>
                
                <div className="z-10 bg-grey w-full max-w-[500px] min-h-[550px] flex flex-col align-items justify-content">
                    <h2 className="text-2xl font-bold text-center">Register</h2>

                    {error && (
                    <div className="text-[red] px-[4px] py-[2px]">
                        {error}
                    </div>
                    )}

                    {successMessage && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
                        {successMessage}
                    </div>
                    )}
                    <div className="">
                        <form onSubmit={handleSubmit} className="space-y-[12px] flex flex-col justify-center items-center">
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className={inputStyle}
                            />

                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={inputStyle}
                            />
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={inputStyle}
                            />
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={inputStyle}
                            />
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-[200px] text-white font-bold py-[5px] rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    {loading ? "Signing up..." : "Sign in"}
                                </button>    
                            </div>
                            
                        </form>    
                    </div>
                

                    <p className="text-center text-sm text-gray-700 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Log in
                    </a>
                    </p>
                </div>
            </div>
        </>
        
    )

};

export default RegisterPage