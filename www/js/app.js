angular.module('modelrApp', ['ionic', 'firebase', 'ngCordova', 'ionic.wizard'])

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
  var modulesPath = 'js/modules/';

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: modulesPath + 'login/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('welcome', { // Welcome screen for new users
    url: '/welcome',
    templateUrl: modulesPath + 'welcome/views/welcome.html',
    controller: 'WelcomeCtrl',
    controllerAs: 'welcome'
  })
  .state('tabs', {
    url: '/tabs',
    templateUrl: modulesPath + 'tabs/views/tabs.html',
    abstract: true,
    controller: 'TabsCtrl',
    controllerAs: 'tabs'
  })
  // Tab Views
  .state('tabs.models', {
    url: '/models',
    views: {
      'models-tab': {
        templateUrl: modulesPath + 'models/views/models-home.html',
        controller: 'ModelsListCtrl',
        controllerAs: 'models'
      }
    }
  })
  .state('tabs.inventory', {
    url: '/inventory',
    views: {
      'inventory-tab': {
        templateUrl: modulesPath + 'inventory/views/inventory-home.html',
        controller: 'InventoryCtrl',
        controllerAs: 'inventory',
      }
    }
  })
  .state('tabs.resources', {
    url: '/resources',
    views: {
      'resources-tab': {
        templateUrl: modulesPath + 'resources/views/resources-home.html',
        controller: 'ResourcesCtrl',
        controllerAs: 'resources',
      }
    }
  })
  // Add New Model Wizard
  .state('wizard', {
    url: '/wizard',
    abstract: true,
    templateUrl: modulesPath + 'wizard/templates/wizard-home.html'
  })
  .state('wizard.new', { // Add New Model view
    url: '/new',
    templateUrl:  modulesPath + 'add-model/views/add-new-model.html',
    controller: 'AddNewModelCtrl',
    controllerAs: 'newModel'
  })
  .state('model', { // Model Detail view
    url: '/model/:id',
    templateUrl: modulesPath + 'model-detail/views/model-view.html',
    controller: 'ModelViewCtrl',
    controllerAs: 'model'
  });

  $urlRouterProvider.otherwise('/login');

});
