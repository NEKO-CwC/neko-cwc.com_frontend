import React from "react"
import Logo from "./Logo.tsx"
import FunctionArea from "./FunctionArea.tsx";
import s from "../../css/navigateBar/NavigateBar.module.css"
import SearchBar from "./SearchBar.tsx";
import UserOperateArea from "./UserOperateArea.tsx";
import UserInformation from "./UserInformation.tsx";

function NavigateBar() {
    return (
        <div className={s.container}>
            <Logo/>
            <FunctionArea/>
            <SearchBar/>
            <UserInformation/>
            <UserOperateArea/>
        </div>
    )
}

export default NavigateBar
