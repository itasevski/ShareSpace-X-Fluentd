import React from "react";
import {Grid} from "@material-ui/core";
import CircularStatic from "../CircularStatic/CircularStatic";

const ProgressCircle = (props) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    {props.size === 180 ?
                        (<div>
                                <CircularStatic rightPadding={20} size={props.size} componentId={props.componentId} forItem={props.item.firstItem} />
                            <CircularStatic rightPadding={20} size={props.size} componentId={props.componentId} forItem={props.item.secondItem} />
                            <CircularStatic rightPadding={0} size={props.size} componentId={props.componentId} forItem={props.item.thirdItem} />
                        </div>
                        )
                        :
                        (<div>
                                <CircularStatic rightPadding={30} size={props.size} forItem={props.item.firstItem} componentId={props.componentId} />
                            <CircularStatic rightPadding={0} size={props.size} forItem={props.item.secondItem} componentId={props.componentId} />
                        </div>
                        )
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ProgressCircle;