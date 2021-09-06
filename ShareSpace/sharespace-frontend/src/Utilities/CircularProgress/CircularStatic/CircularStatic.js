import React from "react";
import CircularProgressWithLabel from "../CircularProgressWithLabel/CircularProgressWithLabel";

const CircularStatic = (props) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= props.forItem.value ? props.forItem.value : prevProgress + 100));
        }, 500);
        return () => {
            clearInterval(timer);
        };
    }, [props.forItem.value]);

    return <CircularProgressWithLabel value={progress} rightPadding={props.rightPadding} forItem={props.forItem} size={props.size} componentId={props.componentId} />;
}

export default CircularStatic;