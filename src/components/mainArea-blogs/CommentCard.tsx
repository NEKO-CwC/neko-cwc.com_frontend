import React, {useContext, useEffect, useRef, useState} from "react";
import Comment from "../global/Comment.tsx";
import {CommentValue} from "../../utils/Interface.tsx"
import s from "../../css/mainArea-blogs/CommentCard.module.css"
import VoteUp from "../global/VoteUp.tsx";
import VoteDown from "../global/VoteDown.tsx";
import {CommentSlideInObserverContext} from "../../model/context/Context.tsx";
import axios from "axios";
import {api, baseUrl} from "../../config/backend.tsx";


function CommentCard(props: { comment: CommentValue }) {

    const [voteUpCount, setVoteUpCount] = useState(props.comment.VoteUpCount)
    const [voteDownCount, setVoteDownCount] = useState(props.comment.VoteUpCount)
    const [voteUpState, setVoteUpState] = useState(false)
    const [voteDownState, setVoteDownState] = useState(false)
    const [childCommentShow, setChildCommentShow] = useState(false)
    const [commentCount, setCommentCount] = useState(props.comment.Replies.length)
    const [avatar, setAvatar] = useState("")

    const containerRef = useRef(null)
    const childContainerRef = useRef(null)

    const obContext = useContext(CommentSlideInObserverContext)


    function handleReplyClick() {
    }

    useEffect(() => {
        axios.get(`${baseUrl}${api.file.avatar}?id=${props.comment.UserId}`, {responseType: "blob"})
            .then(res => {
                setAvatar(URL.createObjectURL(res.data))
            })
        if (props.comment.ReferId === -1) {
            obContext.ob.observe(containerRef.current)
            return () => {
                if (containerRef.current) {
                    obContext.ob.unobserve(containerRef.current)
                }
            }
        }
    }, [])

    useEffect(() => {
        if (!!props.comment.Replies) {
            if (childContainerRef.current.style.height === '0px' || childContainerRef.current.style.height === '') {
                childContainerRef.current.style.height = childContainerRef.current.scrollHeight + 'px';
            } else {
                childContainerRef.current.style.height = '0';
            }
        }
    }, [childCommentShow]);


    return (
        <div className={s.container} ref={containerRef}>
            <div className={s.mainComment}>
                <div className={s.avatar} style={{
                    backgroundImage: `url("${avatar}")`
                }}></div>
                <div className={s.textContainer}>
                    <div className={s.userInfo}>
                        <div className={s.userInfo__name}>
                            {[props.comment.UserName]}
                        </div>
                        <div className={s.userInfo__identity}>
                            {props.comment.Identity}
                        </div>
                        <div className={s.useInfo__createdAt}>
                            {props.comment.CreatedAt}
                        </div>
                    </div>
                    <div className={s.contentContainer}>
                        <div className={s.content}>
                            {props.comment.State ? props.comment.Content : "ta说过了什么呢？"}
                        </div>
                    </div>
                    <div className={s.otherInfoContainer}>
                        <div className={s.otherInfo__left}>
                            <VoteUp countState={{value: voteUpCount, action: setVoteUpCount}}
                                    stateState={{value: voteUpState, action: setVoteUpState}}/>
                            <VoteDown countState={{value: voteDownCount, action: setVoteDownCount}}
                                      stateState={{value: voteDownState, action: setVoteDownState}}/>
                            <Comment countState={{value: commentCount, action: setCommentCount}}
                                     stateState={{value: childCommentShow, action: setChildCommentShow}}/>
                        </div>
                        <div className={s.otherInfo__right}>
                            <div className={s.reply} onClick={() => handleReplyClick()}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.childContainer} ref={childContainerRef}>
                {props.comment.Replies && props.comment.Replies.map((reply, index) => (
                    <CommentCard key={index} comment={reply}/>
                ))}
            </div>
        </div>
    )
}

export default CommentCard
