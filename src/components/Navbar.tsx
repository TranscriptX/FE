import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import NavbarType from "../types/components/NavbarType";
import { useNavigate } from "react-router";
import profileIcon from "../assets/profile_icon.svg"

const Navbar = (props: NavbarType) => {
    const authContext = useContext(AuthContext);

    const links = [
        {
            text: "ALL TOOLS",
            isActive: props.currentPage == "All Tools",
            link: "/tools",
            roleAuthorized: [1, 2],
        },
        {
            text: "DASHBOARD",
            isActive: props.currentPage == "Dashboard",
            link: "/dashboard",
            roleAuthorized: [1, 2],
        },
        // {
        //     text: "Register",
        //     isActive: props.currentPage == "Register",
        //     link: "/register",
        //     roleAuthorized: [1, 2],
        // },
        // {
		// 	text: "Logout",
		// 	isActive: false,
		// 	link: "../login",
		// 	roleAuthorized: [1, 2],
		// 	onClick: () => {
		// 		localStorage.removeItem("token");
		// 		navigate("../login");
		// 	},
		// },
    ];

    const navigate = useNavigate();

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [showProfileIcon, setShowProfileIcon] = useState(true);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
        setShowProfileIcon((prev) => !prev);
    }
        

    const logout = () => {
        localStorage.removeItem("token");
        navigate("../login");
    };

    // w-full h-full m-[-8px] bg-color_secondary shadow-md flex justify-between items-center sticky z-50 pl-[20px] left-[20px]

    return (
        <header className="w-full bg-color_secondary shadow-md flex justify-between items-center fixed top-0 left-[20px] z-50 m-[-8px] ml-[-20px] pl-[8px] shadow-[0_2px_5px_rgba(0,0,0,0.25)]">
            <div className="font-bold m-[4px]">
                <span className="text-[36px] drop-shadow-[0_2px_1px_rgba(0,0,0,0.4)]">T</span>
                <span className="text-[24px] drop-shadow-[0_2px_1px_rgba(0,0,0,0.4)]">RANSCRIPT</span>
                <span className="text-[36px] drop-shadow-[0_2px_1px_rgba(0,0,0,0.4)]">X</span>
            </div>

            <nav>
				<ul className="flex flex-row space-x-6 list-none items-center">
					{links.map((item, index) => {
						// let isUserAuthorized = false;
						// for (let i = 0; i < item.roleAuthorized.length; i++) {
						// 	if (item.roleAuthorized[i] == authContext?.user?.role) {
						// 		isUserAuthorized = true;
						// 		break;
						// 	}
						// }

						// if (!isUserAuthorized) {
						// 	return <></>;
						// }

						let className = "mx-4 cursor-pointer ";

						// if (item.isActive) {
						// 	className += "text-black underline decoration-color_primary";
						// } else {
						// 	className += "text-black hover:underline hover:decoration-color_primary hover:text-black";
						// }

                        return (
							<li key={index} className="mx-[12px]">
								<a className={className} onClick={(e) => { 
                                    e.preventDefault(); 
                                    navigate(item.link);
                                    }}
                                >
                                    {item.text}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
            
            <div className="ml-auto flex items-center h-full ">
                    <button onClick={toggleDropdown} className="border-none bg-color_secondary cursor-pointer items-center pr-[10px]" disabled={!showProfileIcon}>
                        {showProfileIcon && (
                            <img src={profileIcon} alt="profile" className= "size-[56px]" />    
                        )}
                    </button>

                    {isDropdownOpen && (
                    <div className="flex items-up justify-end bg-grey p-[8px] pt-[4px] pb-[2px] space-x-[8px]">
                        <div>
                            <img src={profileIcon} className="size-[51px]" />  
                        </div>
                        <div className="flex-row">
                            <div className="font-bold text-[16px]">Nama Sementara</div>
                            <a href="/profile" className="text-black no-underline hover:underline hover:text-biru mt-[10px] space-x-[4px] text-[10px] mr-[4px]">Edit My Profile</a>
                            <span>|</span>
                            <button onClick={logout} className="text-biru text-sm hover:underline border-none bg-grey cursor-pointer no-underline text-[10px] ">  
                                Logout
                            </button>    
                        </div>
                        <div>
                            <button onClick={toggleDropdown} className="border-none bg-grey cursor-pointer p-[0px] pl-[4px] pr-[4px]" >
                                X
                            </button>     
                        </div>
                        
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;

{/* <div class="flex items-center justify-end bg-gray-300 p-4 space-x-4 rounded-bl-xl">
  <!-- Profile Icon -->
  <div class="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black">
    <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A4 4 0 0112 15a4 4 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </div>

  <!-- Profile Info -->
  <div class="text-right">
    <div class="text-lg font-semibold text-black">John Doe</div>
    <div class="text-sm text-black space-x-2">
      <a href="#" class="hover:underline">Edit My Profile</a>
      <span>|</span>
      <a href="#" class="hover:underline">Dashboard</a>
    </div>
    <a href="#" class="text-blue-600 text-sm hover:underline">Logout</a>
  </div>
</div> */}
