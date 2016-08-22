angular.module('modelrApp')
.controller('ModelsListCtrl', ['$state', 'AuthSvc', '$ionicLoading', function ModelsListCtrl ($state, AuthSvc, $ionicLoading) {
  var models = this;

  models.loadingProperties = {
    template: 'Logging In...',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  };

  $ionicLoading.show(models.loadingProperties); // Loading

  models.list = [
    {
      projectName: 'UH-1D Huey Gunship',
      manufacturer: 'Revell',
      class: 'Helicopter',
      startDate: new Date(),
      status: 'Complete',
      builder: 'Martín Castre',
      image: './img/huey.jpg'
    },
    {
      projectName: 'E/A-18 G Growler',
      manufacturer: 'Italeri',
      class: 'Fighter Jet',
      startDate: new Date(),
      status: 'Not Started',
      builder: 'Martín Castre',
      image: './img/growler.jpg',
      paints: [
        'Gloss White',
        'Flat Gunmetal',
        'Flat Gull Gray',
        'Flat Olive Drab US Army',
        'Flat Black',
        'Flat Dark Tan',
        'Gloss Red',
        'Gloss Green',
        'Gloss Silver',
        'Gloss Orange',
        'Metalizer Exhaust',
        'Flat Light Ghost Gray'
      ],
      description: 'The Boeing E/A-18 G Growler was designed to satisfy a specific U.S. Navy need: have a specialized, carrier-based electronic warfare aircraft to replace the not more updated Grumman EA-6B Prowler. The Growler is directly derived from the tandem-seat fighter F/A-18 F Super Hornet, which keeps all main aerodynamic characteristics. Thanks to the General Electric engines the Growler is able to reach a maximum speed of mach 1.8, and its flight performance is similar to that of the main carrier-based aircrafts. The crew consists of the pilot, and in tandem, the WSO (Weapon System Officer). Instead of 20 mm cannon of the F/A-18, the Growler has mounted dedicated electronic warfare equipment. Furthermore, in its hard points, the Growler is able to carry additional high and low band jamming pods, additional fuel tanks and AIM-120 AMRAAM missles.'
     }
  ];

  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      var token = result.credential.accessToken;
    }
    var user = result.user;
  }).catch(function(error) {
    console.log(error);
  });

  models.user = AuthSvc.$getAuth();

  AuthSvc.$onAuthStateChanged(function(authData) {
    if (authData) {
      $ionicLoading.hide();
      console.log('Logged in', authData);
    } else {
      $ionicLoading.hide();
      console.log('Logged out');
      $state.go('login');
    }
  });

  models.viewProject = function (model) {
    //$state.go('model');
  };

  models.logout = function () {
    AuthSvc.$signOut();
    console.log('Signed Out...');
    $state.go('login');
  };

}]);
