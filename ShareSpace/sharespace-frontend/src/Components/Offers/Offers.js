import React, {Component} from "react";
import {
    Button, CircularProgress,
    Grid, IconButton, MenuItem, Select,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, TextField, Tooltip
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./Offers.css";
import {ArrowBackIos, ArrowDownward, ArrowForwardIos, ArrowUpward, Clear, Error, Info} from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import FiltersCustomDialog from "../../Utilities/FiltersCustomDialog/FiltersCustomDialog";
import {Link} from "react-router-dom";
import Offer from "./Offer/Offer";
import {Pagination} from "@material-ui/lab";
import ShareSpaceService from "../../Services/ShareSpaceService";
import Profile from "../Profile/Profile";

class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            filters: {
                myLocation: true,
                myOffers: false,
                passengerOffers: false,
                driverOffers: false,
                createdToday: false,
                createdYesterday: false,
                personLimitOneFive: false,
                personLimitSixTen: false
            },
            sortOptions: [
                {
                    name: "Publisher",
                    value: "publisher"
                },
                {
                    name: "Date and time",
                    value: "dateAndTime"
                },
                {
                    name: "Person limit",
                    value: "personLimit"
                },
                {
                    name: "Destination",
                    value: "destination"
                }
            ],
            sortCriteria: "publisher",
            searchQueryString: "",

            error: false,

            page: 0,
            size: 5,

            sortInProgress: false,
            searchInProgress: false,
            filterInProgress: false,
            joinInProgress: false,

            profileInfo: []
        }
    }

    // handlers
    handleDialogOpen = () => {
        this.setState({
            dialogOpen: true
        });
    }

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        });
    }

    handleAppliedFilters = (appliedFilters) => {
        this.setState({
            filters: appliedFilters
        },
            this.filterOffers);
    }

    handleSortCriteriaChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handlePreviousPageClick = () => {
        const pageIndex = this.state.page - 1;

        this.setState({
            page: pageIndex
        });
    }

    handlePageChange = (event) => {
        const pageIndex = parseInt(event.target.textContent) - 1;

        this.setState({
            page: pageIndex
        });
    }

    handleNextPageClick = () => {
        const pageIndex = this.state.page + 1;

        this.setState({
            page: pageIndex
        });
    }

    handleFieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleProfileView = (profileInfo) => {
        this.setState({
            profileInfo: profileInfo
        });
    }

    handleOffersAscendingSort = () => {
        const sortCriteria = this.state.sortCriteria;

        this.sortOffers(sortCriteria, true);
    }

    handleOffersDescendingSort = () => {
        const sortCriteria = this.state.sortCriteria;

        this.sortOffers(sortCriteria, false);
    }

    handleOffersSearch = () => {
        const searchQueryString = this.state.searchQueryString;

        this.searchOffers(searchQueryString);
    }

    sortOffers = (criteria, isAscending) => {
        ShareSpaceService.fetchSortedOffers(
            localStorage.getItem("userJwtToken"),
            criteria, isAscending
        ).then(
            (data) => {
                this.setState({
                    error: false,
                    sortInProgress: false
                });
                this.props.onOffersSort(data.data);
            },
            (err) => {
                if(err.response.status === 403) {
                    this.props.onServerError();
                }
                else {
                    this.setState({
                        error: true,
                        sortInProgress: false
                    });
                    this.props.onOffersSort([]);
                }
            });

        this.setState({
           sortInProgress: true
        });
    }

    searchOffers = (queryString) => {
        ShareSpaceService.fetchOffersByQueryString(
            localStorage.getItem("userJwtToken"),
            queryString
        ).then(
            (data) => {
                this.setState({
                    error: false,
                    searchInProgress: false
                });
                this.props.onOffersSearch(data.data);
            },
            (err) => {
                if(err.response.status === 403) {
                    this.props.onServerError();
                }
                else {
                    this.setState({
                        error: true,
                        searchInProgress: false
                    });
                    this.props.onOffersSearch([]);
                }
            });

        this.setState({
            searchInProgress: true
        });
    }

    filterOffers = () => {
        const myLocation = this.state.filters.myLocation;
        const city = this.props.userCity;
        const municipality = this.props.userMunicipality;

        const myOffers = this.state.filters.myOffers;
        const userId = this.props.userId;

        const passengerOffers = this.state.filters.passengerOffers;
        const driverOffers = this.state.filters.driverOffers;
        const createdToday = this.state.filters.createdToday;
        const createdYesterday = this.state.filters.createdYesterday;
        const personLimitOneFive = this.state.filters.personLimitOneFive;
        const personLimitSixTen = this.state.filters.personLimitSixTen;

        ShareSpaceService.fetchFilteredOffers(
            localStorage.getItem("userJwtToken"),
            myLocation, city, municipality, myOffers, userId, passengerOffers, driverOffers, createdToday, createdYesterday, personLimitOneFive, personLimitSixTen
        ).then(
            (data) => {
                this.setState({
                    error: false,
                    filterInProgress: false
                });
                this.props.onOffersFilter(data.data);
            },
            (err) => {
                if(err.response.status === 403) {
                    this.props.onServerError();
                }
                else {
                    this.setState({
                        error: true,
                        filterInProgress: false
                    });
                    this.props.onOffersFilter([]);
                }
            });

        this.setState({
            filterInProgress: true
        });
    }

    offerJoin = (offerId) => {
        ShareSpaceService.joinOffer(
            localStorage.getItem("userJwtToken"),
            offerId, this.props.userId
        ).then(
            (data) => {
                var filters = {...this.state.filters};
                filters.myLocation = true;
                this.setState({
                    error: false,
                    joinInProgress: false,
                    filters: filters
                },
                    this.props.onOfferJoin);
            },
            (err) => {
                if(err.response.status === 403) {
                    this.props.onServerError();
                }
                else {
                    this.setState({
                        error: true,
                        joinInProgress: false
                    });
                }
            });

        this.setState({
            joinInProgress: true
        });
    }

    render() {
        const offset = this.state.page * this.state.size;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.offers.length / this.state.size);

        const offers = this.getOffersPage(offset, nextPageOffset);

        return (
            <div>
                {this.state.profileInfo.length !== 0 ?
                    (
                        <Profile item={this.props.item}
                                 userInfo={this.state.profileInfo}
                                 userId={this.props.userId} />
                    ) :
                    (
                        <div id="offersContainer">
                            <Grid container>
                                <Grid item xs={6}>
                                    <Grid container justifyContent="center" style={{ marginBottom: "10px" }}>
                                        <Typography variant="subtitle1">Your location: {this.props.userCity}, {this.props.userMunicipality}</Typography>
                                    </Grid>
                                    <Grid container justifyContent="center">
                                        <Link to="/createOffer" style={{ textDecoration: "none", color: "white" }}>
                                            <Button color="primary" variant="contained">
                                                Create offer
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container justifyContent="center">
                                        <Box mr={4}>
                                            <Button variant="contained" style={{ backgroundColor: "green", color: "white" }} onClick={this.handleDialogOpen}>
                                                Apply filters
                                            </Button><br />
                                            {this.state.filterInProgress === true &&
                                            <CircularProgress style={{ marginLeft: "60px", marginTop: "15px" }} size={25} />
                                            }
                                            <FiltersCustomDialog dialogOpen={this.state.dialogOpen}
                                                                 handleDialogOpen={this.handleDialogOpen}
                                                                 handleDialogClose={this.handleDialogClose}
                                                                 appliedFiltersHandler={this.handleAppliedFilters} />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle1">Active filters:</Typography>
                                            {this.state.filters.myLocation === true &&
                                            <Typography variant="subtitle2">
                                                <IconButton onClick={() => this.handleFilterClear("myLocation")} style={{ marginRight: "5px" }}>
                                                    <Clear style={{ fontSize: "15px" }}/>
                                                </IconButton>
                                                My Location
                                            </Typography>
                                            }
                                            {this.state.filters.myOffers === true &&
                                            <Typography variant="subtitle2">
                                                <IconButton onClick={() => this.handleFilterClear("myOffers")} style={{ marginRight: "5px" }}>
                                                    <Clear style={{ fontSize: "15px" }}/>
                                                </IconButton>
                                                My offers
                                            </Typography>
                                            }
                                            {this.state.filters.passengerOffers === true &&
                                            <Typography variant="subtitle2">
                                                <IconButton onClick={() => this.handleFilterClear("passengerOffers")}>
                                                    <Clear style={{ fontSize: "15px" }} />
                                                </IconButton>
                                                Passenger offers
                                            </Typography>
                                            }
                                            {this.state.filters.driverOffers === true &&
                                            <Typography variant="subtitle2">
                                                <IconButton onClick={() => this.handleFilterClear("driverOffers")}>
                                                    <Clear style={{ fontSize: "15px" }} />
                                                </IconButton>
                                                Driver offers
                                            </Typography>
                                            }
                                            {this.state.filters.createdToday === true &&
                                            <Typography variant="subtitle2">
                                                <IconButton onClick={() => this.handleFilterClear("createdToday")}>
                                                    <Clear style={{ fontSize: "15px" }} />
                                                </IconButton>
                                                Created today
                                            </Typography>
                                            }
                                            {this.state.filters.createdYesterday === true &&
                                            <Typography variant="subtitle2">
                                                <IconButton onClick={() => this.handleFilterClear("createdYesterday")}>
                                                    <Clear style={{ fontSize: "15px" }} />
                                                </IconButton>
                                                Created yesterday
                                            </Typography>
                                            }
                                            {this.state.filters.personLimitOneFive === true &&
                                            <Typography variant="subtitle2">
                                                <IconButton onClick={() => this.handleFilterClear("personLimitOneFive")}>
                                                    <Clear style={{ fontSize: "15px" }} />
                                                </IconButton>
                                                Person limit (1-5)
                                            </Typography>
                                            }
                                            {this.state.filters.personLimitSixTen === true &&
                                            <Typography variant="subtitle2">
                                                <IconButton onClick={() => this.handleFilterClear("personLimitSixTen")}>
                                                    <Clear style={{ fontSize: "15px" }} />
                                                </IconButton>
                                                Person limit (6-10)
                                            </Typography>
                                            }
                                        </Box>
                                    </Grid>
                                </Grid>
                                <hr style={{ width: "80%", color: "gray", marginTop: "20px", marginBottom: "30px" }}/>
                                <Grid item xs={3}>
                                    <Grid container justifyContent="center">
                                        <Box>
                                            <Typography variant="subtitle1">Sort by:</Typography>
                                            <Grid container>
                                                <Select
                                                    id="sortCriteria"
                                                    name="sortCriteria"
                                                    value={this.state.sortCriteria}
                                                    onChange={this.handleSortCriteriaChange}
                                                    style={{ width: "150px" }}
                                                >
                                                    {this.state.sortOptions.map((sortOption) => {
                                                        return (
                                                            <MenuItem value={sortOption.value}>{sortOption.name}</MenuItem>
                                                        );
                                                    })}
                                                </Select>
                                                <Box ml={1}>
                                                    <Tooltip title="Ascending">
                                                        <IconButton onClick={this.handleOffersAscendingSort}>
                                                            <ArrowUpward style={{ fontSize: "18px" }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Descending">
                                                        <IconButton onClick={this.handleOffersDescendingSort}>
                                                            <ArrowDownward style={{ fontSize: "18px" }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    {this.state.sortInProgress === true &&
                                                    <CircularProgress size={22} style={{ marginLeft: "5px" }} />
                                                    }
                                                </Box>
                                            </Grid>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid container justifyContent="flex-end">
                                        <TextField
                                            id="searchQueryString"
                                            name="searchQueryString"
                                            placeholder="Enter keywords..."
                                            style={{ marginRight: "15px" }}
                                            onChange={this.handleFieldChange} />
                                        <Button variant="outlined" color="primary" onClick={this.handleOffersSearch}>
                                            Search
                                            {this.state.searchInProgress === true &&
                                            <CircularProgress style={{ marginLeft: "10px" }} size={15} />
                                            }
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{ marginTop: "30px" }}>
                                    <Grid container justifyContent="center">
                                        {this.props.offerFetchError === true || this.state.error === true &&
                                        <Grid item xs={12}>
                                            <Grid container justifyContent="center">
                                                <Typography variant="subtitle1" color="secondary">
                                                    <Error color="secondary" />&nbsp;
                                                    Error fetching offers: The ShareSpace server is down.
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        }
                                        {this.props.offers.length === 0 ?
                                            (
                                                <Grid item xs={12}>
                                                    <Grid container justifyContent="center">
                                                        <Typography variant="subtitle1" style={{ color: "orange", fontSize: "25px", marginTop: "100px" }}>
                                                            <Info style={{ color: "orange", fontSize: "30px" }}/>&nbsp;
                                                            No offers are available for you at the moment.
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            ) :
                                            (
                                                <TableContainer style={{ width: "95%" }}>
                                                    <Table aria-label="a dense table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Publisher</TableCell>
                                                                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Offer type</TableCell>
                                                                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Date and time</TableCell>
                                                                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Person limit</TableCell>
                                                                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Rendezvous points</TableCell>
                                                                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Destination</TableCell>
                                                                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Vehicle</TableCell>
                                                                <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>People</TableCell>
                                                                <TableCell> </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {offers}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            )}
                                    </Grid>
                                </Grid>
                                {this.props.offers.length !== 0 &&
                                <Grid item xs={12} style={{ marginTop: "50px", marginBottom: "50px" }}>
                                    <Grid container justifyContent="center">
                                        <IconButton onClick={this.handlePreviousPageClick} disabled={this.state.page === 0}>
                                            <ArrowBackIos style={{ fontSize: "11px" }} />
                                        </IconButton>
                                        <Pagination page={this.state.page + 1} count={pageCount} color="primary" onChange={this.handlePageChange} hidePrevButton hideNextButton />
                                        <IconButton onClick={this.handleNextPageClick} disabled={this.state.page === pageCount - 1}>
                                            <ArrowForwardIos style={{ fontSize: "11px" }} />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                }
                            </Grid>
                        </div>
                    )
                }
            </div>
        )
    }

    handleFilterClear(data) {
        var filters = {...this.state.filters};
        switch (data) {
            case "myLocation":
                filters.myLocation = false;
                this.setState({
                    filters: filters
                },
                    this.filterOffers);
                return;
            case "myOffers":
                filters.myOffers = false;
                this.setState({
                    filters: filters
                },
                    this.filterOffers);
                return;
            case "passengerOffers":
                filters.passengerOffers = false;
                this.setState({
                    filters: filters
                },
                    this.filterOffers);
                return;
            case "driverOffers":
                filters.driverOffers = false;
                this.setState({
                    filters: filters
                },
                    this.filterOffers);
                return;
            case "createdToday":
                filters.createdToday = false;
                this.setState({
                    filters: filters
                },
                    this.filterOffers);
                return;
            case "createdYesterday":
                filters.createdYesterday = false;
                this.setState({
                    filters: filters
                },
                    this.filterOffers);
                return;
            case "personLimitOneFive":
                filters.personLimitOneFive = false;
                this.setState({
                    filters: filters
                },
                    this.filterOffers);
                return;
            case "personLimitSixTen":
                filters.personLimitSixTen = false;
                this.setState({
                    filters: filters
                },
                    this.filterOffers);
                return;
            default:
                return;
        }
    }

    getOffersPage = (offset, nextPageOffset) => {
        return this.props.offers.map((offer, index) => {
            return (
                <Offer
                    offer={offer}
                    joinInProgress={this.state.joinInProgress}
                    userId={this.props.userId}
                    onOfferExpire={this.props.onOfferExpire}
                    onServerError={this.props.onServerError}
                    onProfileView={this.handleProfileView}
                    onOfferJoin={this.offerJoin} />
            );
        }).filter((product, index) => (index >= offset && index < nextPageOffset));
    }

}

export default Offers;