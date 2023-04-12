// To change after deploy by vercel
const API = "http://localhost:3000";

let carts = [];

// Short cut on document elements
const box = document.querySelector("#container_box"); // Container of carts

// Static connection on buttons
document.querySelector("#purchase").onclick = purchase;

// ============== readAllCartFromDB () =============================
// Read all cart (non booked) from cart DB and update array carts
//==================================================================
async function readAllCartFromDB() {
  const response = await fetch(API + "/cart/allNonBooked");
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

    box.innerHTML += `<div id="ID${c._id}" class="item_box">
      <div class="trip_name">${c.departure} > ${c.arrival}</div>
      <div class="trip_time">${time}</div>
      <div class="trip_price">${c.price}</div>
      <button class="remove-trip-btn">X</button>
    </div>`;

    let id = `#ID${c._id}`;
    console.log();
    document.querySelector(id).onclick = removeItem;
  }

  connectAllRemoveButton();
}

function connectAllRemoveButton() {
  for (let c of carts) {
    document.querySelector(`#ID${c._id}`).onclick = removeItem;
  }
}

function updateTotalPrice() {
  let total = 0;
  for (let element of document.querySelectorAll(".trip_price")) {
    total += Number(element.textContent);
  }

  document.querySelector("#total").textContent = `Total : ${total} €`;
}

// =================== removeItem () =======================
// Remove a trip from the list and the DB
//==========================================================
function removeItem() {
  const id = this.id.replace("ID", "");

  console.log(`Remove item with id ${id}`);

  fetch(API + "/cart/delete/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      this.remove();
      updateTotalPrice();
    });
}

// =================== purchase () =======================
// Change cart in booking by setting isBooked property of
// Cart as true
//==========================================================
function purchase() {
  const ids = [];
  for (let box of document.querySelectorAll(".item_box"))
    ids.push(box.id.replace("ID", ""));

  // fetch(API + "/cart/book/" + id, {
  //   method: "PUT",
  // })
  console.log("PURCHASE");
  console.log(ids);
  const body = { ids };
  console.log("POST body");
  console.log(body);
  fetch(API + "/cart/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("YYYYYYYYYYYYYYESSSSSSSSSSSS, purchase done by router !!!!");
      for (let box of document.querySelectorAll(".item_box")) box.remove();
      updateTotalPrice();
      document.location.href = "booking.html";
    });
}

async function main() {
  await readAllCartFromDB();

  updateGuiFromCartsArray();
  updateTotalPrice();
}

console.log("CART.js is loaded");

main();
