import React, {useContext} from "react"
import s from "../../css/navigateBar/UserInfomation.module.css"
import {GlobalContext, UserInfoContext} from "../../model/context/Context.tsx";
import {Global} from "../../utils/Interface.tsx";

function UserInformation() {
    const userInfo = useContext(UserInfoContext);
    const Global: Global = useContext(GlobalContext)
    const setIfLoginRender = Global.useState[0][1]

    function handleUserInfoClick() {
        if (userInfo.userInfo.Name !== "") {
            // 个人信息调整
        } else {
            setIfLoginRender(true)
        }
    }

    return (
        <div className={s.container}
             onClick={() => {
                 handleUserInfoClick()
             }}>
            <div className={s.textContainer}>
                <div className={s.name}>{userInfo.userInfo.Name ? userInfo.userInfo.Name : "未登录"}</div>
                <div className={s.identity}>{userInfo.userInfo.Identity}</div>
            </div>
            <div className={s.imageContainer}>
                <div className={s.avatar} style={{
                    backgroundImage: `url("${userInfo.userIcon}")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain"
                }}></div>
            </div>
        </div>
    )
}

export default UserInformation
