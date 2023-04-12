// To change after deploy by vercel
const API = "http://localhost:3000";

const date_for_paris_lyon = "2023-04-11";

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

      let haveTrains = ! (!data.result || data.length === 0);

      console.log ("have train ", haveTrains);

      // document.querySelector ("default").classList.visible = ! haveTrains;
      // document.querySelector ("container_trips").classList.visible =  haveTrains;
      document.querySelector("#container-trips").innerHTML = "";

      if (! haveTrains) {
        document.querySelector('#default').style.display = 'flex'
        document.querySelector("#default").innerHTML = `
        <div id="notfoundImg">
        <img src="images/notfound.png" alt="notfoundImg">
        </div>
        <div class="text">No trip found.</div>`;
        return;
      }
      
      document.querySelector('#default').style.display = 'none';

      for (const trip of data.trips) {
        const date = new Date(Date.parse(trip.date));
        const hours = date.getHours()
        const minutes = date.getMinutes();
        document.querySelector("#container-trips").innerHTML += 
        `<div id="travel">
          <div id="cities">${trip.departure} > ${trip.arrival}</div>
          <div id="hour">${hours}:${minutes}</div>
          <div id="price">${trip.price}€</div>
          <a id="book-btn">Book</a>
        </div>`
      }
  })
    .catch((error) => console.error(error));
}




fetch(API + "/cart/new", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),












})
document.querySelector("#search-btn").onclick = searchForTrips;
