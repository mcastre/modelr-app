angular.module('modelrApp', ['ionic', 'firebase', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      //cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('welcome', { // Welcome screen for new users
    url: '/welcome',
    templateUrl: 'templates/welcome.html',
    controller: 'WelcomeCtrl',
    controllerAs: 'welcome'
  })
  .state('tabs', {
    url: '/tabs',
    templateUrl: 'templates/tabs.html',
    abstract: true,
    controller: 'TabsCtrl',
    controllerAs: 'tabs'
  })
  // Tab Views
  .state('tabs.models', {
    url: '/models',
    views: {
      'models-tab': {
        templateUrl: 'templates/models-home.html',
        controller: 'ModelsListCtrl',
        controllerAs: 'models'
      }
    }
  })
  .state('tabs.inventory', {
    url: '/inventory',
    views: {
      'inventory-tab': {
        templateUrl: 'templates/inventory-home.html',
        controller: 'InventoryCtrl',
        controllerAs: 'inventory',
      }
    }
  })
  .state('tabs.resources', {
    url: '/resources',
    views: {
      'resources-tab': {
        templateUrl: 'templates/resources-home.html',
        controller: 'ResourcesCtrl',
        controllerAs: 'resources',
      }
    }
  });

  $urlRouterProvider.otherwise('/login');

});
