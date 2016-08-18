angular.module('modelrApp')
.factory('AuthSvc', ['$firebaseAuth', function AuthSvc($firebaseAuth) {
  return $firebaseAuth();
}]);
