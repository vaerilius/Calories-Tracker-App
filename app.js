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
      }
   }

})();

//UI controller
const UICtrl = (function () {
   console.log('item controller');
})();


//App controller
const App = (function (ItemCtrl, UICtrl) {
   // console.log(ItemCtrl.logData());

   //public methods
   return {
      init: function () {
         console.log('test');
      }
   }
})(ItemCtrl, UICtrl);
App.init();