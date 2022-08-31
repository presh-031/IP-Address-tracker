"use strict";
// On initial page load,use should see their own ip address and information
// use ipify to get user's ip address
async function getUserIpOnPageLoad() {
  const url = `https://api.ipify.org/?format=json`;
  const res = await fetch(url);
  const data = await res.json(); //parse response as JSON

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
  https://geo.ipify.org/api/v2/country,city?apiKey=at_bGDoy4LONhpW05ix1qSSs6uK9iZex&ipAddress=${ipAddress}`;
  const res = await fetch(url);
  const data = await res.json(); //parse response as JSON

  const lat = data.location.lat;
  const lng = data.location.lng;

  // updating dom with important data
  document.querySelector(".ip-address").innerHTML = data.ip;
  document.querySelector(".location").innerHTML =
    data.location.country + ", " + data.location.region + ", " + data.location.city;
  document.querySelector(".timezone").innerHTML = data.location.timezone;
  document.querySelector(".isp").innerHTML = data.isp;

  // calling map function with lat and lng
  showMap(lat, lng);
}

// Adding map functionality with leaflet.js
function showMap(lat, lng) {
  const mapArea = document.getElementById("map");
  const vh = Math.max(document.documentElement.clientHeight);
  mapArea.style.height = `${vh - 27}rem`;

  var map = L.map("map").setView([lat, lng], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
}
// Get the lat and long of current IP, and call the showMap function with them.
