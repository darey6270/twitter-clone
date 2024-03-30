import {IconType} from "react-icons";

interface Props {
    Icon: IconType
    title: string
    onClick?: () => {}
}

const SidebarOptions = ({Icon, title, onClick}: Props) => {

    return (
        <div onClick={() => onClick?.()} className={"sidebar-options group"}>
            <Icon className={"sidebar-icon"} />
            <p className={"sidebar-text group-hover:text-twitter dark:group-hover:text-[#e7e9ea]"}>{title}</p>
        </div>
    );
};

export default SidebarOptions;