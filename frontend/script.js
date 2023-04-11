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
      if (!data.result || data.length === 0) {
        document.querySelector("#message-error").textContent = "No trip found.";
        return;
      }
      document.querySelector(
        "#message-error"
      ).textContent = `find ${data.trips.length} trips found`;
    })
    .catch((error) => console.error(error));
}

document.querySelector("#search-btn").onclick = searchForTrips;
