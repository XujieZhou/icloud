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
			$(".ming").on('click',function(){
				$('.mingxk').toggleClass('active');
			});
			$(".wantitle").on('click',function(){
				$('.icon').toggleClass('iconmove');
				$(".quchu").toggleClass('active');
			});
			$(".wantitle").on("click", function(){
				$('.yinwan').toggleClass("active");
				$(this).toggleClass("active");
			})
			
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
			{
				id:1001,
				name:'默认',
				theme:'purple',
				todos:[
						{id: 1, title: "回家", state: 1},
						{id: 2, title: "旅游", state: 0}, 
						{id: 3,title: "爬山",state: 1}, 
						{id: 4, title: "看书", state: 0},
				]
			},		
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
			todos:[
					{id: 1, title: "回家", state: 1},
					{id: 2, title: "吃饭", state: 0}, 
					{id: 3,title: "爬山",state: 1}, 
					{id: 4, title: "看书", state: 0},
			]
		}
		$scope.lists.push(v);
	}


	//清除已完成事件
	$scope.clear=function(){								
		var newarr=[]
		$scope.lists[$scope.cu].todos.forEach(function(v,i){
			if(v.state==0){
				newarr.push(v)
			}
		})
		$scope.lists[$scope.cu].todos=newarr;
		$scope.save();
	}
	
	$scope.zhuanhua = function(index){
		var yw = $scope.lists[$scope.cu].todos[index];
		if(yw.state === 0){
			yw.state = 1;
		}else{
			yw.state = 0;
		}//转换 完成 未完成
	}
	$scope.newadd = function(){
		var todo = {title: '', state: 0};
		$scope.lists[$scope.cu].todos.push(todo);
	}
	$scope.zong=function(){
		var c = 0;
		$scope.lists[$scope.cu].todos.forEach(function(v, i){
			if(v.state == 1){
				c++;
			}
		});
		return c;
	}
	
	$scope.delet1=function(){
		var index=$('.planac').index();
		if(index===-1){
			return;
		}
			$scope.lists.splice(index,1);
			$scope.save();
	}
	$scope.del = function (id) {
        $scope.lists[$scope.cu].todos = $scope.lists[$scope.cu].todos.filter(function (v, i) {
            return v.id !== id
        })
        $scope.save();
    }
	
	
	
	
}]);