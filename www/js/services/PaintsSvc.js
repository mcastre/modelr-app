angular.module('modelrApp')
.factory('PaintsSvc', ['$firebaseArray', '$state', function PaintsSvc($firebaseArray, $state) {

  var paintsCollectionRef = firebase.database().ref().child('paintsCollection');
  var paints = $firebaseArray(paintsCollectionRef);

  var paintManufacturers = [
    {
      'name': '502 Abteilung Oils',
      'paints': [
        {
          'type': 'TS',
          'title': 'Red Brown',
          'hexKey': '85001',
          'swatch': '#725746',
          'manufacturer': '502 Abteilung Oils',
          'inStock': false
        },
        {
          'type': 'TS',
          'title': 'Dark Green',
          'hexKey': '85001',
          'swatch': '#334B3C',
          'manufacturer': '502 Abteilung Oils',
          'inStock': false
        },
        {
          'type': 'TS',
          'title': 'Dark Yellow',
          'hexKey': '85003',
          'swatch': '#B1A14F',
          'manufacturer': '502 Abteilung Oils',
          'inStock': false
        },
      ]
    },
    {
      'name': 'Citadel',
      'paints': [
        {
          'type': 'TS',
          'title': 'Red Brown',
          'hexKey': '85001',
          'swatch': '#725746',
          'manufacturer': 'Citadel',
          'inStock': false
        },
        {
          'type': 'TS',
          'title': 'Dark Green',
          'hexKey': '85001',
          'swatch': '#334B3C',
          'manufacturer': 'Citadel',
          'inStock': false
        }
      ]
    },
    {
      'name': 'Humbrol',
      'paints': [
        {
          'type': 'TS',
          'title': 'Red Brown',
          'hexKey': '85001',
          'swatch': '#725746',
          'manufacturer': 'Humbrol',
          'inStock': false
        },
        {
          'type': 'TS',
          'title': 'Dark Green',
          'hexKey': '85001',
          'swatch': '#334B3C',
          'manufacturer': 'Humbrol',
          'inStock': false
        }
      ]
    }
  ];

  function getPaints () {
    return paints;
  }

  function getPaintManufacturers () {
    return paintManufacturers;
  }

  function getPaintsCount () {
    return paints.length;
  }

  function addPaint (paint) {
    paints.$add(paint).then(function(ref) {
      console.log("Paint added: ", paint);
    });
  }

  return {
    getPaints: getPaints,
    getPaintsCount: getPaintsCount,
    getPaintManufacturers: getPaintManufacturers,
    addPaint: addPaint
  }
}]);
