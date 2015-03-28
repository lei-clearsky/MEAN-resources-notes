## Angular.js Application Framework
- Scope $scope - javascript object. $scope name matters

```
var app =  angular.module('whateverNameWeWant, []');
app.controller('SomeControllerName', ['$http','$scope', function(someHTTPName, someOtherNameForScope){
  someOtherNameForScope.someVar = 'wow';  
}]);
```
- Angular Controller
- $scope.$digest() - angular, recalculate my template!
```javascript
var app = angular.module('whateverNameWeWant, []');
app.controller('SomeControllerName', function($scope, $timeout){
  $scope.someVar = 'wow'; 
  setTimeout(function() {
    $scope.someVar = 'MOM';
    //$scope.digest();  
  }, 1000); 
}]);
```
- $child scope inherit $parent scope vars
- ng-app, ng-controller, ng-repeat, ng-click, ng-show, ng-class...
- directives
- app.factory, app.value [Angular.js providers explained](https://gist.github.com/demisx/9605099)
```javascript
app.value('whateverName', function() {
  $http???  
});

app.factory('whateverName', function($http) {
  return function() {
    $http.get('www.google.com/lei').then(function (response) {
      console.log(response);
    });  
  };  
});
```
- reasons for factories
- dependency injection
```javascript
app.controller('HotelController', function($scope, HotelModel){
  HotelModel(function (data) {
    $scope.hotels = data;  
  });
});

app.factory('HotelModel', function ($http) {
  return function (dataCallback) {
    $http.get('/api.hotels').then(function(res) {// $http.get...is a promise
      dataCallback(res.data);  
    });  
  };  
});

app.controller('HotelController', function($scope, HotelModel){
  HotelModel.get().then(function (data) {
    $scope.hotels = data;  
  });
});

app.factory('HotelModel', function ($http) {
  return {
    get: function (dataCallback) {
         $http.get('/api.hotels')
         .then(function(res) {
            dataCallback(res.data);  
         });
   }  
  };  
});

```
