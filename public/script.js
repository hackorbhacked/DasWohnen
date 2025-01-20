const productIds = [
  '678a8d9605b73bb5b2d67118',
  '678a8d9605b73bb5b2d67119',
  '678a8d9605b73bb5b2d6711a',
  '678a8d9605b73bb5b2d6711b',
  '678a8d9605b73bb5b2d6711c',
  '678a8d9605b73bb5b2d6711d'
];

const productsContainer = document.getElementById('products-container');
productsContainer.innerHTML = ''; 

productIds.forEach(productId => {
  fetch(`/products/${productId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (status: ${response.status})`);
      }
      return response.json();
    })
    .then(product => {
      const escapedDescription = product.description.replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const productElement = `
        <div class="idea">
          <img src="${product.imageUrl}" alt="${product.name}">
          <h2>${product.name}</h2>
          <p>${escapedDescription}</p>
          <p>Price: $${product.price}</p>
          <a href="${product.link}" class="learn-more">Learn More</a> 
        </div>
      `;
      productsContainer.innerHTML += productElement;
    })
    .catch(error => {
      console.error(`Error fetching product ${productId}:`, error);
      const errorMessage = `<p>Error fetching product ${productId}. Please try again later.</p>`;
      productsContainer.innerHTML = errorMessage; 
    });
});