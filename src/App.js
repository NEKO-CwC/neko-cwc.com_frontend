import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import MainAreaBlogs from "../../neko-owo.com/src/components/mainArea-blogs/MainArea-blogs";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";

function App() {


    const router = createBrowserRouter([{
        path: "/",
        element: <MainPage/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "blog/:blogId",
                element: <MainAreaBlogs/>
            },
            {
                path: "newBlog",
                element: <div/>
            }
        ]
    }])

    return (
        <RouterProvider router={router}/>
    );
}

export default App;

