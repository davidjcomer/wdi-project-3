function masterController($scope, $auth, $state, $transitions) {
  $scope.isAuthenticated = function () {
    if ($auth.isAuthenticated()) {
      $scope.username = $auth.getPayload().username;
      $scope.userId = $auth.getPayload().sub;
    }
    return $auth.isAuthenticated();
  };
  $scope.handleLogout = function() {
    $auth.logout()
      .then(() => $state.go('home'));
  };

  $transitions.onSuccess({}, () => {
    $scope.isHomepage = $state.$current.name === 'home';
  });

}

export default masterController;
