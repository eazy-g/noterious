'use strict';

angular.module('noterious.common')
  .service('UserModel', function (Auth) {
    var service = this,
      currentUser = null;

    service.getCurrentUser = function () {
      return currentUser;
    };

    service.setCurrentUser = function (user) {
      currentUser = user;
    };

    service.login = function (user) {
      return Auth.auth().signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(function loginSuccess(authData) {
        currentUser = authData.uid;
        console.log('Logged in as:', authData.uid);
      }).catch(function (error) {
        currentUser = null;
        console.error('Authentication failed:', error);
      });
    };

    service.register = function (user) {
      return Auth.auth().createUserWithEmailAndPassword(
        user.email,
        user.password
      );
    };

    service.logout = function () {
      console.log('LOGOUT FIRED!');
      Auth.$unauth();
      currentUser = null;
    };
  });
