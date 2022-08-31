"use strict";
// On initial page load,use should see their own ip address and information
// use ipify to get user's ip address
async function getUserIpOnPageLoad() {
  const url = `https://api.ipify.org/?format=json`;
  const res = await fetch(url);
  const data = await res.json(); //parse response as JSON

  // console.log(data);
  const userIpAddress = data.ip;
  fetchIpDetails(userIpAddress);
}
getUserIpOnPageLoad();

// User should be able to search for any IP address
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", getUserInput);

function getUserInput() {
  const searchedIpAddress = document.querySelector("#search-bar").value;
  fetchIpDetails(searchedIpAddress);

  // Show custom Loading values while fetching
  document.querySelector(".ip-address").innerHTML = "Loading...";
  document.querySelector(".location").innerHTML = "Loading...";
  document.querySelector(".timezone").innerHTML = "Loading...";
  document.querySelector(".isp").innerHTML = "Loading...";
}

// fetch ip details
async function fetchIpDetails(ipAddress) {
  const url = `
  https://geo.ipify.org/api/v2/country?apiKey=at_bGDoy4LONhpW05ix1qSSs6uK9iZex&ipAddress=${ipAddress}`;
  const res = await fetch(url);
  const data = await res.json(); //parse response as JSON

  // updating dom with important data
  document.querySelector(".ip-address").innerHTML = data.ip;
  document.querySelector(".location").innerHTML = data.location.country + ", " + data.location.region;
  document.querySelector(".timezone").innerHTML = data.location.timezone;
  document.querySelector(".isp").innerHTML = data.isp;
}

// Adding map functionality with leaflet.js
function showMap() {
  var map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
}
// Get the lat and long of current IP, and call the showMap function with them.
showMap();
