import React from "react";
import {
    AppBar,
    Badge,
    Button,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@material-ui/core";
import {AccountCircle, Error, Notifications, PersonAdd, PersonPinCircle} from "@material-ui/icons";
import './Header.css';
import {Link, useHistory} from "react-router-dom";
import LogoTransparent from "../../Images/logo-transparent-small.png";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import UserInfoCustomDialog from "../UserInfoCustomDialog/UserInfoCustomDialog";
import ShareSpaceService from "../../Services/ShareSpaceService";

const Header = (props) => {
    const history = useHistory();

    const [state, setState] = React.useState({
        notificationsAnchorEl: null,
        accountAnchorEl: null,

        dialogUserInfo: [],
        userInfoDialogOpen: false,

        error: false,

        fetchInProgress: false
    });

    const handleAccountIconClick = (event) => {
        setState({
            ...state,
            accountAnchorEl: event.currentTarget
        });
    };

    const handleNotificationIconClick = (event) => {
        setState({
            ...state,
            notificationsAnchorEl: event.currentTarget
        });
    };

    const handleAccountIconClose = () => {
        setState({
            ...state,
            accountAnchorEl: null
        });
    };

    const handleNotificationIconClose = () => {
        setState({
            ...state,
            notificationsAnchorEl: null
        });
    };

    const handleNotificationsClear = () => {
        ShareSpaceService.deleteCurrentUserNotifications(
            localStorage.getItem("userJwtToken"),
            props.userId
        ).then(
            (data) => {
                setState({
                    ...state,
                    error: false
                });
                props.onNotificationsClear();
            },
            (err) => {
                if(err.response.status === 403) {
                    props.onLogout();
                }
                else {
                    setState({
                        ...state,
                        error: true
                    });
                }
            });
    }

    const handleImageClick = () => {
        return history.push("/home");
    }

    const handleUserInfoDialogOpen = (username) => {
        ShareSpaceService.fetchUserByUsername(
            localStorage.getItem("userJwtToken"),
            username
        ).then(
            (data) => {
                setState({
                    ...state,
                    error: false,
                    dialogUserInfo: data.data,
                    userInfoDialogOpen: true,
                    fetchInProgress: false
                });
            },
            (err) => {
                if(err.response.status === 403) {
                    props.onLogout();
                }
                else {
                    setState({
                        ...state,
                        error: true,
                        dialogUserInfo: [],
                        userInfoDialogOpen: false,
                        fetchInProgress: false
                    });
                }
            });

        setState({
            ...state,
            fetchInProgress: true
        });
    }

    const handleUserInfoDialogClose = () => {
        setState({
            ...state,
            userInfoDialogOpen: false
        });
    }

    const handleLogout = () => {
        setState({
            ...state,
            accountAnchorEl: null
        });
        props.onLogout();
    }

    return (
        <div>
            <AppBar id="headerAppBar" position="static">
                <Toolbar id="headerToolbar">
                    <img src={LogoTransparent} alt="ShareSpace Logo" onClick={handleImageClick} />
                    <Typography style={{ paddingRight: "25px" }} variant="h6" noWrap>
                        <Link className="headerLink" to="/home">Home</Link>
                    </Typography>
                    <Typography style={{ paddingRight: "25px" }} variant="h6" noWrap>
                        <Link className="headerLink" to="/about">About</Link>
                    </Typography>
                    <Typography style={{ paddingRight: "25px" }} variant="h6" noWrap>
                        <Link className="headerLink" to="/contact">Contact</Link>
                    </Typography>
                    {localStorage.getItem("userJwtToken") !== null &&
                    <Typography style={{ paddingRight: "25px" }} variant="h6" noWrap>
                        <Link className="headerLink" to="/offers">Offers</Link>
                    </Typography>
                    }
                    {localStorage.getItem("userJwtToken") === null ? (
                        <Toolbar style={{ marginLeft: "auto" }}>
                            <Typography style={{ paddingRight: "25px" }} variant="h6" noWrap>
                                <Link className="headerLink" to="/login">Login</Link>
                            </Typography>
                            <Typography variant="h6" noWrap>
                                <Link className="headerLink" to="/register">Register</Link>
                            </Typography>
                        </Toolbar>
                    ) : (
                        <div id="headerIcons">
                            <IconButton
                                aria-label="show 1 new notification"
                                disabled
                            >
                                <Typography variant="h6" noWrap style={{ color: "gray" }}>
                                    Hi, {props.username}!
                                </Typography>
                            </IconButton>
                            <IconButton
                                aria-label="show new notifications"
                                style={{ marginLeft: "10px" }}
                                onClick={handleNotificationIconClick}
                            >
                                <Badge badgeContent={props.userNotifications.length} color="secondary"
                                >
                                    <Notifications />
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-label="account of current user"
                                aria-haspopup="true"
                                style={{ marginLeft: "20px" }}
                                onClick={handleAccountIconClick}
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={state.notificationsAnchorEl}
                                keepMounted
                                open={Boolean(state.notificationsAnchorEl)}
                                onClose={handleNotificationIconClose}
                            >
                                {props.userNotifications.length === 0 &&
                                <MenuItem onClick={handleNotificationIconClose}>
                                    <Typography variant="body1">No notifications available at this moment.</Typography>
                                </MenuItem>
                                }
                                {state.error === true &&
                                <MenuItem>
                                    <Typography variant="subtitle1" color="secondary">
                                        <Error color="secondary" />&nbsp;
                                        Error: The ShareSpace server is down.
                                    </Typography>
                                </MenuItem>
                                }
                                {props.userNotifications.map((notification, index) => {
                                    return (
                                        <Link className="headerLink" to="#">
                                            <MenuItem>
                                                {notification.type === "USER_JOIN" ?
                                                    (
                                                        <Grid container>
                                                            <Box>
                                                                <UserInfoCustomDialog
                                                                    userInfoDialogOpen={state.userInfoDialogOpen}
                                                                    onUserInfoDialogOpen={handleUserInfoDialogOpen}
                                                                    onUserInfoDialogClose={handleUserInfoDialogClose}
                                                                    dialogUserInfo={state.dialogUserInfo} />
                                                            </Box>
                                                            <Grid item xs={2} style={{marginRight: "25px"}}>
                                                                <Grid container justifyContent="flex-start">
                                                                    <PersonAdd
                                                                        style={{fontSize: "75px"}}/>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <span style={{fontWeight: "bold"}}>An user has joined your offer</span>
                                                                <Typography variant="subtitle1">
                                                                    {notification.description}
                                                                </Typography>
                                                                <Button onClick={() => handleUserInfoDialogOpen(notification.description.split(" ")[2].replace("(", "").replace(")", ""))}>
                                                                    View user info
                                                                    {state.fetchInProgress === true &&
                                                                    <CircularProgress style={{ marginLeft: "10px" }} size={15} />
                                                                    }
                                                                </Button><br />
                                                                <span style={{
                                                                    color: "gray",
                                                                    fontSize: "13px"
                                                                }}>{notification.receivedAt}</span>
                                                            </Grid>
                                                        </Grid>
                                                    ) :
                                                    (
                                                        <Grid container>
                                                            <Grid item xs={2} style={{marginRight: "25px"}}>
                                                                <Grid container justifyContent="flex-start">
                                                                    <PersonPinCircle
                                                                        style={{fontSize: "75px"}}/>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                {notification.type === "DRIVER_OFFER_CREATED_NEAR_USER" ?
                                                                    (
                                                                        <span style={{fontWeight: "bold"}}>Driver offer near you</span>
                                                                    ) :
                                                                    (
                                                                        <span style={{fontWeight: "bold"}}>Passenger offer near you</span>
                                                                    )}
                                                                <Typography variant="subtitle1">{notification.description}</Typography>
                                                                <Link to="/offers">
                                                                    <span onClick={handleNotificationIconClose}>View</span>
                                                                </Link><br />
                                                                <span style={{
                                                                    color: "gray",
                                                                    fontSize: "13px"
                                                                }}>{notification.receivedAt}</span>
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                }
                                            </MenuItem>
                                        </Link>
                                    );
                                })}
                                {props.userNotifications.length !== 0 &&
                                <Button color="primary" style={{margin: "10px"}} onClick={handleNotificationsClear}>
                                    Clear
                                </Button>
                                }
                            </Menu>
                            <Menu
                                id="simple-menu"
                                anchorEl={state.accountAnchorEl}
                                keepMounted
                                open={Boolean(state.accountAnchorEl)}
                                onClose={handleAccountIconClose}
                            >
                                <Link className="headerLink" to="/profile">
                                    <MenuItem onClick={handleAccountIconClose}>
                                        My profile
                                    </MenuItem>
                                </Link>
                                <Link className="headerLink">
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>
                                </Link>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;