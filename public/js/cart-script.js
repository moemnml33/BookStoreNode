// on load
document.addEventListener("DOMContentLoaded", () => {
  // get cart div (parent)
  const cartDiv = document.querySelector(".cart");
  // create table element and give proper class name
  const cartTable = document.createElement("table");
  cartTable.className = "book-item";
  // fetch data from server
  fetch("/api/cart")
    .then((response) => response.json())
    .then((cart) => {
      // if cart is empty
      if (cart.length === 0) {
        cartDiv.innerHTML = '<p class="book-item">Your cart is empty.</p>';
        return;
      }
      // create table header
      const headerRow = `
            <tr class="book-item">
              <th>Type</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          `;
      // append header to table
      cartTable.innerHTML += headerRow;
      // loop each item in cart and display as td
      cart.forEach((item, index) => {
        const { title, price, quantity } = item;
        const totalPrice = (price * quantity).toFixed(2);
        const row = `
              <tr>
                <td>${title}</td>
                <td>$${price.toFixed(2)}</td>
                <td>
                  <form method="post" action="/api/cart/update">
                    <input type="number" name="quantity" value="${quantity}" min="1" required />
                    <input type="hidden" name="bookIndex" value="${index}" />
                    <button type="submit">Update</button>
                  </form>
                </td>
                <td>$${totalPrice}</td>
                <td>
                  <form method="post" action="/api/cart/remove">
                    <input type="hidden" name="bookIndex" value="${index}" />
                    <button type="submit" name="remove">Remove</button>
                  </form>
                </td>
              </tr>
            `;
        // append row to table
        cartTable.innerHTML += row;
      });
      // when table is complete append all to cart div
      cartDiv.appendChild(cartTable);
    })
    .catch((error) => {
      console.error("Error fetching cart:", error);
      cartDiv.innerHTML = '<p class="book-item">Error loading cart.</p>';
    });
});
