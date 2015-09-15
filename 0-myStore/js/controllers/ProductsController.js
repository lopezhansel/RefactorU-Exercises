app.controller('ProductsController', ['$scope','$routeParams','$localStorage','productService', function($scope,$routeParams,$localStorage,productService){
	$scope.products = productService.products

	$scope.currentProduct = $routeParams.id
	$scope.$storage = $localStorage.$default({reviews : [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]] })
	$scope.selectedProduct = $localStorage.reviews[$routeParams.id] /// confusing



	$scope.deleteReview = function(index){
		$localStorage.reviews[$routeParams.id].splice(index,1)
	}
	
	$scope.sub = function (event,currentProduct) {
		event.preventDefault() //cancel default submit action 
		$localStorage.reviews[currentProduct].push($scope.review)	
		$scope.review = {} // resets review 
	}
	
	
	$scope.reset = function(){
		$localStorage.$reset();
		location.reload();
	};


}])

var arr = ["orange","red","black","white"];
var index = arr.indexOf("red");
if (index >= 0) {
  arr.splice( index, 1 );
}
