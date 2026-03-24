function orderNow() {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    product: document.getElementById("product").value,
    quantity: document.getElementById("quantity").value
  };

  fetch("https://YOUR-RENDER-URL.onrender.com/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(data => {
    alert(data);
  });
}