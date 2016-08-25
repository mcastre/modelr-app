angular.module('modelrApp')
.factory('AddModelSvc', ['$firebaseAuth', '$state', function AddModelSvc($firebaseAuth, $state) {

  function addModel (model, userID) {
    var root = firebase.database().ref();
    var id = root.child('modelsCollection').push();
    id.set(model, function (error) {
      if (!error) {
        var name = id.key;
        root.child('users/' + userID + '/models/' + name).set(true);
        $state.go('model', {'id': name});
        id.once('value', function (snap) {
          var data = snap.exportVal();
          console.log(data);
        });
      }
    });
  }

  return {
    addModel: addModel
  };

}]);
