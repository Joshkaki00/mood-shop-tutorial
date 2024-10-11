import data from './data.js'

const itemsContainer = document.querySelector('#items')

const cart = []

const displayCart = () => {
	console.log(cart)
	let cartStr = ''
	for (let i = 0; i < cart.length; i += 1) {
	  const item = cart[i]
	  cartStr += `<li>
		<span>${item.id}</span>
		<input type="number" value="${item.qty}" class="input-qty" data-id="${item.id}">
		<span>${item.price}</span>
		<span>${(item.price * item.qty).toFixed(2)}</span>
		<button class="button-add" data-id="${item.id}">+</button>
		<button class="button-sub" data-id="${item.id}">-</button>
	  </li>`
	}
	// Get the cart 
	const cartItems = document.querySelector('#cart-items')
	// Set the inner html of the cart
	cartItems.innerHTML = cartStr
  }

  const addToCart = (id, price) => {
	for (let i = 0; i < cart.length; i += 1) {
	  const item = cart[i];
	  if (id === item.id) {
		item.qty += 1;
		return;
	  }
	}
	// If the item does not exist, push a new item to the cart
	cart.push({ id, price: parseFloat(price), qty: 1 });
  };
  

const removeFromCart = (id) => {
// Loop over items in cart
for (let i = 0; i < cart.length; i += 1 ) {
	// get an item 
	const item = cart[i]
	// Does id match the item id? 
	if (id === item.id) {
	// if so, subtract 1 from item qty
	item.qty -= 1
	// Check if the qty is 0
	if (item.qty === 0) {
		// If so remove this item from the cart
		cart.splice(i, 1)
	}
	return 
	}
}
}
  
document.body.addEventListener('click', (e) => {
  if (e.target.matches('.add-to-cart')) {
    addToCart(e.target.dataset.id, e.target.dataset.price);
    displayCart();
  } else if (e.target.matches('.button-add')) {
    addToCart(e.target.dataset.id);
    displayCart();
  } else if (e.target.matches('.button-sub')) {
    removeFromCart(e.target.dataset.id);
    displayCart();
  }
});


// the length of our data determines how many times this loop goes around
for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = data[i].image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
	// put new div inside items container
	itemsContainer.appendChild(newDiv)
	// create a paragraph element for a description
	const desc = document.createElement('P')
	// give the paragraph text from the data
	desc.innerText = data[i].desc
	// append the paragraph to the div
	newDiv.appendChild(desc)
	// do the same thing for price
	const price = document.createElement('P')
	price.innerText = data[i].price
	newDiv.appendChild(price)
	// Make a button 
	const button = document.createElement('button')
	// add an  id name to the button
	button.dataset.id = data[i].name
	// add a class name to the button
	button.className = 'add-to-cart'
	// creates a custom attribute called data-price. That will hold price for each element in the button
	button.dataset.price = data[i].price
	button.innerHTML = "Add to Cart"
	newDiv.appendChild(button)
	}
