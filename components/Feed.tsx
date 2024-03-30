import {HiOutlineRefresh} from "react-icons/hi";
import TweetBox from "./TweetBox";
import {Tweet} from "../typings";
import TweetComponent from "../components/Tweet";
import {fetchTweets} from "../utils";
import {useState} from "react";
import toast from "react-hot-toast";

interface Props {
    tweets: Tweet[]
}

const Feed = ({tweets: tweetsProp}: Props) => {
    const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);

    const handleRefresh = async () => {
        const refreshToast = toast.loading("Refreshing...");
        const tweets = await fetchTweets();
        setTweets(tweets);
        toast.success("Feed Updated", {
            id: refreshToast
        })
    }

    return (
        <div className={"col-span-7 lg:col-span-5 border-x dark:border-gray-800 max-h-screen overflow-scroll"}>
            <div className={"flex justify-between items-center"}>
                <h1 className={"p-5 pb-0 text-xl font-bold dark:text-[#e7e9ea]"}>Home</h1>

                <HiOutlineRefresh onClick={handleRefresh} className={"h-6 w-6 md:h-8 md:w-8 mt-5 mr-5 cursor-pointer text-twitter transition-all duration-500 ease-out active:scale-125 hover:rotate-180"}/>
            </div>

            <div>
                <TweetBox setTweets={setTweets} />
            </div>

            <div>
                {tweets.map((tweet) => <TweetComponent key={tweet._id} tweet={tweet} />)}
            </div>
        </div>
    );
};

export default Feed;