const itemInput = document.getElementById('itemInput');
const addItemButton = document.getElementById('addItem');
const clearListButton = document.getElementById('clearList');
const shoppingList = document.getElementById('shoppingList');

let shoppingItems = JSON.parse(localStorage.getItem('shoppingItems')) || [];

    function saveToLocalStorage() {
        localStorage.setItem('shoppingItems', JSON.stringify(shoppingItems));
    }

    function renderList() {
        shoppingList.innerHTML = '';
        shoppingItems.forEach((item, index) => {

            const listItem = document.createElement('li');
            listItem.className = item.purchased ? 'purchased' : '';

            const text = document.createElement('span');
            text.contentEditable = true;
            text.textContent = item.name;
            text.addEventListener('blur', () => {
                shoppingItems[index].name = text.textContent;
                saveToLocalStorage();
            });
            listItem.appendChild(text);

            const purchaseButton = document.createElement('button');
            purchaseButton.textContent = 'Mark Purchased';
            purchaseButton.addEventListener('click', () => {
                shoppingItems[index].purchased = !shoppingItems[index].purchased;
                saveToLocalStorage();
                renderList();
            });
            listItem.appendChild(purchaseButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                shoppingItems.splice(index, 1);
                saveToLocalStorage();
                renderList();
            });
            listItem.appendChild(deleteButton);

            shoppingList.appendChild(listItem);
        });
    }

    addItemButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            shoppingItems.push({ name: itemName, purchased: false });
            saveToLocalStorage();
            renderList();
            itemInput.value = '';
        }
    });

    clearListButton.addEventListener('click', () => {
        shoppingItems = [];
        saveToLocalStorage();
        renderList();
    });

    renderList();