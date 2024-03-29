import React, {useEffect, useRef, useState} from "react";
import s from "../../css/navigateBar/SearchBar.module.css"
import Swal from 'sweetalert2'

function SearchBar() {
    const defaultInputValue = "在neko-owo.com中寻找"

    const searchLogoRef = useRef(null);
    const inputHintRef = useRef(null);
    const confirmRef = useRef(null);
    const [inputValue, setInputValue] = useState(defaultInputValue)

    function handleConfirmClick() {
        Swal.fire({
            icon: "question",
            title: "NEKO偷懒了捏",
            text: "在 src/components/navigateBar/SearchBar.tsx 中的 handleConfirmClick 函数中"
        })
    }

    function handleInputClick() {
        if (inputValue === defaultInputValue) {
            setInputValue("")
        }
        inputHintRef.current.style.backgroundSize = "100% 3px"
    }

    function handleInputChange(e) {
        setInputValue(e.target.value)
    }

    function handleInputBlur() {
        if (!inputValue) {
            setInputValue(defaultInputValue)
            inputHintRef.current.style.backgroundSize = "0 3px"
        } else {
            inputHintRef.current.style.backgroundSize = "0 3px"
        }
    }

    useEffect(() => {
        if (inputValue !== defaultInputValue) {
            searchLogoRef.current.style.transform = "translateY(100%)"
            confirmRef.current.style.transform = "translateY(0) rotate(360deg)"
        } else {
            searchLogoRef.current.style.transform = "translateY(0)"
            confirmRef.current.style.transform = "translateY(200%) rotate(0deg)"
        }
    }, [inputValue]);

    return (
        <div className={s.container}>
            <div className={s.logoContainer}>
                <div ref={searchLogoRef} className={s.logo}></div>
            </div>
            <div className={s.inputContainer}>
                <input type="text" className={`${s.input} ${s.typeHint}`} value={inputValue}
                       onInput={(e) => {
                           handleInputChange(e)
                       }}
                       onClick={() => {
                           handleInputClick()
                       }}
                       onBlur={() => {
                           handleInputBlur()
                       }}/>
                <div ref={inputHintRef} className={s.inputHint}></div>
            </div>
            <div className={s.confirmContainer}>
                <div ref={confirmRef} className={s.confirm}
                     onClick={() => handleConfirmClick()}></div>
            </div>
        </div>
    )
}

export default SearchBar
