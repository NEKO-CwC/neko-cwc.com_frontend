import {useEffect} from "react";

export const useSequentialMount = (setters, interval) => {
    useEffect(() => {
        // 为每个设置函数创建一个序列化的setTimeout调用链
        setters.reduce((prevPromise, setMount) => {
            return prevPromise.then(() => {
                return new Promise<void>(resolve => {
                    setTimeout(() => {
                        setMount(true);
                        resolve();
                    }, interval); // 延迟时间逐渐增加
                });
            });
        }, Promise.resolve()); // 以Promise.resolve()作为初始值开始链式调用
    }, []); // 空依赖数组意味着这个effect只在组件挂载时执行一次
};

export const parseToken = (token: string) => {
    var base64Url = token.split('.')[1]; // 获取载荷部分
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // 替换字符以适配 Base64
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
