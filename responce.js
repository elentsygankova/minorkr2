let content = [];

async function getResponse() {
    try {
        let response = await fetch("shop.json");
        console.log("response:\n", response, "\n /response: \n");
        let data = await response.text();
        console.log("await response.text()\n", data);
        content = JSON.parse(data);
        content = content.slice(0, 9);
        console.log("content.slice(0, 9)", content);

        renderProducts(content);
    } catch (error) {
        console.error("Error fetching or parsing data:", error);
    }
}

function renderProducts(products) {
    let node_for_insert = document.getElementById("node_for_insert");
    if (node_for_insert) {
        node_for_insert.innerHTML = '';
        products.forEach(item => {
            node_for_insert.innerHTML += `
                <li style="width: 210px" class="d-flex flex-column m-1 p-1 border bg-body">
                    <img style="width: 180px" class="align-self-center" src="${item.img}">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}. Цена ${item.price} р.</p>
                    <input type="hidden" name="vendor_code" value="${item.vendor_code}">
                    <p class="card-text">Заказать <input class="w-25" type="number" name="amount" value="0"></p>
                </li>
            `;
        });
    } else {
        console.error("Element with id 'node_for_insert' not found");
    }
}

document.getElementById("searchInput").addEventListener("input", function() {
    let searchValue = this.value.toLowerCase();
    let filteredContent = content.filter(item =>
        item.title.toLowerCase().includes(searchValue)
    );
    renderProducts(filteredContent);
});

getResponse();
