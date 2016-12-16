angular.module('modelrApp')
.controller('InventoryPaintsCtrl', ['$scope', '$state', 'PaintsSvc', '$ionicModal', '$ionicPopup', function InventoryPaintsCtrl($scope, $state, PaintsSvc, $ionicModal, $ionicPopup) {

  var paints = this;
  var paintManufacturers = [
    {
      "name": "502 Abteilung Oils",
      "paints": [
        {
          "type": "Oil",
          "title": "Snow White",
          "hexKey": "ABT001",
          "swatch": "#ffffff",
          "manufacturer": "502 Abteilung Oils",
          "inStock": false
        },
        {
          "type": "Oil",
          "title": "Sepia",
          "hexKey": "ABT002",
          "swatch": "#483B2B",
          "manufacturer": "502 Abteilung Oils",
          "inStock": false
        },
        {
          "type": "Oil",
          "title": "Dust",
          "hexKey": "ABT002",
          "swatch": "#FEF9E6",
          "manufacturer": "502 Abteilung Oils",
          "inStock": false
        },
      ]
    },
    {
      "name": "Citadel",
      "paints": [
        {
          "type": "TS",
          "title": "Red Brown",
          "hexKey": "85001",
          "swatch": "#725746",
          "manufacturer": "Citadel",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "Dark Green",
          "hexKey": "85001",
          "swatch": "#334B3C",
          "manufacturer": "Citadel",
          "inStock": false
        }
      ]
    },
    {
      "name": "Humbrol",
      "paints": [
        {
          "type": "TS",
          "title": "Red Brown",
          "hexKey": "85001",
          "swatch": "#725746",
          "manufacturer": "Humbrol",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "Dark Green",
          "hexKey": "85001",
          "swatch": "#334B3C",
          "manufacturer": "Humbrol",
          "inStock": false
        }
      ]
    },
    {
      "name": "Tamiya Paints",
      "paints": [
        {
          "type": "TS",
          "title": "Red Brown",
          "hexKey": "85001",
          "swatch": "#725746",
          "manufacturer": "Tamiya Paints",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "Dark Green",
          "hexKey": "85001",
          "swatch": "#334B3C",
          "manufacturer": "Tamiya Paints",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "Dark Yellow",
          "hexKey": "85003",
          "swatch": "#B1A14F",
          "manufacturer": "Tamiya Paints",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "German Gray",
          "hexKey": "85004",
          "swatch": "#374548",
          "manufacturer": "Tamiya Paints",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "Olive Drab",
          "hexKey": "85005",
          "swatch": "#48573D",
          "manufacturer": "Tamiya Paints",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "Matt Black",
          "hexKey": "85006",
          "swatch": "#181717",
          "manufacturer": "Tamiya Paints",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "Racing White",
          "hexKey": "85007",
          "swatch": "#FFFFFF",
          "manufacturer": "Tamiya Paints",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "Italian Red",
          "hexKey": "85008",
          "swatch": "#D92328",
          "manufacturer": "Tamiya Paints",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "British Green",
          "hexKey": "85009",
          "swatch": "#16553B",
          "manufacturer": "Tamiya Paints",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "French Blue",
          "hexKey": "85010",
          "swatch": "#1883BD",
          "manufacturer": "Tamiya Paints",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "Maroon",
          "hexKey": "85011",
          "swatch": "#47313E",
          "manufacturer": "Tamiya Paints",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "Orange",
          "hexKey": "85012",
          "swatch": "#E57C2A",
          "manufacturer": "Tamiya Paints",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "Clear",
          "hexKey": "85013",
          "swatch": "#FFFFFF",
          "manufacturer": "Vallejo",
          "inStock": false
        },
        {
          "type": "TS",
          "title": "Black",
          "hexKey": "85014",
          "swatch": "#000000",
          "manufacturer": "Testors",
          "inStock": false
        }
      ]
    }
  ]
;

  paints.allPaints = PaintsSvc.getPaints();
  paints.manufacturers = PaintsSvc.getPaintManufacturers();

  // SEARCH PAINTS
  paints.search = {
    query: ''
  };

  paints.sanitizeInput = function(str) {
    var newStr = str.replace(/\r?\n|\r/g, " ");
    return newStr.trim();
  }

  paints.filterManufacturers = '';

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
    paintManufacturers.forEach(function(item) {
      PaintsSvc.addPaint(item);
    });
  };

  paints.showConfirm = function(paint, id) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Remove "' + paint.title + '" Paint',
     template: 'This paint will be removed from your Inventory, but not for your model. Are you sure you wish to remove?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       PaintsSvc.removeInventoryPaint(id);
     } else {
       console.log('You are not sure');
     }
   });
 };

}]);
