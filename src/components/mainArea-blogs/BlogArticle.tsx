import React, {useContext, useEffect, useRef} from "react";
import {MainAreaBlogsContext} from "../../model/context/Context.tsx";
import MarkdownIt from "markdown-it"
import hljs from "highlight.js"
import s from "../../css/mainArea-blogs/BlogArticle.module.css"

function BlogArticle() {
    const contentRef = useRef(null)
    const containerRef = useRef(null)

    const blogContext = useContext(MainAreaBlogsContext)

    // let scrollProgress = 0
    //
    // function articleScroll(e) {
    //     scrollProgress = (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)) * 100;
    //     console.log(scrollProgress)
    //     if (scrollProgress === 0) {
    //         containerRef.current.animate([
    //             { transform: 'translateY(0)' },
    //             { transform: 'translateY(10px)', offset: 0.37 },
    //             { transform: 'translateY(-6px)', offset: 0.63 },
    //             { transform: 'translateY(0)' }
    //         ], {
    //             duration: 500,
    //             fill: 'forwards',
    //             easing: "ease-in-out",
    //         });
    //     } else if (scrollProgress >= 99.5) {
    //         containerRef.current.animate([
    //             {transform: 'translateY(0)'},
    //             {transform: 'translateY(-10px)', offset: 0.37},
    //             {transform: 'translateY(6px)', offset: 0.63},
    //             {transform: 'translateY(0)'}
    //         ], {
    //             duration: 500,
    //             fill: 'forwards',
    //             easing: "ease-in-out",
    //         });
    //     }
    // }

    const md = MarkdownIt({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return `<pre class="hljs"><code>${hljs.highlight(str, {
                        language: lang,
                        ignoreIllegals: true
                    }).value}</code></pre>`;
                } catch (__) {
                    // 忽略高亮错误
                }
            }

            // 对于不支持的语言或其他错误，返回未高亮的代码
            return `<pre class="hljs"><code>${MarkdownIt().utils.escapeHtml(str)}</code></pre>`;
        }
    });

    useEffect(() => {
        contentRef.current.innerHTML = md.render(blogContext.blog.blogContent.content)
    }, [blogContext.blog.blogContent]);

    return (
        <div ref={containerRef} className={s.container}>
            <div className={s.gap}></div>
            {/*<div className={s.article} onScroll={e => {articleScroll(e)}}>*/}
            <div className={s.article}>
                <div className={s["article__header"]}>
                    <div className={s.title}>{blogContext.blog.blogContent.title}</div>
                    <div className={s.info}>
                        <div className={s["viewTimesContainer"]}>
                            <div className={s["viewTimesLogo"]}></div>
                            <div className={s["blog-header-info-viewTimes"]}>{blogContext.blog.viewTimes}</div>
                        </div>
                        <div>{blogContext.blog.author}</div>
                        <div>{blogContext.blog.createTime}</div>
                    </div>
                </div>
                <div className={s["splitLine"]}></div>
                <div className={s["blog-body"]}>
                    <div ref={contentRef} className={s["blog-body-content"]}></div>
                </div>
            </div>
            <div className={s.gap}></div>
        </div>
    )
}

export default BlogArticle
