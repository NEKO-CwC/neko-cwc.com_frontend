import s from "../../css/global/VoteDown.module.css";
import {VOTEDOWN} from "../../config/color.tsx";
import React from "react";

function VoteDown(props: {
    countState: { value: number, action: React.Dispatch<React.SetStateAction<number>> },
    stateState: { value: boolean, action: React.Dispatch<React.SetStateAction<boolean>> },
}) {

    function handlLogoClick(e) {
        props.countState.action(prev => prev + (props.stateState.value ? -1 : 1));
        props.stateState.action(prev => !prev)
        e.target.style.animation = `${s["click"]} 1s ease-in-out`
        e.target.style.pointerEvents = "none"
        setTimeout(() => {
            e.target.style.animation = "none";
            e.target.style.pointerEvents = "auto"
        }, 500)
    }

    return (
        <div className={s.container}>
            <div className={s.logo} style={{
                color: props.stateState.value ? VOTEDOWN : "#00000080"
            }}
                 onClick={e => handlLogoClick(e)}></div>
            <div className={s.count}>{props.countState.value}</div>
        </div>
    )
}

export default VoteDown
