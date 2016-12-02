angular
  .module('modelrApp')
  .factory('ModelPaintsSvc', modelPaintsSvc);

modelPaintsSvc.$inject = ['$firebaseArray', '$stateParams'];

function modelPaintsSvc($firebaseArray, $stateParams) {
  var factory = {
    getModelPaints: getModelPaints,
    addModelPaint: addModelPaint
  };

  function getModelPaints() {
    var modelPaintsRef = firebase.database().ref().child('modelsCollection/' + $stateParams.id + '/Paints');
    return $firebaseArray(modelPaintsRef);
  }

  function addModelPaint(paint) {
    $firebaseArray(modelPaintsRef).$add(paint)
      .then(function(ref) {
        var modelId = ref.key;
        paints.$save(modelId);
        console.log('Paint saved successfully: ', modelId);
      });
  }


  return factory;
}
