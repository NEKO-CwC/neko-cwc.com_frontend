import React from "react";

export interface User {
    name: string,
    identity: string,
    icon: any
}

export interface Global {
    useState: [any, React.Dispatch<React.SetStateAction<any>>][]
}


export interface CommentValue {
    Id: number,
    ReferId: number,
    BlogId: string,
    UserId: number,
    UserName: string,
    Identity: string,
    Content: string,
    CreatedAt: string,
    VoteUpCount: number,
    VoteDownCount: number,
    State: number,
    Replies?: CommentValue[],
}


export interface TagInterface {
    id: number
    content: string
}

export interface MainAreaBlogsValue {
    blog: {
        author: string,
        createTime: string,
        viewTimes: number,
        blogContent: {
            title: string,
            content: string,
        },
        tags: TagInterface[] | null,
        comments: CommentValue[]
    },
    authorCard: {
        l1: {
            authorId: number,
            name: string,
            authorEmail: string,
            lastOnline: string,
            days: number,
            tags: TagInterface[]
        },
        l2: {
            articleCount: number,
            fans: number,

        }
    }
}

export interface UserInfo {
    Id: number,
    Name: string,
    Email: string,
    Password: string,
    Salt: string,
    LastLogin: string,
    CreatedAt: string,
    Identity: string,
    Tags: string,
    ArticleCount: number,
    Fans: number,
    State: number,
}

export interface UserInfoContextInterface {
    userInfo: UserInfo,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>,
    userIcon: string | Blob,
    setUserIcon: React.Dispatch<React.SetStateAction<string>>
}
