angular.module('app').controller('Post', function ($scope, $http, $location) {
    
    var id = $location.search().id;
    
    if (isEditMode()){
        getPost();
        $scope.save = updatePost;
    }else{
        $scope.save = createPost;
    }
    
    

    $scope.time = new Date();

    $scope.minDate = new Date();

    $scope.opened = false;

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = !$scope.opened;
    }
    
    function getPost(){
        $http.get('/api/post/' + id)
        .then(function (post) {
            $scope.message = post.data.message;
            $scope.date = post.data.datetime;
            
            var time = new Date(post.data.datetime);
            $scope.time = time;
            
        });
    }
    
    function createPost() {
        
        var datetime = new Date(
            $scope.date.getFullYear(),
            $scope.date.getMonth(),
            $scope.date.getDate(),
            $scope.time.getHours(),
            $scope.time.getMinutes()
            );
        console.log(datetime);
        $http.post('/api/post/tweet', {
            message: $scope.message,
            datetime: datetime
        }).then(function () {

        });
    }
    
    function updatePost() {
        
        
    }
});