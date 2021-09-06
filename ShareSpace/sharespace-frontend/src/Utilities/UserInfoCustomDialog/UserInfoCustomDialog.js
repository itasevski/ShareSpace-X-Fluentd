import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const UserInfoCustomDialog = (props) => {
    return (
        <Dialog
            open={props.userInfoDialogOpen}
            onClose={props.onUserInfoDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">User info - {props.dialogUserInfo.fullName} :</DialogTitle>
            <DialogContent>
                <Typography variant="body1">Username: {props.dialogUserInfo.username}</Typography>
                <Typography variant="body1">{props.dialogUserInfo.type}</Typography>
                <Typography variant="body1">{props.dialogUserInfo.city}, {props.dialogUserInfo.municipality}</Typography>
                <Typography variant="body1">{props.dialogUserInfo.email}</Typography>
                <Typography variant="body1">{props.dialogUserInfo.phoneNumber}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onUserInfoDialogClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserInfoCustomDialog;