angular.module('modelrApp')
.factory('PaintsSvc', ['$firebaseArray', '$state', function PaintsSvc($firebaseArray, $state) {

  var paintsCollectionRef = firebase.database().ref().child('paintsCollection');
  var paints = $firebaseArray(paintsCollectionRef);

  function getPaints () {
    return paints;
  }

  function addPaint (paint) {
    paints.$add(paint).then(function(ref) {
      console.log("Paint added: ", paint);
    });
  }

  return {
    getPaints: getPaints,
    addPaint: addPaint
  }
}]);
