"use strict";
// On initial page load,use should see their own ip address and information
// use ipify to get user's ip address
fetch(`https://api.ipify.org/?format=json`)
  .then((res) => res.json()) //parse response as JSON
  .then((data) => {
    console.log(data);
    const userIp = data.ip;
    fetchIpDetails(userIp);
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

// User should be able to search for any IP address
const searchBtn = document.querySelector(".search-btn");
const searchedIp = document.querySelector("#search-bar").value;
searchBtn.addEventListener("click", () => {
  fetchIpDetails(searchedIp);
});

// fetch ip details
async function fetchIpDetails(ip) {
  const url = `
  https://geo.ipify.org/api/v2/country?apiKey=at_bGDoy4LONhpW05ix1qSSs6uK9iZex&ipAddress=${ip}`;

  const res = await fetch(url);
  const data = await res.json(); //parse response as JSON

  // updating dom with important data
  document.querySelector(".ip-address").innerHTML = data.ip;
  document.querySelector(".location").innerHTML = data.location.country + ", " + data.location.region;
  document.querySelector(".timezone").innerHTML = data.location.timezone;
  document.querySelector(".isp").innerHTML = data.isp;
}
