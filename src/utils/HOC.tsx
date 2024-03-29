import React from "react";

function withIfLogin(WrappedComponent) {
    return function withIfLoginComponent({ifLogin: isLogin, ...props}) {
        if (isLogin) {
            return
        } else {
            return <WrappedComponent {...props}/>
        }
    }
}

export default withIfLogin;
