// on load
document.addEventListener("DOMContentLoaded", () => {
  // get book-list ul element (parent)
  const bookList = document.getElementById("book-list");
  // for each book
  books.forEach((book, index) => {
    // create a list item and give proper class name
    const listItem = document.createElement("li");
    listItem.classList.add("book-item");
    // set innerHTML to display for each list element
    listItem.innerHTML = `
            <p class="book-header">
                <span class="book-title">${book.title}</span>
                <span class="book-price">$${book.price.toFixed(2)}</span>
            </p>
            <div>
                <form method="post" action="add-to-cart">
                    <label for="quantity-${index + 1}">Quantity:</label>
                    <input type="number" id="quantity-${
                      index + 1
                    }" name="quantity" min="1" value="1" required>
                    <input type="hidden" name="index" value="${index}">
                    <button class="add-to-cart" type="submit">Add to Cart</button>
                </form>
            </div>
        `;
    // append li element (child) to ul (parent)
    bookList.appendChild(listItem);
  });
});
