import React, {useEffect, useRef, useState} from "react";
import styles from "../../css/login/Input.module.css"
import visibleIcon from "../../assets/svg/login/visible.svg"
import unVisibleIcon from "../../assets/svg/login/unVisible.svg"
import {TYPING} from "../../config/color.tsx";

export interface InputProps {
    style: {
        type: string,
        text: string,
        inputStyle: {
            width: string,
            height: string,
            fontSize: string,
        },
        isHideAnimated: boolean
    },
    verifyFunc: (value: string) => [string, string] | null,  //第一个返回值是状态，第二个返回值是错误信息
    setValue: React.Dispatch<React.SetStateAction<string>>,
    fatherStatus: React.Dispatch<React.SetStateAction<string>> | null,
}

function Input(props: InputProps) {
    const inputFontSize = parseInt(props.style.inputStyle.fontSize);
    const hintSize = `${inputFontSize}vw`;
    const hintSmallSize = `${inputFontSize * 0.7}vw`
    const visibleHeight = `${parseInt(props.style.inputStyle.height) / 2}vw`

    const containerRef = useRef(null);
    const hintRef = useRef(null);
    const inputRef = useRef(null);
    const statusRef = useRef(null);
    const [statusColor, setStatusColor] = useState("");
    const [inputValue, setInputValue] = useState("")
    const [status, setStatus] = useState("blur");
    const [focusStatus, setFocusStatus] = useState("");
    const [hintStatus, setHintStatus] = useState("default");
    const [errorMessage, setErrorMessage] = useState("");
    const [visible, setVisible] = useState(false)


    function handleInputClick() {
        let status, errorMessage
        setFocusStatus("focus")
        setHintStatus("small")
        if (!inputRef.current.value) {
            setStatus("typing")
        } else {
            if (props.verifyFunc) {
                [status, errorMessage] = props.verifyFunc(inputValue)
            }
            setStatus(status)
            setErrorMessage(errorMessage)
        }
    }

    function handleInputBlur() {
        setFocusStatus("")
        if (!inputValue) {
            setHintStatus("default");
        }
    }

    function handleInputInput(e) {
        setInputValue(e.target.value)
        props.setValue(e.target.value)
        let status, errorMessage
        if (e.target.value && props.verifyFunc) {
            [status, errorMessage] = props.verifyFunc(e.target.value)
        } else {
            [status, errorMessage] = ["typing", ""]
        }
        setStatus(status)
        setErrorMessage(errorMessage)
    }

    useEffect(() => {
        if (props.fatherStatus) {
            props.fatherStatus(status)
        }
        if (status === "typing") {
            setStatusColor(TYPING)
        } else if (status === "wrong") {
            setStatusColor("#B60000")
        } else if (status === "correct") {
            setStatusColor("#19B600")
        } else {
            setStatusColor("#B6AE00")
        }
    }, [status]);

    return (
        <div ref={containerRef} style={{
            width: props.style.inputStyle.width,
            height: props.style.inputStyle.height,
            fontSize: props.style.inputStyle.fontSize,
            animation: props.style.isHideAnimated ? "inputFade .8s ease-in-out" : ""
        }} className={styles.container}>
            <span ref={hintRef} style={{
                height: props.style.inputStyle.height,
                fontSize: (hintStatus === "small") ? hintSmallSize : hintSize,
                top: (hintStatus === "small") ? "-50%" : "0",
                left: (hintStatus === "small") ? "0" : "4px",
            }} className={styles.hint}>{props.style.text}</span>
            <input ref={inputRef} className={styles.input} style={{
                width: props.style.inputStyle.width,
                height: props.style.inputStyle.height,
                fontSize: props.style.inputStyle.fontSize
            }} type={props.style.type !== "password" ? props.style.type : visible ? "text" : "password"}
                   onClick={() => handleInputClick()}
                   onInput={(e) => {
                       handleInputInput(e)
                   }}
                   onBlur={() => handleInputBlur()}/>
            <div className={styles.statusContainer}>
                <span className={styles["status--default"]}></span>
                <span ref={statusRef} className={styles.status} style={{
                    background: `${statusColor}`,
                    transform: `translateX(${(focusStatus) ? "0" : "-100%"})`
                }}></span>
            </div>
            <div className={styles.errorMessageContainer}>
                <div className={styles.errorMessage}
                     style={{top: (status === "wrong") ? "0" : "-100%"}}>{errorMessage}</div>
            </div>
            {props.style.type === "password" && <span className={styles.visible} style={{
                width: visibleHeight,
                height: visibleHeight,
                background: `url(${visible ? visibleIcon : unVisibleIcon}) center / contain no-repeat`,
            }} onClick={() => setVisible(prev => !prev)}></span>}
        </div>
    )
}

export default Input;
