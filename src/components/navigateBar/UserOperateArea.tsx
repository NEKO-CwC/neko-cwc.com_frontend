import React from "react";
import s from "../../css/navigateBar/UserOperateArea.module.css"
import Swal from "sweetalert2";

function UserOperateArea() {

    function handleNewBlogClick() {
        Swal.fire({
            icon: "question",
            title: "还没做完捏",
            text: `在UserOperateArea的handleNewBlogClick函数中`
        })
    }

    return (
        <div className={s.container}>
            <div className={s.newBlog} onClick={() => handleNewBlogClick()}>
                <div className={s.newBlog__logo}></div>
                <div className={s.newBlog__text}>新建</div>
            </div>
        </div>
    )
}

export default UserOperateArea
