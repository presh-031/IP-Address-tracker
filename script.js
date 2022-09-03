"use strict";
// On initial page load,use should see their own ip address and information
// use ipify to get user's ip address
getUserIpOnPageLoad();
searchAnyIpOnClick();
searchAnyIpOnEnter();

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
  fetchIpDetails(searchedIpAddress);
  // map.off();
  // map.remove();

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
  showMap(lat, lng);
}

// Adding map functionality with leaflet.js
function showMap(lat, lng) {
  let mapArea = document.getElementById("map");
  const vh = Math.max(document.documentElement.clientHeight);
  mapArea.style.height = `${vh - 280}px`;

  var map = L.map("map").setView([lat, lng], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  // Adding location marker and popup to map
  var marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup("ip location").openPopup();

  // Adding eventListener to map
  var popup = L.popup();
  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  }
  map.on("click", onMapClick);
}
// Still working on map container already initialized errormsg
