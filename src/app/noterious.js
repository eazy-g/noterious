'use strict';

angular.module('noterious', [
  'ui.router',
  'ngAnimate',
  // 'firebase',
  'noterious.common'
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/login/login.tmpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('boards', {
        url:'/boards',
        templateUrl: 'app/boards/boards.tmpl.html',
         resolve: {
           'currentUser': ['Auth', function (Auth) {
            return firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                return user;
              } else {
                return null;
              }
            });
           }]
         },
        controller: 'boardsCtrl',
        controllerAs: 'boards'
      })
    ;


  })
  .run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    });
  })
;
