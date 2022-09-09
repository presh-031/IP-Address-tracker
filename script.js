"use strict";
getUserIpOnPageLoad();
searchAnyIpOnClick();
searchAnyIpOnEnter();

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

//// Initializing map
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

// Adding eventListener to map
var popup = L.popup();
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}
map.on("click", onMapClick);

async function getUserIpOnPageLoad() {
  const url = `https://api.ipify.org/?format=json`;
  const res = await fetch(url);
  const data = await res.json(); //parse response as JSON

  const userIpAddress = data.ip;
  fetchIpDetails(userIpAddress);
}
// ///Search for any IP Address
// when search btn is clicked
function searchAnyIpOnClick() {
  const searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", getUserInput);
}
// when enter key is pressed
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
}

// fetch ip details and update map
function fetchIpDetails(ipAddress) {
  const url = `
  https://geo.ipify.org/api/v2/country,city?apiKey=at_bGDoy4LONhpW05ix1qSSs6uK9iZex&ipAddress=${ipAddress}`;

  fetch(url)
    .then((res) => res.json()) //parse response as JSON
    .then((data) => {
      const lat = data.location.lat;
      const lng = data.location.lng;

      // updating dom with important data
      document.querySelector(".ip-address").innerHTML = data.ip;
      document.querySelector(
        ".location"
      ).innerHTML = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
      document.querySelector(".timezone").innerHTML = "UTC " + data.location.timezone;
      document.querySelector(".isp").innerHTML = data.isp;

      //showing map  with lat and lng
      map.setView([lat, lng], 13);
      marker.setLatLng([lat, lng]);
      marker.bindPopup(data.ip).openPopup();
    })
    .catch((err) => {
      showModal(err);
    });
}
// Modal for errors
function showModal(err) {
  const errorMsg = document.querySelector(".error-msg");

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  errorMsg.innerHTML = "Failed to fetch / Invalid IP";

  document.querySelector("#search-bar").value = "";

  closeModal();
}

function closeModal() {
  const closeModalBtn = document.querySelector(".close-modal");
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  });

  // Closemodal when Esc is pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  });
}
