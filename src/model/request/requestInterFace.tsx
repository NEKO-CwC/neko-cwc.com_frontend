import {UserInfo} from "../../utils/Interface.tsx";

export interface Blog_GetBlog {
    message: string,
    data: {
        blog: {
            Id: number,
            Title: string,
            AuthorId: number,
            CreatedAt: string,
            EditAt: string,
            ViewCount: number,
            Content: string,
            Tags: string
            State: number,
        }
    }
}

export interface Blog_GetComment {
    message: string,
    data: {
        comments: Comment[],
    }
}

export interface Account_Info {
    message: string,
    data: {
        userInfo: UserInfo
    }
}

export interface Account_Login {
    message: string,
    data: {
        userInfo: UserInfo
        token: string
    }
}

export interface Account_Signup {
    message: string
}

export interface Account_Check {
    message: string // 用户存在 | 用户不存咋
}
