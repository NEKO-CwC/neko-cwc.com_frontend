import React, {useEffect, useState} from "react";
import s from "../../css/mainArea-blogs/MainArea-blogs.module.css";
import BlogArticle from "./BlogArticle.tsx";
import {MainAreaBlogsContext} from "../../model/context/Context.tsx";
import {CommentValue, MainAreaBlogsValue} from "../../utils/Interface.tsx";
import AuthorCard from "./AuthorCard.tsx";
import {api, baseUrl} from "../../config/backend.tsx";
import {Account_Info, Blog_GetBlog, Blog_GetComment} from "../../model/request/requestInterFace.tsx";
import axios from 'axios'
import {defaultErrorAlert} from "../../config/swal.ts";
import CommentArea from "./CommentArea.tsx";
import {useParams} from "react-router-dom";
import {useSequentialMount} from "../../utils/func.tsx";

function MainAreaBlogs() {
    let blogRes: Blog_GetBlog, userInfo: Account_Info;
    const params = useParams()
    const id = params.blogId


    const [blogMount, setBlogMount] = useState(false)
    const [authorMount, setAuthorMount] = useState(false)
    const [commentMount, setCommentMount] = useState(false)
    useSequentialMount([setBlogMount, setAuthorMount, setCommentMount], 200)

    const [blogArticle, setBlogArticle] = useState({
        blog: {
            author: "",
            createTime: "",
            viewTimes: 0,
            blogContent: {
                title: "",
                content: ""
            },
            comments: null,
            tags: [],
        },
        authorCard: {
            l1: {
                authorId: 0,
                name: "",
                authorEmail: "",
                lastOnline: "",
                days: 0,
                tags: []
            },
            l2: {
                articleCount: 0,
                fans: 0,
            }
        }
    });

    let blogArticleCache: MainAreaBlogsValue = {
        blog: {
            author: "",
            createTime: "",
            viewTimes: 0,
            blogContent: {
                title: "",
                content: ""
            },
            comments: null,
            tags: [],
        },
        authorCard: {
            l1: {
                authorId: 0,
                name: "",
                authorEmail: "",
                lastOnline: "",
                days: 0,
                tags: []
            },
            l2: {
                articleCount: 0,
                fans: 0,
            }
        }
    }


    useEffect(() => {
        axios.get(`${baseUrl}${api.blog.getBlog}?id=${id}`)
            .then(res => {
                blogRes = res.data

                blogArticleCache.blog.viewTimes = blogRes.data.blog.ViewCount
                blogArticleCache.blog.blogContent.content = blogRes.data.blog.Content
                blogArticleCache.blog.blogContent.title = blogRes.data.blog.Title
                blogArticleCache.blog.createTime = blogRes.data.blog.CreatedAt
                blogArticleCache.blog.tags = []
                blogRes.data.blog.Tags.split(" ").forEach(tagContent => {
                    blogArticleCache.blog.tags = [...blogArticleCache.blog.tags, {
                        id: blogArticleCache.blog.tags.length + 1,
                        content: tagContent
                    }]
                })
                const authorId = blogRes.data.blog.AuthorId

                // 加载作者信息
                axios.get(`${baseUrl}${api.account.info}?id=${authorId}`)
                    .then(res => {
                        userInfo = res.data

                        blogArticleCache.blog.author = userInfo.data.userInfo.Name
                        blogArticleCache.authorCard.l1.name = userInfo.data.userInfo.Name
                        blogArticleCache.authorCard.l1.authorEmail = userInfo.data.userInfo.Email
                        blogArticleCache.authorCard.l1.tags = []
                        userInfo.data.userInfo.Tags.split(" ").forEach(tag => {
                            blogArticleCache.authorCard.l1.tags = [...blogArticleCache.authorCard.l1.tags, {
                                id: blogArticleCache.authorCard.l1.tags.length + 1,
                                content: tag
                            }]
                        })
                        blogArticleCache.authorCard.l1.lastOnline = userInfo.data.userInfo.LastLogin
                        blogArticleCache.authorCard.l1.days = Math.floor((Date.now() - Date.parse(userInfo.data.userInfo.CreatedAt)) / 1000 / 60 / 60 / 24)
                        blogArticleCache.authorCard.l2.articleCount = userInfo.data.userInfo.ArticleCount
                        blogArticleCache.authorCard.l2.fans = userInfo.data.userInfo.Fans

                        axios.get(`${baseUrl}${api.comment.getComment}?id=${id}`)
                            .then(res => {
                                const response = res.data as Blog_GetComment
                                blogArticleCache.blog.comments = response.data.comments as unknown as CommentValue[]
                                setBlogArticle(blogArticleCache)
                            })
                            .catch(error => {
                                console.log(error)
                                defaultErrorAlert(error.response.data.message)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        defaultErrorAlert(error.response.data.message)
                    })
            })
            .catch(error => {
                console.log(error)
                defaultErrorAlert(error.response.data.message)
            })
        return () => {
        }
    }, []);

    return (
        <MainAreaBlogsContext.Provider value={blogArticle}>
            <div className={s.container}>
                {blogMount && <BlogArticle/>}
                <div className={s.aboutArticle}>
                    {authorMount && <AuthorCard/>}
                    {commentMount && <CommentArea/>}
                </div>
            </div>
        </MainAreaBlogsContext.Provider>
    )
}


export default MainAreaBlogs;
