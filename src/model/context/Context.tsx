import {createContext} from "react";
import {Global, MainAreaBlogsValue, UserInfoContextInterface} from "../../utils/Interface.tsx";

export const LoginContext = createContext(null)
export const UserInfoContext = createContext<UserInfoContextInterface | null>(null)
// export const ThemeContext = createContext(null)
export const GlobalContext = createContext<Global | null>(null)
export const MainAreaBlogsContext = createContext<MainAreaBlogsValue | null>(null)
// export const CommentAreaContext = createContext<>(null)
export const CommentSlideInObserverContext = createContext<{ ob: IntersectionObserver }>(null)
