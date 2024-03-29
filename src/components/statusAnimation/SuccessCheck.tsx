import React from "react";
import s from "../../css/statusAnimation/SuccessCheck.module.css"

function SuccessCheck() {
    return (
        <div className={s["success-checkmark"]}>
            <div className={s["check-icon"]}>
                <span className={`${s["icon-line"]} ${s["line-tip"]}`}></span>
                <span className={`${s["line-long"]} ${s["icon-line"]}`}></span>
                <div className={s["icon-circle"]}></div>
                <div className={`${s["icon-fix"]}`}></div>
            </div>
        </div>
    )
}

export default SuccessCheck
