const carts = [
  {
    id: "643536c9bbfe84b5d14215d8",
    departure: "Paris",
    arrival: "Bruxelles",
    date: "XXX",
    price: 147,
  },
  {
    id: "643536c9bbfe84b5d14215d9",
    departure: "Paris",
    arrival: "Bruxelles",
    date: "XXX",
    price: 111,
  },
  {
    id: "643536c9bbfe84b5d14215da",
    departure: "Lyon",
    arrival: "Paris",
    date: "XXX",
    price: 127,
  },
  {
    id: "643536c9bbfe84b5d14215db",
    departure: "Bruxelles",
    arrival: "Marseille",
    date: "XXX",
    price: 131,
  },
];

// Short cut on document elements
const box = document.querySelector("#container_box"); // Container of carts

function updateGuiFromDB() {
  console.log("UPDATE GUI FROM DB", carts);

  box.innerHTML = "";
  console.log(carts);

  for (let c of carts) {
    console.log(`Add cart ${c.departure} with id : ${c.id}`);
    let time = c.date;

    box.innerHTML += `<div id="ID${c.id}" class="item_box">
      <div class="trip_name">${c.departure} > ${c.arrival}</div>
      <div class="trip_time">${time}</div>
      <div class="trip_price">${c.price}</div>
      <button class="remove-trip-btn">X</button>
    </div>`;

    let id = `#ID${c.id}`;
    console.log();
    document.querySelector(id).onclick = removeItem;
  }

  connectAllRemoveButton();
}

function connectAllRemoveButton() {
  for (let c of carts) {
    document.querySelector(`#ID${c.id}`).onclick = removeItem;
  }
}

function updateTotalPrice() {
  let total = 0;
  for (let element of document.querySelectorAll(".trip_price")) {
    total += Number(element.textContent);
  }

  document.querySelector("#total").textContent = `Total : ${total} €`;
}

function removeItem() {
  const id = this.id.replace("ID", "");

  console.log(`Remove item with id ${id}`);

  // Here route.del

  this.remove();

  updateTotalPrice();
}

console.log("CART.js executed");
console.log("Going to call updateGuiFromDB() ");
updateGuiFromDB();
updateTotalPrice();
