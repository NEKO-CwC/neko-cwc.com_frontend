import React, {useContext, useState} from "react";
import s from "../../css/global/Reply.module.css"
import {UserInfoContext} from "../../model/context/Context.tsx";

function Reply(props: { replyContainerRef }) {
    const defaultInputValue = "说点什么吧......";

    const [inputValue, setInputValue] = useState(defaultInputValue)

    const userInfoContext = useContext(UserInfoContext)

    function handleInputInput(e) {
        setInputValue(e.target.value)
    }

    function handleInputClick() {
        if (inputValue === defaultInputValue) {
            setInputValue("")
        }
    }

    function handleInputBlur() {
        if (inputValue === "") {
            setInputValue(defaultInputValue)
        }
    }

    function handleCancelClick() {
        props.replyContainerRef.current.style.transform = "translateY(100%)"
        props.replyContainerRef.current.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
        props.replyContainerRef.current.style.opacity = "0"
    }

    return (
        <div className={s.container}>
            <div className={s.cancel}
                 onClick={() => handleCancelClick()}></div>
            <div className={s.mainComment}>
                <div className={s.avatar} style={{
                    backgroundImage: `url("${userInfoContext.userIcon}")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                }}></div>
                <div className={s.textContainer}>
                    <div className={s.userInfo}>
                        <div className={s.name}>{userInfoContext.userInfo.Name}</div>
                        <div className={s.identity}>{userInfoContext.userInfo.Identity}</div>
                    </div>
                    <div className={s.contentContainer}>
                        <input className={s.content} value={inputValue}
                               onInput={e => handleInputInput(e)}
                               onClick={() => handleInputClick()}
                               onBlur={() => handleInputBlur()}/>
                    </div>
                    <div className={s.operateContainer}>
                        <div className={s.confirm}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reply
