import React, {useContext} from "react";
import AuthorTag from "./AuthorTag.tsx";
import {MainAreaBlogsContext} from "../../model/context/Context.tsx";
import s from "../../css/mainArea-blogs/AuthorCard.module.css"

function AuthorCard() {
    const blogContext = useContext(MainAreaBlogsContext);
    console.log(blogContext.authorCard.l1.tags)


    return (

        <div className={s.container}>
            <div className={s.l1}>
                <div className={s.avatar}></div>
                <div className={s.textContainer}>
                    <div className={s.textL1}>
                        <div className={s.name}>{blogContext.authorCard.l1.name}</div>
                        <div className={s.days}>{blogContext.authorCard.l1.days}</div>
                    </div>
                    <div className={s.lastOnline}>上一次登录：{blogContext.authorCard.l1.lastOnline.split(" ")[0]}</div>
                </div>
            </div>
            <div className={s.l2}>
                <AuthorTag tags={blogContext.authorCard.l1.tags}/>
            </div>
        </div>
    )
}

export default AuthorCard;
