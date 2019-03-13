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
      getItems: function () {
         return data.items;
      }
   }

})();

//UI controller
const UICtrl = (function () {

   const UISelectors = {
      itemlist: '#item-list'
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

      }

   }
})();


//App controller
const App = (function (ItemCtrl, UICtrl) {

   //public methods
   return {
      init: function () {
         const items = ItemCtrl.getItems();

         UICtrl.populateItemList(items);
      }
   }
})(ItemCtrl, UICtrl);
App.init();