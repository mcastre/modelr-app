angular.module('modelrApp', ['ionic', 'firebase', 'ngCordova', 'ionic.wizard', 'ionic-color-picker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(false);
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
  .state('models', {
    url: '/models',
    parent: 'tabs',
    views: {
      'mainTabs': {
        templateUrl: modulesPath + 'models/views/models-home.html',
        controller: 'ModelsListCtrl',
        controllerAs: 'models'
      }
    }
  })
  .state('inventory', {
    url: '/inventory',
    parent: 'tabs',
    views: {
      'mainTabs': {
        templateUrl: modulesPath + 'inventory/views/inventory-home.html',
        controller: 'InventoryCtrl',
        controllerAs: 'inventory',
      }
    }
  })
  .state('inventory.paints', {
    url: '/paints',
    views: {
      'mainTabs@tabs': {
        controller: 'InventoryPaintsCtrl',
        controllerAs: 'paints',
        templateUrl: modulesPath + 'inventory/views/inventory-paints.html'
      }
    }
  })
  .state('inventory.paints.view', {
    url: '/paints/:id',
    views: {
      'mainTabs@tabs': {
        controller: 'ViewPaintsCtrl',
        controllerAs: 'viewPaints',
        templateUrl: modulesPath + 'inventory/views/view-paints-by-manufacturer.html'
      }
    }
  })
  .state('inventory.supplies', {
    url: '/supplies',
    views: {
      'mainTabs@tabs': {
        templateUrl: modulesPath + 'inventory/views/inventory-supplies.html',
        controller: 'InventorySuppliesCtrl',
        controllerAs: 'supplies',
      }
    }
  })
  .state('resources', {
    url: '/resources',
    parent: 'tabs',
    views: {
      'mainTabs': {
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
