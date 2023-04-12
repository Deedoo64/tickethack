// To change after deploy by vercel
const API = "http://localhost:3000";

//============================== searchForTrips =======================
function searchForTrips() {
  const departure = document.querySelector("#departure").value;
  const arrival = document.querySelector("#arrival").value;
  const date = document.querySelector("#date").value;

  const body = { arrival, departure, date };
  //   console.log("Ready to fetch ", body);

  fetch(API + "/trip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let haveTrains = data.result && data.trips.length > 0;

      console.log("have train ", haveTrains);

      // document.querySelector ("default").classList.visible = ! haveTrains;
      // document.querySelector ("container_trips").classList.visible =  haveTrains;
      document.querySelector("#container-trips").innerHTML = "";

      if (!haveTrains) {
        document.querySelector("#default").style.display = "flex";
        document.querySelector("#default").innerHTML = `
        <div id="notfoundImg">
        <img src="images/notfound.png" alt="notfoundImg">
        </div>
        <div class="text">No trip found.</div>`;
        return;
      }

      document.querySelector("#default").style.display = "none";

      for (const trip of data.trips) {
        const date = new Date(Date.parse(trip.date));
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        document.querySelector(
          "#container-trips"
        ).innerHTML += `<div id="travel">
          <div id="cities">${trip.departure} > ${trip.arrival}</div>
          <div id="hour">${hours}:${minutes}</div>
          <div id="price">${trip.price}€</div>
          <a class="book-class" id="book-btn">Book</a>
        </div>`;

        connectBookButton();
      }
    })
    .catch((error) => console.error(error));
}

function connectBookButton() {
  console.log("connectBookButton");
  console.log(document.querySelectorAll(".book-class"));
  for (let button of document.querySelectorAll(".book-class")) {
    button.onclick = bookTrip;
  }
}

function bookTrip() {
  // Retrieve travel information from div: travel
  console.log(this.parentNode);
  let cities = this.parentNode.querySelector("#cities").textContent.split(">");
  let departure = cities[0].trim();
  let arrival = cities[1].trim();
  let time = this.parentNode.querySelector("#hour").textContent.trim();
  let price = this.parentNode
    .querySelector("#price")
    .textContent.replace("€", "")
    .trim();

  const body = {
    departure,
    arrival,
    time,
    price,
  };

  console.log(body);

  // Save the selected trip in the cart ...
  fetch(API + "/cart/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.location.href = "cart.html";
    })
    .catch((error) => console.error(error));

  /// ... change current page to cart.html
}

document.querySelector("#search-btn").onclick = searchForTrips;
