angular.module('modelrApp')
.controller('ModelDetailCtrl', ['$state', '$ionicHistory', function ModelDetailCtrl($state, $ionicHistory) {
  var model = this;

  model.goBack = function() {
    $state.go('models');
  };

}]);
