import {useState, useEffect} from "react";

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState<any>(true);

    useEffect(() => {
        const root = document.documentElement.classList;

        if (darkMode) {
            root.add("dark");
        } else {
            root.remove("dark");
        }
    }, [darkMode]);

    return [darkMode, setDarkMode];
}

export default useDarkMode;