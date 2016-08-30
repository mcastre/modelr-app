angular.module('modelrApp')
.controller('InventoryPaintsCtrl', ['$scope', '$state', 'PaintsSvc', '$ionicModal', function InventoryPaintsCtrl($scope, $state, PaintsSvc, $ionicModal) {

  var paints = this;
  var somePaints = [
    {
      'type': 'TS',
      'title': 'Red Brown',
      'hexKey': '85001',
      'swatch': '#725746',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'Dark Green',
      'hexKey': '85001',
      'swatch': '#334B3C',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'Dark Yellow',
      'hexKey': '85003',
      'swatch': '#B1A14F',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'German Gray',
      'hexKey': '85004',
      'swatch': '#374548',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'Olive Drab',
      'hexKey': '85005',
      'swatch': '#48573D',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'Matt Black',
      'hexKey': '85006',
      'swatch': '#181717',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'Racing White',
      'hexKey': '85007',
      'swatch': '#FFFFFF',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'Italian Red',
      'hexKey': '85008',
      'swatch': '#D92328',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'British Green',
      'hexKey': '85009',
      'swatch': '#16553B',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'French Blue',
      'hexKey': '85010',
      'swatch': '#1883BD',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'Maroon',
      'hexKey': '85011',
      'swatch': '#47313E',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'Orange',
      'hexKey': '85012',
      'swatch': '#E57C2A',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'Clear',
      'hexKey': '85013',
      'swatch': '#FFFFFF',
      'manufacturer': 'Tamiya',
      'inStock': false
    },
    {
      'type': 'TS',
      'title': 'Black',
      'hexKey': '85014',
      'swatch': '#000000',
      'manufacturer': 'Tamiya',
      'inStock': false
    }
  ]

  paints.tamiyaPaints = PaintsSvc.getPaints();

  // ADD PAINT
  $ionicModal.fromTemplateUrl('js/modules/inventory/templates/add-paint-modal-template.html', function($ionicModal) {
    paints.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  paints.openAddPaintModal = function () {
    paints.modal.show();
  };

  paints.closeAddPaintModal = function () {
    paints.modal.hide();
  };

  paints.addPaint = function (paint) {
    somePaints.forEach(function(item) {
      PaintsSvc.addPaint(item);
    });
  };

}]);
