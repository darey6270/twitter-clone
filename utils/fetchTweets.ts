import axios from "axios";
import {Tweet} from "../typings";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchTweets = async () => {
    const {data} = await axios.get(`${baseURL}/api/getTweets`);

    const tweets: Tweet[] = data.tweets;

    return tweets;
}