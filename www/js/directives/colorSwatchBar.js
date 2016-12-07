angular.module('modelrApp')
.directive('colorSwatchBar', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/color-swatch-bar-template.html',
    scope: {
      paints: '='
    },
    link: function(scope, element, attr) {
      scope.getPriorityWidth = function(priority) {
        switch (priority) {
          case 'Primary Color' :
            return '50%';
            break;
          case 'Secondary Color' :
            return '25%';
            break;
          case 'Accents' :
            return '4%';
            break;
          default :
            return '7%';
        }
      };

    }
  };
});
