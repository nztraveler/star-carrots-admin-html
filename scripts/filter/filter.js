/**
 * Created by CT on 2017/2/23.
 */
angular.module('admin')
// article列表数据过滤，简单写法
.filter('articleFilter',function (articleType) {
    return function (title) {
        if(title !== "" && title !== undefined){
            return articleType[title]
        }
    }
})
// article列表数据过滤，高级写法
    .filter('Article', function (articleConstant) {
        var result = '';
        return function (obj, type) {//obj是后台返回的数据，对应前台的"x in vm.list"，是一个对象。type对应{{x|Article:'type'}}中的type
            angular.forEach(articleConstant[type], function (data) { //遍历，第一个参数articleConstant[type]是要遍历的数组，
                // function是遍历的方法，data是每个数组的值（也是一个对象，比如{type:null, name: '全部'}），data.type就对应数组的对象的每一个type。
               // obj[type]对应返回的"x in vm.list"[type]。
                if (obj[type] === data.type) {
                    return result = data.name
                }
            });
            return result
        }
    })