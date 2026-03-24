document.getElementById("form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    product: document.getElementById("product").value,
    quantity: document.getElementById("qty").value
  };

  await fetch("http://localhost:3000/order", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  alert("Order Saved!");
});
