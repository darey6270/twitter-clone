import SidebarOptions from "./SidebarOptions";
import {RiHome4Line, RiHashtag, RiFileList3Line} from "react-icons/ri";
import {HiOutlineBell} from "react-icons/hi";
import {MdMailOutline, MdBookmarkBorder} from "react-icons/md";
import {IoEllipsisHorizontalCircle, IoPersonOutline} from "react-icons/io5";
import {CgDarkMode} from "react-icons/cg";
import useDarkMode from "../hooks/useDarkMode";
import {signIn, signOut, useSession} from "next-auth/react";

const Sidebar = () => {
    const [darkMode, setDarkMode] = useDarkMode();

    const {data: session} = useSession();

    const toggleTheme = () => {
        const theme = localStorage.getItem("darkMode");
        if (theme) {

        }
    }

    return (
        <div className={"col-span-2 flex flex-col items-center px-5 md:items-start"}>
            <img className={"w-10 h-10 ml-4 mt-2"} src="https://links.papareact.com/drq" alt=""/>

            <SidebarOptions Icon={RiHome4Line} title={"Home"}/>
            <SidebarOptions Icon={RiHashtag} title={"Explore"}/>
            <SidebarOptions Icon={HiOutlineBell} title={"Notifications"}/>
            <SidebarOptions Icon={MdMailOutline} title={"Messages"}/>
            <SidebarOptions Icon={MdBookmarkBorder} title={"Bookmarks"}/>
            <SidebarOptions Icon={RiFileList3Line} title={"Lists"}/>
            <SidebarOptions onClick={session ? signOut : signIn} Icon={IoPersonOutline} title={session ? "Sign Out" : "Sign In"}/>
            <SidebarOptions Icon={IoEllipsisHorizontalCircle} title={"More"}/>

            {/* ----- Dark Mode------- */}

            <div onClick={() => setDarkMode(!darkMode)} className={"sidebar-options"}>
                <CgDarkMode className={"sidebar-icon"} />
                <p className={"sidebar-text"}>{darkMode ? "Light Mode" : "Dark Mode"}</p>
            </div>

        </div>
    );
};

export default Sidebar;