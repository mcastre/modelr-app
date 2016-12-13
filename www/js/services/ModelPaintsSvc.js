angular
  .module('modelrApp')
  .factory('ModelPaintsSvc', modelPaintsSvc);

modelPaintsSvc.$inject = ['$firebaseArray', '$stateParams'];

function modelPaintsSvc($firebaseArray, $stateParams) {
  var factory = {
    getModelPaints: getModelPaints,
    addModelPaint: addModelPaint
  };

  function sanitizeInput(str) {
    var newStr = str.replace(/\r?\n|\r/g, " ");
    return newStr.trim();
  }

  function getModelPaints() {
    var modelPaintsRef = firebase.database().ref().child('modelsCollection/' + $stateParams.id + '/Paints');
    return $firebaseArray(modelPaintsRef);
  }

  function addModelPaint(paint) {
    paint.priority = sanitizeInput(paint.priority);
    paint.manufacturer = sanitizeInput(paint.manufacturer);
    var modelPaintsRef = firebase.database().ref().child('modelsCollection/' + $stateParams.id + '/Paints');
    $firebaseArray(modelPaintsRef).$add(paint)
      .then(function(ref) {
        var modelId = ref.key;
        $firebaseArray(modelPaintsRef).$save(modelId);
        console.log('Paint saved successfully: ', modelId);
      });
  }


  return factory;
}
