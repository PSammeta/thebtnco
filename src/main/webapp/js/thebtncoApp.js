var homeApp = angular.module('homePage', []);
homeApp.controller('HomePageController', function ($scope, $http) {
    $scope.welcomeHeader = "Welcome to the BTN homepage!";
});

var aboutApp = angular.module('aboutThisApp', []);
aboutApp.controller('AboutThisAppController', function ($scope, $http) {
    $scope.welcomeHeader = "Website Info";
});

var plexApp = angular.module('plexFormSubmit', []);
plexApp.controller('PlexFormController', function ($scope, $http) {

    $scope.newField = {};
    $scope.editing = false;

    $scope.lowerHeaderText = 'Requested so far.';
    $scope.getReqMovies = function () {

        $http.get('api/view/allMovies').then(successCallback, errorCallback);

        function successCallback(response) {
            //success code
            $scope.movieList = response.data;
        }

        function errorCallback(error) {
            //error code
        }
    };

    $scope.headerText = "What movies would you like to see added on the Plex?";
    $scope.submit = function () {
        // Save new movie into database
        var movie = {
            "name": $scope.name,
            "language": $scope.language,
            "requestedBy": $scope.requestedBy,
            "movieState": $scope.movieState
        };
        $http.post('plex', movie).then(successCallback, errorCallback);

        function successCallback(response) {
            //success code
            console.log(response);
            location.reload();
        }

        function errorCallback(error) {
            //error code
            console.log(error);
        }

        //Empty list data after process
        //noinspection JSUnresolvedFunction
        document.getElementById("requestForm").reset();
    };
    $scope.resetForm = function () {
        //noinspection JSUnresolvedFunction
        document.getElementById("requestForm").reset();
    };
    $scope.editMovie = function (movie) {
        $scope.editing = $scope.movieList.indexOf(movie);
        $scope.newField = angular.copy(movie);
        var movie = {
            "name": $scope.name,
            "language": $scope.language,
            "requestedBy": $scope.requestedBy,
            "movieState": $scope.movieState
        };

    };
    $scope.saveField = function () {
        $scope.newField.id = $scope.editing;
        var formData = {
            "id": $scope.newField.id + 1,
            "name": $scope.newField.name,
            "language": $scope.newField.language,
            "requestedBy": $scope.newField.requestedBy,
            "movieState": $scope.newField.movieState
        };
        $http.post('api/edit/movie', formData).then(successCallback, errorCallback);

        function successCallback(response) {
            //success code
            console.log(response);
            location.reload();
        }

        function errorCallback(error) {
            //error code
            console.log(error);
        }

        //Empty list data after process
        //noinspection JSUnresolvedFunction
        document.getElementById("moviesInDb").reset();
        // document.getElementById("requestForm").reset();
        $scope.editing = false;
    };
    $scope.cancel = function () {
        if ($scope.editing !== false) {
            // $scope.movieList[$scope.editing] = $scope.newField;
            $scope.editing = false;
        }
    };
});