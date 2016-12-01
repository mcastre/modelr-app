angular
  .module('modelrApp')
  .factory('ModelSuppliesSvc', ModelSuppliesSvc);

ModelSuppliesSvc.$inject = ['$firebaseArray', '$stateParams'];

function ModelSuppliesSvc($firebaseArray, $stateParams) {
  var factory = {
    getModelSupplies: getModelSupplies,
    addSupplyItem: addSupplyItem,
    removeSupplyItem: removeSupplyItem
  };

  var pathID = $stateParams.id;
  var modelRef = firebase.database().ref().child('modelsCollection/' + pathID);

  // SUPPLIES REFS
  var modelSuppliesRef = modelRef.child('Supplies');
  var supplies = $firebaseArray(modelSuppliesRef);

  function getModelSupplies() {
    return supplies;
  }

  function addSupplyItem(item) {
    supplies.$add(item)
      .then(function(ref) {
        var modelId = ref.key;
        supplies.$save(modelId);
        console.log('Supply Item added: ', item);
      });
  }

  function removeSupplyItem(item) {
    supplies.$remove(item)
      .then(function(ref) {
        console.log('Removed item: ', ref.key);
      });
  }

  return factory;
}
