'use strict';
angular.module('app.widget', [])       
.directive('passwordStrength', function() {
    return {
        templateUrl: 'template/password-strength-widget.html',                
        restrict: 'E',               
        scope: {},
        controller: function ($scope) {

            //declare password scope
            $scope.password = {
                status: 'Invalid',
                value: '',
                meterWidth: 0,
                type: 'password',
                rules:{
                    isValidLength: false,
                    hasNumber: false,
                    hasLetter: false,
                    noSpecialChar: false                            
                }
            };

            //set to default values
            this.setDefault = function(password){
                password.rules.hasNumber = false; 
                password.rules.hasLetter = false; 
                password.rules.isValidLength = false;
                password.rules.noSpecialChar = true;
                $scope.password.meterWidth = 25;
            };  


            this.getMeterWidth = function(password){
                var property_count = 0, valid_property_count = 0, property;
                for (property in password.rules) {
                    if (password.rules.hasOwnProperty(property)) {
                        property_count = property_count + 1;
                        if(password.rules[property]){
                            valid_property_count = valid_property_count + 1;
                        } 
                    }
                }                        
                return (valid_property_count/property_count)*100; //calculate percentage of passed criteria    
            };


            this.getStatus = function(password){
                if(100 === password.meterWidth){
                    return 'Valid';
                }
                return 'Invalid';
            };
        },
        link: function ($scope, $element, $attrs, $ctrl) {
            $ctrl.setDefault($scope.password); 
            //listen to password change
            $scope.onPasswordChange = function(password){ 
                $ctrl.setDefault(password);
                if(password.value){                       
                    password.rules.hasNumber = 
                            password.value.match(/\d/) ? true:false; 
                    password.rules.hasLetter = 
                            password.value.match(/[A-z]/) ? true:false; 
                    password.rules.isValidLength = 
                            password.value.match(/^.{6,}$/) ? true:false;
                    password.rules.noSpecialChar = 
                            !password.value.match(/[ /"]/) ? true:false;                            
                } 
                password.meterWidth = $ctrl.getMeterWidth(password);
                password.status = $ctrl.getStatus(password);
            };                    
        }
    };
});
