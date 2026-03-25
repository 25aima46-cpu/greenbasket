const API = "https://YOUR-BACKEND.onrender.com";

function placeOrder() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const studentClass = document.getElementById("class").value;
  const item = document.getElementById("item").value;

  fetch(API + "/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, studentClass, item })
  })
  .then(res => res.json())
  .then(() => loadOrders());
}

function loadOrders() {
  fetch(API + "/orders")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("orders");
      list.innerHTML = "";

      data.forEach(order => {
        const li = document.createElement("li");
        li.textContent =
          order.name + " (" + order.studentClass + ") ordered " + order.item;
        list.appendChild(li);
      });
    });
}

loadOrders();