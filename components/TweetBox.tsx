import {TbCalendarStats} from "react-icons/tb";
import {MdOutlineInsertPhoto, MdOutlineLocationOn} from "react-icons/md";
import {HiOutlineEmojiHappy} from "react-icons/hi";
import {BiPoll} from "react-icons/bi";
import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import {Tweet, TweetBody} from "../typings";
import toast from "react-hot-toast";
import {fetchTweets} from "../utils";
import {useSession} from "next-auth/react";

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({setTweets}: Props) => {
    const [tweet, setTweet] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [isImageBoxOpen, setIsImageBoxOpen] = useState<boolean>(false);

    const {data: session} = useSession();

    const imageInputRef = useRef<HTMLInputElement>(null);

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!imageInputRef?.current?.value) return;

        setImage(imageInputRef.current.value);
        imageInputRef.current.value = "";
        setIsImageBoxOpen(false);
    }

    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: tweet,
            username: session?.user?.name || "Unknown User",
            profileImg: session?.user?.image || "https://pbs.twimg.com/media/FN5VfLLXoAYpdOE?format=jpg&name=large",
            image
        }

        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: "POST"
        });

        const json = await result.json();

        const newTweets = await fetchTweets();
        setTweets(newTweets);

        toast("Tweet Posted", {
            icon: "🚀"
        });

        return json
    }

    const handleSubmitTweet = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        await postTweet();
        setTweet("");
        setImage("");
        setIsImageBoxOpen(false);
    }

    return (
        <div className={"flex space-x-2 p-5"}>
            <img className={"mt-4 h-10 w-10 md:h-14 md:w-14 object-cover rounded-full"} src={session?.user?.image || "https://links.papareact.com/gll"} alt=""/>

            <div className={"flex flex-1 items-center pl-2"}>
                <form className={"flex flex-col flex-1"} action="">
                    <input value={tweet} onChange={e => setTweet(e.target.value)} type="text" className={"tweet-input"} placeholder={"What's happening?"}/>

                    <div className={"flex items-center border-y dark:border-gray-800 py-2"}>
                        <div className={"flex flex-1 gap-1 sm:gap-2 text-twitter"}>
                            <MdOutlineInsertPhoto onClick={() => setIsImageBoxOpen(!isImageBoxOpen)} className={"photo-icon"} />
                            <BiPoll className={"text-2xl"} />
                            <HiOutlineEmojiHappy className={"text-2xl"} />
                            <TbCalendarStats className={"text-2xl"} />
                            <MdOutlineLocationOn className={"text-2xl"} />
                        </div>

                        <button onClick={handleSubmitTweet} disabled={!tweet || !session} className={"tweet-button"}>Tweet</button>
                    </div>

                    {/*image-url-box*/}
                    {isImageBoxOpen && <form className={"border-none mt-5 flex rounded-lg bg-twitter/30 py-2 px-4 "}>
                        <input ref={imageInputRef} className={"flex-1 bg-transparent p-2 text-twitter outline-0 placeholder:text-twitter"} type="text" placeholder={"Enter IMAGE URL..."}/>
                        <button onClick={addImageToTweet} type={"submit"} className={"font-semibold text-twitter"}>Add Image</button>
                    </form>}

                    {image && <img src={image} className={"mt-10 h-40 w-full rounded-xl object-contain shadow-lg"} alt=""/>}
                </form>
            </div>
        </div>
    );
};

export default TweetBox;