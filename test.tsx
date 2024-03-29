import React, {useEffect} from "react";

const Component = (props: { value }) => {
    return (
        <div>{props.value}</div>
    )
}

function App() {
    let value = 1

    useEffect(() => {
        value = 2
    }, []);

    return (
        <Component value={value}/>
    )
}

export default App
