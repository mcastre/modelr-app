angular
  .module('modelrApp')
  .factory('ModelPaintsSvc', modelPaintsSvc);

modelPaintsSvc.$inject = ['$firebaseArray', '$stateParams'];

function modelPaintsSvc($firebaseArray, $stateParams) {
  var factory = {
    getModelPaints: getModelPaints,
    addModelPaint: addModelPaint
  };

  var pathID = $stateParams.id;
  var modelRef = firebase.database().ref().child('modelsCollection/' + pathID);

  // SUPPLIES REFS
  var modelPaintsRef = modelRef.child('Paints');
  var paints = $firebaseArray(modelPaintsRef);

  function getModelPaints() {
    return paints;
  }

  function addModelPaint(paint) {
    paints.$add(paint)
      .then(function(ref) {
        var modelId = ref.key;
        paints.$save(modelId);
        console.log('Paint saved successfully: ', modelId);
      });
  }


  return factory;
}
