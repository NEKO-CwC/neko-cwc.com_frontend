import React from "react";
import {TagInterface} from "../../utils/Interface.tsx";
import s from "../../css/mainArea-blogs/AuthorTag.module.css"


interface props {
    tags: TagInterface[]
}

function AuthorTag(props: props) {
    const tagColors = {
        "站长": "#66FF99",
        "前端": "#00FFFF",
        "后端": "#6666FF",
        "AIGC": "#FF99FF",
        "设计": "#FFFF99",
        // "站长": "#CCFF66",
        // "站长": "#99CCFF",
        // "站长": "#FF99CC",
        // "站长": "#CCFFFF",
        // "站长": "#CCCCFF"
    }

    const tags = props.tags;


    function generateTag(tag: TagInterface) {
        return (
            <div className={s.tag} key={tag.id} style={{
                background: `${tagColors[tag.content]}60`,
            }}>
                {tag.content}
            </div>
        )
    }

    return (
        <div className={s.container}>
            {tags.map(tag => generateTag(tag))}
        </div>
    )
}

export default AuthorTag;
