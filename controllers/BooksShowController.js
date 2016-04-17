angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

BooksShowController.$inject=['$http', '$routeParams', '$location'];
function BooksShowController($http, $routeParams, $location) {
  var vm = this;

  $http({
    method: 'GET',
    url: 'https://super-crud.herokuapp.com/books/'+$routeParams.id
  }).then(function successCallback(json) {
    vm.books = json.data;
    // console.log(json);
  });

  vm.deleteBook = function (books) {
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/books/'+ books._id
    }).then(function successCallback(book) {
      console.log("book delete successful");

      $location.path('/');
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  };

  vm.editBook = function (books) {
    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/books/'+books._id,
      data: books
    }).then(function successCallback(json) {
      console.log("update success");
      $location.path('/');
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  };

}
