import React from "react";
import s from "../../css/global/Comment.module.css"
import logoUnClick from "../../assets/svg/global/comment.svg"
import logoClicked from "../../assets/svg/global/comment-click.svg"


function Comment(props: {
    countState: { value: number, action: React.Dispatch<React.SetStateAction<number>>; }
    stateState: { value: boolean, action: React.Dispatch<React.SetStateAction<boolean>> }
}) {

    function handleLogoClick() {
        props.countState.action(prev => props.stateState.value ? prev - 1 : prev + 1)
        props.stateState.action(prev => !prev)
    }

    return (
        <div className={s.container}>
            <div className={s.logo} style={{
                background: props.stateState.value ? logoClicked : logoUnClick
            }}
                 onClick={() => handleLogoClick()}></div>
            <div className={s.count}>{props.countState.value}</div>
        </div>
    )
}

export default Comment
