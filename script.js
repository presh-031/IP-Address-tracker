"use strict";
// On initial page load,use should see their own ip address and information
// use ipify to get user's ip address
getUserIpOnPageLoad();
searchAnyIpOnClick();
searchAnyIpOnEnter();

const map = L.map("map").setView([0, 0], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

// Adding location marker and popup to map
let myIcon = L.icon({
  iconUrl: "images/icon-location.svg",
  iconSize: [35, 35],
  iconAnchor: [15, 15],
});
const marker = L.marker([0, 0], { icon: myIcon }).addTo(map);
// marker.bindPopup("IP Location");

async function getUserIpOnPageLoad() {
  const url = `https://api.ipify.org/?format=json`;
  const res = await fetch(url);
  const data = await res.json(); //parse response as JSON

  const userIpAddress = data.ip;
  fetchIpDetails(userIpAddress);
}
// User should be able to search for any IP address
function searchAnyIpOnClick() {
  const searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", getUserInput);
}
// Pressing enter should also search IP
function searchAnyIpOnEnter() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getUserInput();
    }
  });
}

function getUserInput() {
  const searchedIpAddress = document.querySelector("#search-bar").value;
  // map.remove();
  // map.off();
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
  document.querySelector(
    ".location"
  ).innerHTML = `${data.location.country}, ${data.location.region}, ${data.location.city}`;
  document.querySelector(".timezone").innerHTML = data.location.timezone;
  document.querySelector(".isp").innerHTML = data.isp;

  // calling map function with lat and lng
  // showMap(lat, lng);
  map.setView([lat, lng], 13);
  marker.setLatLng([lat, lng]);
}

// Adding map functionality with leaflet.js
// function showMap(lat, lng) {
// let mapArea = document.getElementById("map");
// const vh = Math.max(document.documentElement.clientHeight);
// mapArea.style.height = `${vh - 280}px`;

// const map = L.map("map").setView([0, 0], 13);

// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution: "© OpenStreetMap",
// }).addTo(map);

// // Adding location marker and popup to map
// let myIcon = L.icon({
//   iconUrl: "images/icon-location.svg",
//   iconSize: [35, 35],
//   iconAnchor: [15, 15],
// });
// const marker = L.marker([0, 0], { icon: myIcon }).addTo(map);
// // marker.bindPopup("IP Location");

//
// map.setView([lat, lng], 13);
// marker.setLatLng([lat, lng]);
// marker.bindPopup(`");
// Adding eventListener to map
var popup = L.popup();
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}
map.on("click", onMapClick);

// map.zoomControl.remove();
// }
// Still working on map container already initialized errormsg
// map.remove() affects the initial set height of map that's required
