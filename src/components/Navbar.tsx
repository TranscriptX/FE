import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NavbarType from "../types/components/NavbarType";
import { useNavigate } from "react-router";

const Navbar = (props: NavbarType) => {
    const authContext = useContext(AuthContext);

    const links = [
        {
            text: "All Tools",
            isActive: props.currentPage == "All Tools",
            link: "/tools"
        },
        {
            text: "Dashboard",
            isActive: props.currentPage == "Dashboard",
            link: "/dashboard"
        },
        {
            text: "Register",
            isActive: props.currentPage == "Register",
            link: "/register"
        }
    ];

    const navigate = useNavigate();

    return (
        <header className="w-full h-full m-[-8px] bg-color_secondary shadow-md p-[4px] pr-[16px] flex flex-row justify-between sticky top-[0] left-[0] z-50">
            <div className="font-bold m-[4px] m-left-[2px]">
                <span className="text-[16px] drop-shadow-[0_2px_1px_rgba(0,0,0,0.4)]">T</span>
                <span className="text-[12px] drop-shadow-[0_2px_1px_rgba(0,0,0,0.4)]">RANSCRIPT</span>
                <span className="text-[16px] drop-shadow-[0_2px_1px_rgba(0,0,0,0.4)]">X</span>
            </div>
        </header>
    )


};

export default Navbar;