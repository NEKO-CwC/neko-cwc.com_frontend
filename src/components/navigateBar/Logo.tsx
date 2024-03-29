import React from "react"
import s from "../../css/navigateBar/Logo.module.css"

function Logo() {
    return (
        <div className={s.container}>
            <div className={s.logo}></div>
            <div className={s.name}>NEKO</div>
        </div>
    )
}


export default Logo
