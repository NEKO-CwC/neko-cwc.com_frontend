export const baseUrl = "http://localhost:8080"


// const routerL1 = {
//     blog: "/blog",
//     comment: "/comment",
//     account: "/account",
//     file: "/file"
// }
export const api = {
    blog: {
        getBlog: "/blog/getBlog",
        getVoteInfo: "/blog/getBlogInfo",
        vote: "/blog/vote"
    },
    comment: {
        getComment: "/comment/getComment",
        getVoteInfo: "/comment/getVoteInfo",
        vote: "/comment/vote",
        reply: "/comment/reply",
    },
    account: {
        login: "/account/login",
        signup: "/account/signup",
        check: "/account/check",
        info: "/account/info"
    },
    file: {
        avatar: "/file/avatar",
    }
}
