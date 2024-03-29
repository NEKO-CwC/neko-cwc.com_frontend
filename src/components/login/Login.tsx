import Input from "./Input.tsx";
import Loading_DotsVsBars from "../loading/Loading_DotsVsBars.tsx";
import React, {useContext, useEffect, useRef, useState} from "react";
import {LoginContext, UserInfoContext} from "../../model/context/Context.tsx";
import "sweetalert2"
import axios from "axios";
import {api, baseUrl} from "../../config/backend.tsx";
import {Account_Check, Account_Login, Account_Signup} from "../../model/request/requestInterFace.tsx";
import Swal from "sweetalert2";
import {defaultErrorAlert} from "../../config/swal.ts";
import s from "../../css/login/Login.module.css"
import SuccessCheckOriginal from "../statusAnimation/SuccessCheckOriginal.tsx";


// function authenticateIfLogin() :boolean {
//
// }

interface LoginProps {
    useState: { setIfLoginRender, setIsLogin };
}

function Login(props: LoginProps) {
    const inputStyle = {
        width: "100%",
        height: "2.34vw",
        fontSize: "1.1vw",
    }

    const containerRef = useRef(null);
    const continueTextRef = useRef(null);

    const [userName, setUserName] = useState("")
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("继续");
    const [email, setEmail] = useState("");
    const [emailInputStatus, setEmailInputStatus] = useState("")
    const [password, setPassword] = useState("");
    const [passwordStatus, setPasswordStatus] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [rePasswordStatus, setRePasswordStatus] = useState("");
    const [ifContinueHeadShakeRun, setIfContinueHeadShakeRun] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [signupSuccess, setSignupSuccess] = useState(false)
    const [passwordInputHide, setPasswordInputHide] = useState(false)
    const [rePasswordInputHide, setRePasswordInputHide] = useState(false)

    const userInfoContext = useContext(UserInfoContext)

    const contextProvideValue = {
        "useState_set": {setStatus, setEmail, setPassword, setRePassword},
        "useState_use": {status, password, rePassword},
        "passwordShow": false,
        "rePasswordShow": false,
    }
    const {setIfLoginRender, setIsLogin} = props.useState;

    function handleContinueClick() {
        setLoading(true)
        if (emailInputStatus !== "correct") {
            setLoading(false)
            setIfContinueHeadShakeRun(true)
            setTimeout(() => {
                setIfContinueHeadShakeRun(false)
            }, 500)
        } else {
            if (status === "继续") {
                axios.get(`${baseUrl}/account/check?email=${email}`)
                    .then(res => {
                        const data: Account_Check = res.data;
                        if (data.message === "用户存在") {
                            setStatus("登录")
                        } else {
                            setStatus("注册")
                        }
                        setLoading(false)
                    })
                    .catch(error => {
                        defaultErrorAlert(error.data.message)
                        setLoading(false)
                    })
            } else if (status === "登录") {
                axios.post(`${baseUrl}${api.account.login}`, {
                    "email": email,
                    "password": password,
                }, {withCredentials: true})
                    .then(res => {
                        const response: Account_Login = res.data
                        userInfoContext.setUserInfo(response.data.userInfo)
                        setUserName(response.data.userInfo.Name)
                        setIsLogin(true)
                        console.log(response.data.userInfo)
                        setLoginSuccess(true)
                        setLoading(false)
                        axios.get(`${baseUrl}${api.file.avatar}?id=${response.data.userInfo.Id}`, {
                            responseType: "blob"
                        })
                            .then(res => {
                                userInfoContext.setUserIcon(URL.createObjectURL(res.data))
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        Swal.fire({
                            title: "错误",
                            text: error.response.data.message,
                            icon: "error"
                        })
                        setLoading(false)
                    })
            } else if (status === "注册") {
                if (passwordStatus === "correct" && rePasswordStatus === "correct") {
                    // 发送注册请求
                    axios.post(`${baseUrl}/account/signup`, {
                        "email": email,
                        "password": password,
                    })
                        .then(res => {
                            const response: Account_Signup = res.data
                            Swal.fire({
                                title: "注册成功",
                                icon: "success",
                                text: response.message
                            })
                            setLoading(false)
                            setSignupSuccess(true)
                        })
                        .catch(res => {
                            Swal.fire({
                                title: "错误",
                                text: res.data.message,
                                icon: "error"
                            })
                            setLoading(false)
                        })
                }
            }
        }
    }

    function handleCancelClick() {
        containerRef.current.style.animation = `${s["loginContainer-hide"]} 0.8s ease-in-out`;
        setTimeout(() => {
            setIfLoginRender(false);
        }, 750)
    }

    const emailVerifyFunc = (value: string): [string, string] => {
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailReg.test(value)) {
            return ["correct", ""]
        } else {
            return ["wrong", "邮箱格式错误"]
        }
    }

    const passwordVerifyFunc = (value: string): [string, string] => {
        const passwordReg_upperCase = /[A-Z]/;
        const passwordReg_lowerCase = /[a-z]/;
        const passwordReg_specialCase = /[_-]/;
        const passwordReg_numberCase = /[0-9]/;
        if (value !== "") {
            if (value.length >= 8) {
                if (passwordReg_numberCase.test(value)) {
                    if (passwordReg_lowerCase.test(value)) {
                        if (passwordReg_upperCase.test(value)) {
                            if (passwordReg_specialCase.test(value)) {
                                return ["correct", ""]
                            } else {
                                return ["wrong", "密码中至少要包含“_”或者“-”等特殊字符"]
                            }
                        } else {
                            return ["wrong", "密码中至少要包含大写字母"]
                        }
                    } else {
                        return ["wrong", "密码中至少要包含小写字母"]
                    }
                } else {
                    return ["wrong", "密码中至少要包含数字"]
                }
            } else {
                return ["wrong", "密码至少要8位以上"]
            }
        } else {
            return ["wrong", "密码不能为空"]
        }
    }

    const rePasswordVerifyFunc = (value: string): [string, string] => {
        console.log(value, "password:", password)
        if (value !== password) {
            return ["wrong", "两次输入密码不一致"]
        } else {
            return ["correct", ""]
        }
    }

    useEffect(() => {
        if (status != "继续") {
            setPasswordInputHide(true);
            setRePasswordInputHide(true)

            setTimeout(() => {
                setStatus("继续")
                setPasswordInputHide(false);
                setRePasswordInputHide(false)
            }, 800)
        }
    }, [email]);

    return (
        <LoginContext.Provider value={contextProvideValue}>
            <div ref={containerRef} className={s.container}>
                <div className={s.cancel}
                     onClick={() => handleCancelClick()}></div>
                {!(loginSuccess || signupSuccess) && <div className={s.contentInputContainer}>
                    <div className={s.logoContainer}>
                        <div className={s.logo}></div>
                    </div>
                    <div className={s.gap}></div>
                    <Input style={{
                        type: "text",
                        text: "邮箱",
                        inputStyle: inputStyle,
                        isHideAnimated: false
                    }}
                           verifyFunc={emailVerifyFunc}
                           setValue={setEmail}
                           fatherStatus={setEmailInputStatus}/>
                    {status === "登录" && <div className={s.gap} style={{
                        animation: passwordInputHide ? "inputFade .8s ease-in-out" : "",
                    }}></div>}
                    {status === "登录" &&
                        <Input style={{
                            type: "password",
                            text: "密码",
                            inputStyle: inputStyle,
                            isHideAnimated: passwordInputHide
                        }}
                               verifyFunc={null}
                               setValue={setPassword}
                               fatherStatus={null}/>}
                    {status === "注册" && <div className={s.gap} style={{
                        animation: rePasswordInputHide ? "inputFade .8s ease-in-out" : "",
                    }}></div>}
                    {status === "注册" &&
                        <Input style={{
                            type: "password",
                            text: "密码",
                            inputStyle: inputStyle,
                            isHideAnimated: rePasswordInputHide
                        }}
                               verifyFunc={passwordVerifyFunc}
                               setValue={setPassword}
                               fatherStatus={setPasswordStatus}/>}
                    {status === "注册" && <div className={s.gap} style={{
                        animation: rePasswordInputHide ? "inputFade .8s ease-in-out" : "",
                    }}></div>}
                    {status === "注册" &&
                        <Input style={{
                            type: "password",
                            text: "重新输入密码",
                            inputStyle: inputStyle,
                            isHideAnimated: rePasswordInputHide
                        }}
                               verifyFunc={rePasswordVerifyFunc}
                               setValue={setRePassword}
                               fatherStatus={setRePasswordStatus}/>}
                    <div className={s.gap}></div>
                    <div className={s.continue}
                         style={{animation: ifContinueHeadShakeRun ? `${s["headShake"]} 1s ease-in-out` : ""}}
                         onClick={() => handleContinueClick()}>
                        {loading ? <Loading_DotsVsBars/> :
                            <div ref={continueTextRef} className={s["continue__text"]}>{status}</div>}
                    </div>
                </div>}
                {loginSuccess && <div className={s.loginSuccessContent}>
                    <SuccessCheckOriginal/>
                    <div className={s.con}>
                        欢迎回来！
                        {userName}
                    </div>
                </div>}
                {signupSuccess && <div className={s.singupSuccessContainer}>
                    [迫真的邮件转化和飞出动画]
                </div>}
            </div>
        </LoginContext.Provider>
    )
}

export default Login
