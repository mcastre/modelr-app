angular.module('modelrApp')
.directive('openLinkInAppBrowser', function ($cordovaInAppBrowser) {
  return {
    restrict: 'E',
    templateUrl: 'templates/open-link-in-app-browser-template.html',
    scope: {
      url: '@',
      target: '@',
      linkLabel: '@'
    },
    link: function(scope) {
      scope.openLink = function(url, target) {
        return $cordovaInAppBrowser.open(url, target);
      };
    }
  };
});
