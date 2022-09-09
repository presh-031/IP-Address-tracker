# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [How to use](#How-to-use)
- [Features](#Features)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

The challenge is to build out the IP Address Tracker app.

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![screenshot](./Screen%20Shot%202022-09-09%20at%2016.42.17-fullpage.png)

![screenshot](./Screen%20Shot%202022-09-09%20at%2016.42.26-fullpage.png)

## How to use

- Visit the url.
- As the webpage loads, the application will automatically detect your IP Address, and show the IP, your approximate Location, Timezone and ISP.
- The map also automatically shows your approximate location.
- To search for any IP address, simply input it in the search field and hit 'enter' or click the button.

## Features

- You can see your own IP Address on initial page load
- User can search for any IP Address and see the key information and location.
- Click on the map to show ypu the exact latitude and longitude of the point clicked , in a popup.
- The location icon shows the location of the IP Address, and a popup on it shows the IP currently being located.
- When a wrong IP Address is inputted or there's an error in loading the IP's information, an error popup shows up.

## My process

### Built with

- Semantic HTML5 markup
- SCSS
- CSS Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla Javascript
- Fetch, and Async await
- IP Geolocation API by IPify
- LeafletJS

### What I learned

- I practiced css positioning and z-index, which was necessary in order to place the map below the IP details area, and also for the overlay and modal popups.
- I learned and practiced error handling with fetch - as I had to use the concept to build the error popup.
- I practiced working with external javascript libraries like leaflet.js

### Continued development

- I will continue to use vanilla javascript in coming projects, but also begin to focus on react.js, a javascript library for building UIs.

## Author

- GitHub - [presh-031](https://github.com/presh-031)
- Frontend Mentor - [@presh-031](https://www.frontendmentor.io/profile/presh-031)
- Twitter - [@presh-031](https://twitter.com/Presh_031)

## Acknowledgments

-Leaflet.js
-IPify
