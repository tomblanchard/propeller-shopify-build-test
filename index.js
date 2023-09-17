(() => {
  var apiUrl = 'https://dummyjson.com/products';

  fetch(apiUrl)
    .then((res) => res.json())
    .then((res) => {
      render(res)
    })
    .catch((err) => console.log(err))

  function render(data) {
    var targetElement = document.body;

    var productsHTML = data.products
      .map((product) => {
        return `
          <li data-product data-title="${product.title}">
            <article class="relative h-full bg-gray-100 p-4">
              <div class="aspect-video mb-4">
                <img class="w-full h-full object-cover" src="${product.thumbnail}" alt="${product.title}">
              </div>

              <h2 class="text-l font-bold underline mb-2">
                <a class="before:absolute before:inset-0" href="https://dummyjson.com">
                  ${product.title}
                </a>
              </h2>

              <div class="text-sm">
                ${product.description}
              </div>
            </article>
          </li>
        `;  
      })
      .join('');

    var html = `
      <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold underline mb-6">
          Products
        </h1>

        <form class="mb-6" data-search-form>
          <label class="sr-only" for="search">
            Search
          </label>

          <input class="w-full p-4 bg-gray-100" id="search" type="search" placeholder="Search">
        </form>

        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          ${productsHTML}
        </ul>
      </div>
    `;

    targetElement.innerHTML = html;

    bindEvents();
  };

  function bindEvents() {
    var searchForm = document.querySelector('[data-search-form]');

    searchForm.addEventListener('keyup', () => filterProducts(searchForm.search.value));
  };

  function filterProducts(searchValue) {
    var productElements = document.querySelectorAll('[data-product]');

    productElements.forEach((productElement) => {
      var productTitle = productElement.dataset.title;

      if (productTitle.toLowerCase().trim().includes(searchValue.toLowerCase().trim())) {
        productElement.style.display = '';
      } else {
        productElement.style.display = 'none';
      }
    });
  };
})();
