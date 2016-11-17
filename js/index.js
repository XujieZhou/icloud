var app= angular.module('list',[]);

app.directive('mySel',[function(){
	return{
		restrict:'A',
		replace:true,
		transclude:true,
		template:'<div class="sel"><div ng-transclude></div></div>',
		link:function($scope,el){
			$(".xuan").on('click',function(){
				$('.sel').toggleClass("active");
				return false;
			});
			$(".sel").on('click',false);
			$(document).on('click',function(){
				$('.sel').removeClass("active");
			});
			$("#cancel").on('click',function(){
				$('.sel').removeClass('active');
			});
			$("#enter").on('click',function(){
				$('.sel').removeClass('active');
			});
		}
	}
}])

app.directive('myUl',[function(){
	return{
		restrict:'A',
		replace:true,
		transclude:true,
		template:'<ul class="planlist"><div ng-transclude></div></ul>',
		link:function($scope,el){
			$(document).on('keyup',"input",false);
			$(el).on("keyup",false);
			$(el).on('click','li',function(){
				$(el).find('li').removeClass('planac');
				$(this).addClass('planac');
				var self=this;
				$scope.$apply(function(){
				  $scope.cu=$(self).index();
				  $scope.save();
				})
				
			});
			$(document).on('keyup',function(e){
				if(e.keyCode === 8){
					var index=$('.planac').index();
					if(index===-1){
						return;
					}
					$scope.$apply(function(){
						$scope.lists.splice(index,1);
						$scope.save();
					});
				}
			});
			
		}
	}
}])

app.controller('listCtrl', ['$scope', function($scope){
	
	$scope.colors=['purple','green','blue','yellow','brown','pink','orange'];
	
	$scope.cu=0;
	
	if(localStorage.reminder){
		$scope.lists=JSON.parse(localStorage.reminder);
	}else{
		$scope.lists=[
//			id:maxId()+1,
//			name:'新建 '+(len+1),
//			theme: $scope.colors[index],
//			todo:[
//				{
//					name:我,
//					
//				}
//			]
		];
	};
	
	$scope.save=function(){
		localStorage.reminder=JSON.stringify($scope.lists);
	}
	
	function maxId(){
		var max=-Infinity;
		for (var i=0;i<$scope.lists.length;i++) {
			var v=$scope.lists[i];
			if(v.id>max){
				max=v.id;
			}
		}
		return (max===-Infinity)?1000:max;
	}
	
	$scope.addList=function(){
		var len=$scope.lists.length;
		var index=len%7;
		var v={
			id:maxId()+1,
			name:'新建 '+(len+1),
			theme: $scope.colors[index],
		}
		$scope.lists.push(v);
	}
	
	
	
	
	

	
	$(".ming").on('click',function(){
		$('.mingxk').toggleClass('active');
	});
	$(".icon").on('click',function(){
		$('.icon').toggleClass('iconmove');
	});
	
	
}]);