import React, {useEffect, useState} from 'react';
import {Tweet, Comment, CommentBody} from "../typings";
import TimeAgo from "react-timeago";
import { HiOutlineHeart} from "react-icons/hi";
import {RiChat1Line} from "react-icons/ri";
import {AiOutlineRetweet} from "react-icons/ai";
import {MdOutlineFileUpload} from "react-icons/md";
import {fetchComments} from "../utils";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";

interface Props {
    tweet: Tweet
}

const Tweet = ({tweet}: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("");
    const {data: session} = useSession();

    const reFetchComments = async () => {
        const comments: Comment[] = await fetchComments(tweet?._id);
        setComments(comments);
    }

    useEffect(() => {
        reFetchComments();
    }, []);

    const sendComments = async () => {
        const commentInfo: CommentBody = {
            comment: comment,
            username: session?.user?.name || "Unknown User",
            profileImg: session?.user?.image || "https://pbs.twimg.com/media/FN5VfLLXoAYpdOE?format=jpg&name=large",
            tweetId: tweet._id
        }

        const commentToast = toast.loading('Posting Comment...');

        const result = await fetch(`/api/addComment`, {
            body: JSON.stringify(commentInfo),
            method: "POST"
        });

        const json = await result.json();

        const newComments = await fetchComments(tweet._id);
        setComments(newComments);

        toast("Comment Added", {
            id: commentToast
        });

        return json

    }

    const handleCommentSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        await sendComments();
        setComment("");
        setCommentBoxVisible(false);
        await reFetchComments();
    }

    return (
        <div className={"border-y dark:border-gray-800 border-gray-100 p-5"}>
            <div className={"flex gap-4"}>
                <img className={"w-12 h-12 object-cover rounded-full"} src={tweet?.profileImg} alt=""/>

                <div>
                    <div className={"flex items-center space-x-1"}>
                        <p className={"text-xl font-semibold dark:text-[#e7e9ea]"}>{tweet?.username}</p>

                        <p className={"hidden sm:inline text-gray-400 text-xs"}>@{tweet?.username?.replace(/\s+/g, "").toLowerCase()} · </p>

                        <TimeAgo date={tweet?._createdAt} className={"text-xs text-gray-500"}/>
                    </div>

                    <p className={"mt-2 mb-3 dark:text-[#e7e9ea]"}>{tweet?.text}</p>

                    {tweet?.image && <img className={"tweet-image"} src={tweet.image} alt=""/>}
                </div>

            </div>

            <div className={"max-w-[425px] ml-16 mt-2 flex justify-between"}>
                <div className={"flex items-center cursor-pointer text-gray-400 gap-2"}>
                    <RiChat1Line onClick={() => session && setCommentBoxVisible(!commentBoxVisible)} />
                    <span>{comments?.length}</span>
                </div>

                <div className={"flex items-center cursor-pointer text-gray-400 gap-2"}>
                    <AiOutlineRetweet />
                    <span>0</span>
                </div>

                <div className={"flex items-center cursor-pointer text-gray-400 gap-2"}>
                    <HiOutlineHeart />
                    <span>0</span>
                </div>

                <div className={"flex items-center cursor-pointer text-gray-400 gap-2"}>
                    <MdOutlineFileUpload /><span>0</span>
                </div>
            </div>

            {/*------comment box-------*/}
            {commentBoxVisible && (
                <div className={"ml-16"}>
                    <form className={"flex gap-3 mt-3 py-2 px-4 border-y  dark:border-gray-800"}>
                        <input value={comment} onChange={e => setComment(e.target.value)} className={"comment-input"} type="text" placeholder={"Write a comment..."}/>

                        <button onClick={handleCommentSubmit} type={"submit"} disabled={!comment} className={"comment-btn"}>Post</button>
                    </form>
                </div>
            )}

            {/*-----comments--------*/}
            {comments?.length > 0 && (
                <div className={"space-y-3 ml-16 mt-6 border-t border-gray-100 dark:border-gray-600 p-5"}>
                    {comments.map((comment, index, arr) => <div className={"flex gap-2 relative"} key={comment._id}>
                        {index !== arr.length - 1 && <hr className={"absolute left-4 top-8 h-8 border-x  border-twitter/30 "}/>}

                        <img src={comment.profileImg} className={"w-8 h-8 rounded-full"} alt=""/>

                        <div>
                            <div className={"flex items-center gap-1"}>
                                <h2 className={"dark:text-[#e7e9ea]"}>{comment.username}</h2>
                                <p className={"hidden sm:inline text-gray-400 text-xs"}>@{comment.username.replace(/\s+/g, "").toLowerCase()} · </p>
                                <TimeAgo date={comment._createdAt} className={"text-xs text-gray-500"}/>
                            </div>

                            <p className={"dark:text-[#e7e9ea]"}>{comment?.comment}</p>

                        </div>
                    </div>)}
                </div>
            )}

        </div>
    );
};

export default Tweet;