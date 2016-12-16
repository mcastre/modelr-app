angular
  .module('modelrApp')
  .factory('ModelPaintsSvc', modelPaintsSvc);

modelPaintsSvc.$inject = ['$firebaseArray', '$stateParams', '$timeout', 'AuthSvc', 'PaintsSvc'];

function modelPaintsSvc($firebaseArray, $stateParams, $timeout, AuthSvc, PaintsSvc) {
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
    var user = AuthSvc.$getAuth();
    var modelPaintsRef = firebase.database().ref().child('modelsCollection/' + $stateParams.id + '/Paints');

    paint.priority = sanitizeInput(paint.priority);
    paint.manufacturer = sanitizeInput(paint.manufacturer);

    $firebaseArray(modelPaintsRef).$add(paint)
      .then(function(ref) {
        var modelId = ref.key;
        $firebaseArray(modelPaintsRef).$save(modelId);
        PaintsSvc.addPaintToInventory(paint, user.uid, modelId);
        console.log('Paint saved successfully: ', modelId);
      });
  }


  return factory;
}
