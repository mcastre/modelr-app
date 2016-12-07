angular.module('modelrApp')
.factory('AddResourceSvc', ['$firebaseAuth', '$state', function AddResourceSvc($firebaseAuth, $state) {

  function addYouTubeVideo (video, userID) {
    var root = firebase.database().ref();
    var id = root.child('resourcesCollection').push();
    id.set(video, function (error) {
      if (!error) {
        var name = id.key;
        console.log(video, name);
        root.child('users/' + userID + '/resources/' + name).set(true);
        id.once('value', function (snap) {
          var data = snap.exportVal();
        });
      }
    });
  }

  return {
    addYouTubeVideo: addYouTubeVideo
  };

}]);
