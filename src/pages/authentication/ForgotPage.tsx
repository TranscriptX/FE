import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Navbar from "../../components/Navbar";

const ForgotPage = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const inputStyle = "w-[400px] px-[4px] py-[16px] mt-[8px] mb-[20px] border border-color_secondary rounded-[5px] focus:outline-none focus:ring-2 focus:ring-dark_grey text-[16px] focus:shadow-[0_2px_1px_rgba(0,0,0,0.25)]";

    const handleForgot = async() => {
        setError("");

        try{
            const response = await axios.post("API UNTUK KIRIM EMAIL VERIF", {
                email: email,
            });

            if (response.status === 200){
                setShowModal(true);
            }
        }catch(err){
            setError("Email not Found. Please check and try again.");
        }
    }

    return (
        <>
            <Navbar currentPage="Forgot"/>
            <div className="min-h-screen flex flex-row items-center justify-center bg-white">
                
            {process.env.NODE_ENV === "development" && (
                <button
                    onClick={() => {
                        if (!email) {
                            setError("Please enter an email first.");
                            return;
                        }
                        setError("");
                        setShowModal(true);
                    }}
                    className="absolute top-[100px] left-[50px] bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
                >
                    Simulate Success (Dev)
                </button>
            )}

                <div className="z-10 bg-color_secondary w-full max-w-[500px] min-h-[400px] flex flex-col align-items justify-content shadow-[0_5px_5px_rgba(0,0,0,0.25)]">
                    <h1 className="text-2xl font-bold text-center mb-[10px] mt-[30px]">Forgot Password?</h1>

                    <p className="ml-[50px] max-w-[430px] mb-[30px]">Please enter the email address you’d like your password reset information sent to</p>

                    {error && (
                        <div className="text-[red] px-[4px] py-[4px] mb-[10px] ml-[42px] mr-[42px] bg-light_red">
                            {error}
                        </div>
                    )}

                    <div>
                        <form className="space-y-[12px] flex flex-col items-center" onSubmit={(e) => {
                            e.preventDefault();
                            handleForgot();
                        }}>

                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputStyle}
                            />



                            <div>
                                <button
                                    type="submit"
                                    className="cursor-pointer shadow-[0_3px_3px_rgba(0,0,0,0.25)] w-[408px] mt-[20px] bg-color_primary text-[18px] font-bold py-[10px] rounded-lg hover:bg-grey border-none transition-all duration-300 ease-in-out hover:ring-2 ring-dark_grey"
                                >
                                    Request Reset Link
                                </button>    
                            </div>
                            
                        </form>    
                    </div>
                

                    <p className="text-center text-sm mt-4">
                    Remember your password?{" "}
                        <a href="/login" className="text-biru no-underline hover:underline">
                            Log in
                        </a>
                    </p>
                </div>

                {showModal && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
                        <div className="bg-pop p-8 rounded-lg shadow-lg max-w-[400px] text-center">
                            <h2 className="text-xl font-bold mb-4">Success!</h2>
                            <p>Password reset link sent to <b>{email}</b>.</p>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    navigate(`/reset-password?email=${encodeURIComponent(email)}`);
                                }}
                                className="mt-6 bg-color_primary text-white font-semibold px-4 py-2 rounded hover:bg-grey transition"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </>
    );

};

export default ForgotPage