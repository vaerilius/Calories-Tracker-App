// Store Controller
const StorageCtrl = (function () {

   //public methods
   return {
      storeItem: function (newItem) {
         let items;

         if (localStorage.getItem('items') === null) {
            items = [];
            items.push(newItem);

            localStorage.setItem('items', JSON.stringify(items));
         } else {
            items = JSON.parse(localStorage.getItem('items'));

            items.push(newItem);

            localStorage.setItem('items', JSON.stringify(items));
         }

      },
      getItemsFromStorage: function () {
         let items;
         if (localStorage.getItem('items') === null) {
            items = [];
         } else {
            items = JSON.parse(localStorage.getItem('items'));
         }
         return items;
      },
      updateItemsStorage: function(updatedItem) {
         let items = JSON.parse(localStorage.getItem('items'));

         items.forEach(function(item, index){
            if (updatedItem.id === item.id) {
               items.splice(index, 1, updatedItem);
            }
         });
         localStorage.setItem('items', JSON.stringify(items));

      },
      deleteItemFromStoraage: function(curretID) {
         let items = JSON.parse(localStorage.getItem('items'));

         items.forEach(function(item, index){
            if (curretID === item.id) {
               items.splice(index, 1);
            }
         });
         localStorage.setItem('items', JSON.stringify(items));
      },
      cleaItemsFromStorage: function(){
         localStorage.removeItem('items');
      }

   }

})();

//Item Controller
const ItemCtrl = (function () {
   // privat
   //Item Constructor
   const Item = function (id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
   }

   // Data Structure / State
   const data = {
      // items: [
      //    // { id: 0, name: 'Steak Dinner', calories: 1200 },
      //    // { id: 1, name: 'Cookie', calories: 400 },
      //    // { id: 2, name: 'Eggs', calories: 300 },
      // ],
      items: StorageCtrl.getItemsFromStorage(),
      curretItem: null,
      totalCalories: 0
   }

   //public methods
   return {
      logData: function () {
         return data;
      },
      addItem: function (name, calories) {
         let ID;

         if (data.items.length > 0) {
            ID = data.items[data.items.length - 1].id + 1;
         } else {
            ID = 0;
         }

         calories = parseInt(calories);

         newItem = new Item(ID, name, calories);

         data.items.push(newItem);

         return newItem;
      },
      getItems: function () {
         return data.items;
      },
      getItemById: function (id) {
         let found = null;

         data.items.forEach(item => {
            if (item.id === id) {
               found = item;
            }
         });
         return found;
      },
      updateItem: function (name, calories) {
         calories = parseInt(calories);
         let found = null;

         data.items.forEach(item => {
            if (item.id === data.curretItem.id) {
               item.name = name;
               item.calories = calories;
               found = item;
            }
         });

         return found;
      },
      deleteItem: function (id) {
         const ids = data.items.map(function (item) {
            return item.id;
         });

         const index = ids.indexOf(id);

         data.items.splice(index, 1);

      },
      clearAllItems: function () {
         data.items = [];
      },

      setCurrentItem: function (item) {
         data.curretItem = item;
      },
      getCurrentItem: function () {
         return data.curretItem;
      },
      getTotalCalories: function () {
         let total = 0;
         data.items.forEach(item => {
            total += item.calories;
         });

         data.totalCalories = total;
         return data.totalCalories;
      }
   }

})();

