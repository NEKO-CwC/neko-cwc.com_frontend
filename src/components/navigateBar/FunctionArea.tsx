import React from "react";
import s from "../../css/navigateBar/FunctionArea.module.css"

function FunctionArea() {
    return (
        <div className={s.container}>
            <div className={`${s.items} ${s.blogs}`}>
                <div className={`${s.text} ${s.upper}`}>博客</div>
            </div>
            <div className={`${s.items} ${s.something}`}>
                <div className={s.text}>破烂</div>
            </div>
            <div className={`${s.items} ${s.about}`}>
                <div className={s.text}>关于</div>
            </div>
            <div className={`${s.slider} ${s["slider--blog"]}`}></div>
        </div>
    )
}

export default FunctionArea
