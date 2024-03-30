import React from 'react';
import {MdSearch} from "react-icons/md";
import {TwitterTimelineEmbed} from "react-twitter-embed";
import useDarkMode from "../hooks/useDarkMode";

const Widgets = () => {

    const [darkMode] = useDarkMode();

    return (
        <div className={"px-2 mt-2 col-span-2 hidden lg:inline"}>
            <div className={"flex items-center gap-2 dark:bg-[#202327] bg-gray-100 p-3 rounded-full mt-2 mb-4"}>
                <MdSearch className={"text-2xl text-gray-400 "} />
                <input type="text" className={"flex-1 outline-0 bg-transparent dark:text-[#e7e9ea]"} placeholder={"Search Twitter"}/>
            </div>

            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="sikal_sikal"
                theme={darkMode && "dark"}
                options={{height: 1200}}
                noScrollbar
            />

        </div>
    );
};

export default Widgets;