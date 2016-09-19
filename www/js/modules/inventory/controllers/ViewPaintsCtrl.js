angular.module('modelrApp')
.controller('ViewPaintsCtrl', ['$scope', '$stateParams', 'PaintsSvc', '$ionicModal', '$firebaseObject', function ViewPaintsCtrl($scope, $stateParams, PaintsSvc, $ionicModal, $firebaseObject) {

  var viewPaints = this;
  var pathID = $stateParams.id;
  var paintRef = firebase.database().ref().child('paintsCollection/' + pathID);
  viewPaints.data = $firebaseObject(paintRef);

  // SEARCH PAINTS
  viewPaints.search = {
    query: ''
  };

  // ADD PAINT
  $ionicModal.fromTemplateUrl('js/modules/inventory/templates/add-paint-modal-template.html', function($ionicModal) {
    viewPaints.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  viewPaints.openAddPaintModal = function () {
    viewPaints.modal.show();
  };

  viewPaints.closeAddPaintModal = function () {
    viewPaints.modal.hide();
  };

  viewPaints.addPaint = function (paint) {
    paintManufacturers.forEach(function(item) {
      PaintsSvc.addPaint(item);
    });
  };

}]);
