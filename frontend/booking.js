// To change after deploy by vercel
const API = "http://localhost:3000";

let carts = [];

async function readAllCartFromDB() {
  const response = await fetch(API + "/cart/allBooked");
  const data = await response.json();
  console.log("JSON ===============");
  console.log(data);

  if (!data.result) {
    console.error("Unable to read carts");
    return;
  }

  carts = data.carts;
  console.log(`${carts.length} carts found`);
}

// Short cut on document elements
const box = document.querySelector("#container-trips"); // Container of carts

// ============== updateGuiFromCartsArray () =======================
// Add an div item_box for each trip found in carts array
//==================================================================
function updateGuiFromCartsArray() {
  console.log("UPDATE GUI FROM DB", carts);

  box.innerHTML = "";
  console.log(carts);

  for (let c of carts) {
    console.log(`Add cart ${c.departure} with id : ${c.id}`);
    let time = c.time;
    console.log('EEEEEEEEEEEEEEEEE', time)
    // Convert the document time to milliseconds
    let documentTime = new Date(c.time).getHours();
    console.log('uuuuuuuuuuuuuuuuuu', documentTime)
    // Get the current time in milliseconds
    let currentTime = new Date().getTime();
    console.log('OOOOOOOOOOOOOOOOO', currentTime)
    // Calculate the difference between the document time and the current time
    let difference = documentTime - currentTime;
    let hours = Math.floor(difference / (1000 * 60 * 60));

    box.innerHTML += `
      <div id="travel">
        <div id="cities" class="text">${c.departure} > ${c.arrival}</div>
        <div id="hour" class="text">${time}</div>
        <div id="price" class="text">${c.price}€</div>
        <div id="time_travel" class="text">Departure in ${hours}hours</div>
    </div>`;
    //   let id = `#ID${c._id}`;
    //   console.log();
    //   document.querySelector(id).onclick = removeItem;
  }

  connectAllRemoveButton();
}

async function main() {
  await readAllCartFromDB();

  updateGuiFromCartsArray();
}

main();
