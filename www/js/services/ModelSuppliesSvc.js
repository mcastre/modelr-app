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

  function getModelSupplies() {
    var modelSuppliesRef = firebase.database().ref().child('modelsCollection/' + $stateParams.id + '/Supplies');
    return $firebaseArray(modelSuppliesRef);
  }

  function addSupplyItem(item) {
    var modelSuppliesRef = firebase.database().ref().child('modelsCollection/' + $stateParams.id + '/Supplies');
    $firebaseArray(modelSuppliesRef).$add(item)
      .then(function(ref) {
        var modelId = ref.key;
        $firebaseArray(modelSuppliesRef).$save(modelId);
        console.log('Supply Item added: ', item);
      });
  }

  function removeSupplyItem(item) {
    var modelSuppliesRef = firebase.database().ref().child('modelsCollection/' + $stateParams.id + '/Supplies');
    $firebaseArray(modelSuppliesRef).$remove(item)
      .then(function(ref) {
        console.log('Removed item: ', ref.key);
      });
  }

  return factory;
}
