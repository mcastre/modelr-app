angular.module('modelrApp')
.factory('PaintsSvc', ['$firebaseArray', '$state', '$firebaseObject', function PaintsSvc($firebaseArray, $state, $firebaseObject) {

  var paintsCollectionRef = firebase.database().ref().child('paintsCollection');
  var paints = $firebaseArray(paintsCollectionRef);

  // MODEL SPECIFIC PAINTS
  var modelPaintsRef = firebase.database().ref('users/models/paints/');
  var modelPaints = $firebaseArray(modelPaintsRef);

  var paintManufacturers = [
    {
      'name': '502 Abteilung Oils',
      'paints': []
    },
    {
      'name': 'AK Interactive',
      'paints': []
    },
    {
      'name': 'Alclad II',
      'paints': []
    },
    {
      'name': 'Citadel',
      'paints': []
    },
    {
      'name': 'Gravity Colors',
      'paints': []
    },
    {
      'name': 'Humbrol',
      'paints': []
    },
    {
      'name': 'Italeri Acrylics',
      'paints': []
    },
    {
      'name': 'MIG Productions',
      'paints': []
    },
    {
      'name': 'Model Master',
      'paints': []
    },
    {
      'name': 'Mr. Color',
      'paints': []
    },
    {
      'name': 'Revell Color',
      'paints': []
    },
    {
      'name': 'Tamiya Paints',
      'paints': []
    },
    {
      'name': 'Testors',
      'paints': []
    },
    {
      'name': 'Vallejo',
      'paints': []
    },
    {
      'name': 'Windsor & Newton',
      'paints': []
    }
  ];

  function getPaints () {
    return paints;
  }

  function getModelPaints () {
    return modelPaints;
  }

  function getPaintManufacturers () {
    return paintManufacturers;
  }

  function getPaintsCount () {
    return paints.length;
  }

  function sanitizeInput(str) {
    var newStr = str.replace(/\r?\n|\r/g, " ");
    return newStr.trim();
  }

  function addPaintToInventory(paint, userID, pathId) {
    var root = firebase.database().ref();
    var id = root.child('paintsCollection').push();

    id.set(angular.copy(paint), function (error) {
      if (!error) {
        var name = id.key;
        root.child('users/' + userID + '/paints/' + name).set(true);
        console.log('Added paint to inventory ---- ', paint);
        id.once('value', function (snap) {
          var data = snap.exportVal();
        });
      }
    });
  }

  function removeInventoryPaint(id) {
    var paintsRef = firebase.database().ref().child('paintsCollection/' + id);
    var obj = $firebaseObject(paintsRef);
    obj.$remove().then(function(ref) {
      console.log('Removed paint from inventory', id);
    });
  }

  return {
    getPaints: getPaints,
    getModelPaints: getModelPaints,
    getPaintsCount: getPaintsCount,
    getPaintManufacturers: getPaintManufacturers,
    addPaintToInventory: addPaintToInventory,
    removeInventoryPaint: removeInventoryPaint
  }
}]);
