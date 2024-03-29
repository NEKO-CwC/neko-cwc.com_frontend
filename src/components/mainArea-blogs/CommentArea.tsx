import React, {useContext, useEffect, useRef, useState} from "react";
import {CommentSlideInObserverContext, MainAreaBlogsContext} from "../../model/context/Context.tsx";
import {CommentValue} from "../../utils/Interface.tsx";
import CommentCard from "./CommentCard.tsx";
import s from "../../css/mainArea-blogs/CommentArea.module.css"
import Reply from "../global/Reply.tsx";

function CommentArea() {
    const ob = useRef(null)

    const containerRef = useRef(null)
    const replyContainerRef = useRef(null)

    const [isLoaded, setIsLoaded] = useState(false)
    const [commentTree, setCommentTree] = useState<CommentValue[]>([])
    // const [commentAvatar, setCommentAvatar] = useState<Map<number, string>>(null)

    const blogContext = useContext(MainAreaBlogsContext)

    let replyAnimation

    function sortComments(comments: CommentValue[]) {
        let commentTree: CommentValue[] = []
        // const userIdAvatarMap: Map<number, string> = new Map()
        const commentMap: Map<number, CommentValue> = new Map();

        comments.forEach(comment => {
            commentMap.set(comment.Id, {...comment, Replies: []});
            // userIdAvatarMap.set(comment.UserId, "")
        });

        comments.forEach(comment => {
            // userIdAvatarMap.forEach((avatarUrl, userId, map)=>{
            //     axios.get(`${baseUrl}${api.file.avatar}`, { responseType: "blob" })
            //         .then(res => {
            //             map.set(userId, URL.createObjectURL(res.data))
            //         })
            // })
            if (comment.ReferId === -1) {
                commentTree = [...commentTree, commentMap.get(comment.Id)]; // 将根评论添加到根数组中
            } else {
                const parentComment = commentMap.get(comment.ReferId);
                if (parentComment) {
                    parentComment.Replies = [...parentComment.Replies, commentMap.get(comment.Id)]; // 将当前评论添加为父评论的子评论
                }
            }
            setCommentTree(commentTree)
        });

        setIsLoaded(true)
    }

    function handleReplyHover(e) {
        replyAnimation = e.target.animate([
            {right: "-1.5vh", clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)", offset: 0.25},
            {right: "-1vh", clipPath: "polygon(0 0, 60% 0, 60% 100%, 0 100%)", offset: 0.3},
            {right: "-1.5vh", clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)", offset: 0.5},
            {right: "-1.5vh", clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)", offset: 0.6},
            {right: "-0.5vh", clipPath: "polygon(0 0, 70% 0, 70% 100%, 0 100%)", offset: 0.8},
            {right: "-1.5vh", clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)", offset: 1},
        ], {
            easing: "ease-in-out",
            duration: 2000,
        })
    }


    function handleReplyClick(e) {
        replyAnimation.cancel();
        e.target.style.right = "-3vh";
        e.target.style.clipPath = "polygon(0 0, 0 0, 0 0, 0 0)";
        replyContainerRef.current.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
        replyContainerRef.current.style.transform = "translateY(0)"
        replyContainerRef.current.style.opacity = "1"
    }

    function handleObserver(entries: IntersectionObserverEntry[]) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate(
                    [{opacity: 0, transform: "translateY(50px)"},
                        {opacity: 1, transform: "translateY(0)"}],
                    {
                        duration: 500,
                        easing: "ease-in-out",
                        fill: "forwards",
                    }
                )
                ob.current.unobserve(entry.target)
            }
        })
    }

    useEffect(() => {
        ob.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "0px",
            threshold: [0],
        })
    }, []);

    useEffect(() => {
        if (blogContext.blog.comments) {
            sortComments(blogContext.blog.comments)
        }
    }, [blogContext.blog.comments]);


    return (
        <CommentSlideInObserverContext.Provider value={{ob: ob.current}}>
            <div className={s.container} ref={containerRef}>
                <div className={s.commentContainer}>
                    {isLoaded && commentTree.map((comment, index) =>
                        <CommentCard key={index} comment={comment}/>)}
                </div>
                <div className={s.reply} onMouseEnter={(e) => handleReplyHover(e)}
                     onClick={(e) => handleReplyClick(e)}></div>
                <div className={s.replyContainer} ref={replyContainerRef}>
                    <Reply replyContainerRef={replyContainerRef}/>
                </div>
            </div>
        </CommentSlideInObserverContext.Provider>
    )
}

export default CommentArea
