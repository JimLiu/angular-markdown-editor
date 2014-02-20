var app = angular.module('demoApp', ['ui.markdown']);


app.controller('SimpleEditorCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.markdownData = "# Loading...";
    $http.get('demo.md').success(function(data) {
      $scope.markdownData = data;
    }).error(function(err) {
      $scope.markdownData = "# Error occured";
    });
    $scope.editorOptions = {
      
    };
  }
]);