//UI controller
const UICtrl = (function () {

   const UISelectors = {
      itemlist: '#item-list',
      listItems: '#item-list li',
      addBtn: '.add-btn',
      updateBtn: '.update-btn',
      deleteBtn: '.delete-btn',
      backBtn: '.back-btn',
      clearBtn: '.clear-btn',
      itemNameInput: '#item-name',
      caloriesInput: '#item-calories',
      totalCalories: '.total-calories',

   }

   return {
      populateItemList: function (items) {
         let html = '';
         items.forEach(item => {
            html += `
            <li class="collection-item" id="item-${item.id}"><strong>${item.name}</strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
         </li>
            `;
         });
         document.querySelector(UISelectors.itemlist).innerHTML = html;
      },
      getItemInput: function () {
         return {
            name: document.querySelector(UISelectors.itemNameInput).value,
            calories: document.querySelector(UISelectors.caloriesInput).value
         }
      },
      addListItem: function (item) {
         document.querySelector(UISelectors.itemlist).style.display = 'block';

         const li = document.createElement('li');
         li.className = 'collection-item';
         li.id = `item-${item.id}`;

         li.innerHTML = `
         <strong>${item.name}</strong> <em>${item.calories} Calories</em>
         <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
         `;
         document.querySelector(UISelectors.itemlist).insertAdjacentElement('beforeend', li);
      },
      updateListItem: function (item) {
         let listItems = document.querySelectorAll(UISelectors.listItems);

         //notelist can't loop for each
         listItems = Array.from(listItems);

         listItems.forEach(listItem => {
            const itemID = listItem.getAttribute('id');

            if (itemID === `item-${item.id}`) {
               document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}</strong> <em>${item.calories} Calories</em>
               <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
               `;
            }
         });
      },
      deleteListItem: function (id) {
         const itemID = `#item-${id}`;
         const item = document.querySelector(itemID);
         item.remove();
      },
      clearInputs: function () {
         document.querySelector(UISelectors.itemNameInput).value = '';
         document.querySelector(UISelectors.caloriesInput).value = '';
      },
      addItemToForm: function () {
         document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
         document.querySelector(UISelectors.caloriesInput).value = ItemCtrl.getCurrentItem().calories;
         UICtrl.showEditState();
      },
      removeItems: function () {
         let listItems = document.querySelectorAll(UISelectors.listItems);

         listItems = Array.from(listItems);

         listItems.forEach(item => {
            item.remove();
         });

      },
      hideList: function () {
         document.querySelector(UISelectors.itemlist).style.display = 'none';
      },
      showTotalCalories: function (totalCalories) {
         document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
      },
      clearEditState: function () {
         UICtrl.clearInputs();
         document.querySelector(UISelectors.updateBtn).style.display = 'none';
         document.querySelector(UISelectors.deleteBtn).style.display = 'none';
         document.querySelector(UISelectors.backBtn).style.display = 'none';
         document.querySelector(UISelectors.addBtn).style.display = 'inline';

      },
      showEditState: function () {
         document.querySelector(UISelectors.updateBtn).style.display = 'inline';
         document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
         document.querySelector(UISelectors.backBtn).style.display = 'inline';
         document.querySelector(UISelectors.addBtn).style.display = 'none';

      },
      getSelectors: function () {
         return UISelectors;
      }

   }
})();

//App controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {

   const loadEventListeners = function () {
      const UISelectors = UICtrl.getSelectors();

      document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

      document.addEventListener('keypress', function (e) {
         if (e.keyCode === 13 || e.which === 13) {
            e.preventDefault();
            return false;
         }
      })

      document.querySelector(UISelectors.itemlist).addEventListener('click', itemEditClick);
      document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
      document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
      document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItems);
      document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

   }
   const itemAddSubmit = function (e) {
      const input = UICtrl.getItemInput();

      if (input.name !== '' && input.calories !== '') {
         const newItem = ItemCtrl.addItem(input.name, input.calories);
         UICtrl.addListItem(newItem);

         const totalCalories = ItemCtrl.getTotalCalories();
         UICtrl.showTotalCalories(totalCalories);
         StorageCtrl.storeItem(newItem);
         UICtrl.clearInputs();
      }
      e.preventDefault();
   }

   const itemEditClick = function (e) {
      if (e.target.classList.contains('edit-item')) {
         const listId = e.target.parentElement.parentElement.id;
         const listIdArr = listId.split('-');
         const id = parseInt(listIdArr[1]);

         const itemToEdit = ItemCtrl.getItemById(id);

         ItemCtrl.setCurrentItem(itemToEdit);

         UICtrl.addItemToForm();
      }

      e.preventDefault();
   }
   const itemUpdateSubmit = function (e) {

      const input = UICtrl.getItemInput();
      const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

      UICtrl.updateListItem(updatedItem);

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      StorageCtrl.updateItemsStorage(updatedItem);

      UICtrl.clearEditState();
      e.preventDefault();
   }
   const itemDeleteSubmit = function (e) {

      const curretItem = ItemCtrl.getCurrentItem();

      ItemCtrl.deleteItem(curretItem.id);

      UICtrl.deleteListItem(curretItem.id);
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      StorageCtrl.deleteItemFromStoraage(curretItem.id);

      UICtrl.clearEditState();

      e.preventDefault();
   }

   const clearAllItems = function () {

      ItemCtrl.clearAllItems();
      const totalCalories = ItemCtrl.getTotalCalories();

      UICtrl.showTotalCalories(totalCalories);

      UICtrl.removeItems();

      StorageCtrl.cleaItemsFromStorage();

      UICtrl.hideList();
   }

   //public methods
   return {
      init: function () {
         UICtrl.clearEditState();

         const items = ItemCtrl.getItems();

         if (items.length === 0) {
            UICtrl.hideList();
         } else {
            UICtrl.populateItemList(items);
         }
         const totalCalories = ItemCtrl.getTotalCalories();
         UICtrl.showTotalCalories(totalCalories);

         loadEventListeners();
      }
   }

   //inwoke class
})(ItemCtrl, StorageCtrl, UICtrl);
App.init();