'use strict';

angular.module('noterious')
  .controller('LoginCtrl', function (UserModel, $state) {
    var login = this;

    login.loading = false;

    login.user = {
      email: '',
      password: '',
      register: false
    };

    function register() {
      UserModel.register({
          email: login.user.email,
          password: login.user.password
      })
      .then(function edit (authData){
        console.log('User ' + authData.uid + ' created successfully!');
        onLogin();
      })
      .catch(onError)
      .then(onCompletion);
    }

    function onLogin() {
      UserModel.login({
          email: login.user.email,
          password: login.user.password
      })
      .then(onSuccess)
      .catch(onError)
      .then(onCompletion);
    }

    function onSuccess(result) {
      console.log('in success', result);
      $state.go('boards');
    }

    function onError(reason) {
      console.log('in error', reason);
      login.error = reason.message;
    }

    function onCompletion() {
      console.log('in completion');
      login.reset();
    }

    login.submit = function (user, isValid, isRegistering) {
      if (isValid) {
        login.loading = true;

        if (isRegistering) {
          register();
        } else {
          onLogin();
        }
      }
    };

    login.reset = function () {
      login.loading = false;
      login.user = {
        email: '',
        password: '',
        register: false
      };
    };
  });
