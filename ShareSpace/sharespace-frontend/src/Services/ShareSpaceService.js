import AxiosShareSpace from "../Utilities/AxiosHttpClient/AxiosShareSpace/AxiosShareSpace";

const ShareSpaceService = {
    login: (username, password) => {
        return AxiosShareSpace.post("/login", {
            "username": username,
            "password": password
        });
    },
    register: (firstName, lastName, city, municipality, email, phoneNumber, username, password, confirmPassword, type) => {
        return AxiosShareSpace.post("/api/auth/register", {
            "firstName": firstName,
            "lastName": lastName,
            "city": city,
            "municipality": municipality,
            "email": email,
            "phoneNumber": phoneNumber,
            "username": username,
            "password": password,
            "confirmPassword": confirmPassword,
            "type": type
        });
    },
    fetchCurrentUser: (token, username) => {
        return AxiosShareSpace.get(`/api/users/find-username/${username}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
    fetchUserByUsername: (token, username) => {
        return AxiosShareSpace.get(`/api/users/find-username/${username}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
    fetchCurrentUserById: (token, id) => {
        return AxiosShareSpace.get(`/api/users/find-id/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
    fetchCurrentUserNotifications: (token, id) => {
        return AxiosShareSpace.get(`/api/notifications/find-recipientid/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
    deleteCurrentUserNotifications: (token, id) => {
        return AxiosShareSpace.get(`/api/notifications/delete/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    },
    updateCurrentUser: (token, id, firstName, lastName, city, municipality, phoneNumber, bio, facebookLink, twitterLink, instagramLink, type, vehicleModel) => {
        return AxiosShareSpace.post(`/api/users/update/${id}`, {
            "firstName": firstName,
            "lastName": lastName,
            "city": city,
            "municipality": municipality,
            "phoneNumber": phoneNumber,
            "bio": bio,
            "facebookLink": facebookLink,
            "twitterLink": twitterLink,
            "instagramLink": instagramLink,
            "type": type,
            "vehicleModel": vehicleModel
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    },
    changeCurrentUserPassword: (token, id, oldPassword, newPassword, confirmNewPassword) => {
        return AxiosShareSpace.post(`/api/users/changePassword/${id}`, {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "confirmNewPassword": confirmNewPassword
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    },
    sendMessage: (token, id, subject, body) => {
        return AxiosShareSpace.post("/api/message/create", {
            "userId": id,
            "subject": subject,
            "body": body
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    },
    fetchOffers: (token) => {
        return AxiosShareSpace.get("/api/offers", {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    },
    fetchSortedOffers: (token, criteria, isAscending) => {
        return AxiosShareSpace.post("/api/offers/sorted", {
            "criteria": criteria,
            "isAscending": isAscending
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    },
    fetchOffersByQueryString: (token, queryString) => {
        return AxiosShareSpace.get(`/api/offers?queryString=${queryString}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    },
    fetchFilteredOffers: (token, myLocation, city, municipality, myOffers, userId, passengerOffers, driverOffers, createdToday, createdYesterday, personLimitOneFive, personLimitSixTen) => {
        return AxiosShareSpace.post("/api/offers/filtered", {
            "myLocation": myLocation,
            "city": city,
            "municipality": municipality,
            "myOffers": myOffers,
            "userId": userId,
            "passengerOffers": passengerOffers,
            "driverOffers": driverOffers,
            "createdToday": createdToday,
            "createdYesterday": createdYesterday,
            "personLimitOneFive": personLimitOneFive,
            "personLimitSixTen": personLimitSixTen
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    },
    createOffer: (token, id, type, transportationVehicle, startDate, city, municipality, personLimit, destination, rendezvousPoints) => {
        return AxiosShareSpace.post("/api/offers/create", {
            "type": type,
            "transportationVehicle": transportationVehicle,
            "startDate": startDate,
            "city": city,
            "municipality": municipality,
            "personLimit": personLimit,
            "userId": id,
            "destination": destination,
            "rendezvousPoints": rendezvousPoints
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    },
    joinOffer: (token, offerId, userId) => {
        return AxiosShareSpace.post("/api/offers/join", {
            "offerId": offerId,
            "userId": userId
        }, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        });
    },
    deleteOffer: (offerId) => {
        return AxiosShareSpace.get(`/api/offers/delete/${offerId}`);
    }
}

export default ShareSpaceService;