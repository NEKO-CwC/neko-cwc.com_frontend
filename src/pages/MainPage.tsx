import Login from "../components/login/Login.tsx";
import NavigateBar from "../components/navigateBar/NavigateBar";
import React, {useContext, useEffect, useState} from "react";
import {GlobalContext, UserInfoContext} from "../model/context/Context.tsx";
import Cookies from 'js-cookie';
import axios from "axios";
import {Outlet,} from "react-router-dom"

import {api, baseUrl} from "../config/backend";
import {parseToken} from "../utils/func.tsx";

const App = React.memo(() => {
    const globalContext = useContext(GlobalContext)
    const [isLogin, setIsLogin] = globalContext.useState[1]
    const [ifLoginRender, setIfLoginRender] = globalContext.useState[0]

    return (
        <div className="App">
            {(ifLoginRender && !isLogin) && <Login useState={{setIfLoginRender, setIsLogin}}/>}
            <NavigateBar/>
            <Outlet/>
        </div>
    )
})

function MainPage() {
    const [ifLoginRender, setIfLoginRender] = useState(true);
    const [isLogin, setIsLogin] = useState(false)


    const [userInfo, setUserInfo] = useState({
        Id: 0,
        Name: "",
        Email: "",
        Password: "",
        Salt: "",
        LastLogin: "",
        CreatedAt: "",
        Identity: "",
        Tags: "",
        ArticleCount: 0,
        Fans: 0,
        State: 0
    })
    const [userIcon, setUserIcon] = useState("")

    useEffect(() => {
        const userInfoCookie = Cookies.get("token_login");
        if (userInfoCookie) {
            setIsLogin(true);
            const decodedUserInfo = parseToken(userInfoCookie);
            axios.get(`${baseUrl}${api.account.info}?id=${decodedUserInfo.ID}`)
                .then(res => {
                    setUserInfo(res.data.data.userInfo)
                })
            axios.get(`${baseUrl}${api.file.avatar}?id=${decodedUserInfo.ID}`, {responseType: "blob"})
                .then(res => {
                    setUserIcon(URL.createObjectURL(res.data));
                });
        } else {
            axios.get(`${baseUrl}${api.file.avatar}?id=-1`, {responseType: "blob"})
                .then(res => {
                    setUserIcon(URL.createObjectURL(res.data));
                });
        }
    }, []); // 空依赖项数组意味着这个effect只在组件挂载时执行

    return (
        <GlobalContext.Provider value={{useState: [[ifLoginRender, setIfLoginRender], [isLogin, setIsLogin]]}}>
            <UserInfoContext.Provider
                value={{userInfo: userInfo, setUserInfo: setUserInfo, userIcon: userIcon, setUserIcon: setUserIcon}}>
                <App/>
            </UserInfoContext.Provider>
        </GlobalContext.Provider>
    );
}

export default MainPage;
