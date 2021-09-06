import React from "react";
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import {Facebook, Instagram, Twitter} from "@material-ui/icons";
import "./Footer.css";

const Footer = () => {
   return (
        <BottomNavigation id="footerBottomNavigation">
            <BottomNavigationAction icon={<Facebook />} href="#" />
            <BottomNavigationAction icon={<Twitter />} href="#" />
            <BottomNavigationAction icon={<Instagram />} href="#" />
        </BottomNavigation>
   )
}

export default Footer;