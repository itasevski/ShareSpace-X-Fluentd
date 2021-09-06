import React from "react";
import {Box, CircularProgress, Typography} from "@material-ui/core";
import "./CircularProgressWithLabel.css"

const CircularProgressWithLabel = (props) => {
    return (
        <Box paddingRight={props.rightPadding} position="relative" display="inline-flex">
            <div id={props.componentId}>
                <CircularProgress style={{ color: props.forItem.color }} size={props.size} variant="determinate" value={props.value}/>
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    paddingRight={props.rightPadding}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {props.size === 180 ?
                        (
                            <Typography name="progressCircleLabel"
                                        variant="caption"
                                        component="div"
                                        style={{ color: props.forItem.color, fontSize: "14px" }}>
                                {props.forItem.label} <br /> {props.forItem.goal}
                            </Typography>
                        ) :
                        (
                            <Typography name="progressCircleLabel"
                                        variant="h6"
                                        component="div"
                                        style={{ color: props.forItem.color }}>
                                {props.forItem.label} <br /> {props.forItem.goal}
                            </Typography>
                        )}
                </Box>
            </div>
        </Box>
    );
}

export default CircularProgressWithLabel;