/**
 * Created by CT on 2017/3/9.
 */
angular.module('admin').controller('panel',['$state', function($state){
    var vm = this ;
    vm.clearParams = function () {
        console.log(123)
        $state.go('field.positionList',{},{reload: true} );
    }
}
])