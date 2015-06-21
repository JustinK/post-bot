angular.module('app').controller('Post', function ($scope, $http, $location, toastr) {
    
    var id = $location.search().id;
   
    $scope.time = new Date();

    $scope.minDate = new Date();

    $scope.opened = false;

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = !$scope.opened;
    }
    $scope.delete = deletePost;
    function getPost(){
        $http.get('/api/post/' + id)
        .then(function (post) {
            $scope.message = post.data.message;
            $scope.date = post.data.datetime;
            
            var time = new Date(post.data.scheduledTime);
            $scope.time = time;
            
        });
    }
     
    if (isEditMode()){
        getPost();
        $scope.showDelete = isEditMode();
        $scope.save = updatePost;
    }else{
        $scope.save = createPost;
    }
    
    function createPost() {
        
        var datetime = getSelectedDatetime();
        console.log(datetime);
        $http.post('/api/post/tweet', {
            message: $scope.message,
            scheduledTime: datetime
        }).then(function () {
            toastr.success('Post created successfully')
        });
    }
    
    function getSelectedDatetime(){
        
        return new Date(
            $scope.date.getFullYear(),
            $scope.date.getMonth(),
            $scope.date.getDate(),
            $scope.time.getHours(),
            $scope.time.getMinutes()
            );
    }
    
    function updatePost() {
        
        var datetime = getSelectedDatetime();
        
        $http.post('/api/post/update/' + id, {
            message: $scope.message,
            scheduledTime: datetime
        }).then(function () {
            toastr.info('Post deleted');
        });
    }
    
    function deletePost(){
        $http.post('/api/post/destroy/' + id)
        .then(function () {
            toastr.success('Post updated');
        });
    }
    
    function isEditMode(){
        return id;
    }
    
    angular.module('app').directive('datepickerPopup', function(){
        return {
            restrict: 'EAC',
            require: 'ngModel',
            link: function (scope, element, attr, controller) {
                controller.$formatters.shift();
            }
        };
    });
    
});