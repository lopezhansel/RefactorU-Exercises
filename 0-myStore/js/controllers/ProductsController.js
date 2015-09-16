app.controller('ProductsController', ['$scope','$routeParams','$localStorage','productService', function($scope,$routeParams,$localStorage,productService){
	$scope.products = productService.products
	$scope.movies = productService.movies

	$scope.currentProduct = $routeParams.id
	$scope.$storage = $localStorage.$default({reviews : [] })
	$scope.selectedProduct = $localStorage.reviews[$routeParams.id] 


	$scope.createReviewArrays = function(){
		if ($localStorage.reviews.length < $scope.products.length  ){
			for(var i = 0; i< $scope.products.length; i++){
				$localStorage.reviews.push([])
			}
		}
	}
	$scope.createReviewArrays()


	$scope.deleteReview = function(index){
		$localStorage.reviews[$routeParams.id].splice(index,1)
	}
	
	$scope.submitReview = function (event,currentProduct) {
		event.preventDefault() //cancel default submit action 
		$localStorage.reviews[currentProduct].push($scope.review)	
		$scope.review = {} // resets review 
	}
	
	
	$scope.reset = function(){
		$localStorage.$reset();
		location.reload();
	};


}])
