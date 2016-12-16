angular
  .module('modelrApp')
  .factory('NotificationSvc', notificationSvc);

notificationSvc.$inject = ['$stateParams', '$timeout', '$ionicPopup'];

function notificationSvc($stateParams, $timeout, $ionicPopup) {
  var factory = {
    add: add
  };

  function add(title, body) {
    var notification = $ionicPopup.show({
      title: title,
      template: body,
      cssClass: 'alert-as-notification'
    });
    notification.then(function(res) { } );
    $timeout(function() {
      notification.close();
    }, 2000);
  }


  return factory;
}
