"use strict";
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", fetchIpDetails);

async function fetchIpDetails() {
  const userIp = document.querySelector("#search-bar").value;
  console.log(userIp);
  const url = `
  https://geo.ipify.org/api/v2/country?apiKey=at_bGDoy4LONhpW05ix1qSSs6uK9iZex&ipAddress=${userIp}`;

  const res = await fetch(url);
  const data = await res.json(); //parse response as JSON
  console.log(data);
}
