angular.module('modelrApp')
.factory('LoginSvc', ['AuthSvc', '$state', function LoginSvc(AuthSvc, $state) {
  var user = {};

  function getUser () {
    if (user == {}) {
      if (typeof localStorage === 'object') {
        try {
          user = localStorage.getItem('userEmail');
        } catch (e) {
          Storage.prototype._setItem = Storage.prototype.setItem;
          Storage.prototype.setItem = function () {};
        }
      }
    }
    return user;
  }

  function setUser (value) {
    if (typeof localStorage === 'object') {
      try {
        user = localStorage.setItem('userEmail', value);
      } catch (e) {
        Storage.prototype._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function () {};
      }
    }
    user = value;
  }

  function logout () {
    AuthSvc.$signOut();
    user = {};
    if (typeof localStorage === 'object') {
      try {
        user = localStorage.removeItem('userEmail', value);
      } catch (e) {
        Storage.prototype._setItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function () {};
      }
    }
    $state.go('login');
  }

  return {
    getUser: getUser,
    setUser: setUser,
    logout: logout
  };

}]);
