// Store Controller


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
      items: [
         { id: 0, name: 'Steak Dinner', calories: 1200 },
         { id: 1, name: 'Cookie', calories: 400 },
         { id: 2, name: 'Eggs', calories: 300 },
      ],
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
      }
   }

})();

//UI controller
const UICtrl = (function () {

   const UISelectors = {
      itemlist: '#item-list',
      addBtn: '.add-btn',
      itemNameInput: '#item-name',
      caloriesInput: '#item-calories'
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
      getSelectors: function () {
         return UISelectors;
      }

   }
})();


//App controller
const App = (function (ItemCtrl, UICtrl) {

   const loadEventListeners = function () {
      const UISelectors = UICtrl.getSelectors();

      document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
   }
   const itemAddSubmit = function (e) {
      const input = UICtrl.getItemInput();

      if (input.name !== '' && input.calories !== '') {
         const newItem = ItemCtrl.addItem(input.name, input.calories);

      }
      e.preventDefault();
   }

   //public methods
   return {
      init: function () {
         const items = ItemCtrl.getItems();

         UICtrl.populateItemList(items);

         loadEventListeners();
      }
   }
})(ItemCtrl, UICtrl);
App.init();