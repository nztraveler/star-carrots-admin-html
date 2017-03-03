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
    //Article状态操作按钮名字
    .filter('articleStatusChangeFilter', function () {
        return function (status) {
            switch (status) {
                case 0 :
                    return "上线 ";
                break;
                case 1:
                    return "上线 ";
                    break;
                case 2:
                    return "下线";
                    break;
            }
        }
    })
    // conpany列表数据过滤，高级写法
    .filter('Company', function (companyListConstant) {
        var result = '';
        return function (obj, type) {//obj是后台返回的数据，对应前台的"x in vm.list"，是一个对象。type对应{{x|Article:'type'}}中的type
            angular.forEach(companyListConstant[type], function (data) { //遍历，第一个参数articleConstant[type]是要遍历的数组，
                // function是遍历的方法，data是每个数组的值（也是一个对象，比如{type:null, name: '全部'}），data.type就对应数组的对象的每一个type。
                // obj[type]对应返回的"x in vm.list"[type]。
                if (obj === data.type) {
                    return result = data.name
                }
            });
            return result
        }
    })

    // 公司冻结状态
    .filter('changeFreezedStatusFilter', function () {
        return function (param) {
            if (param === 0) {
                return "冻结";
            } else if (param === 1) {
                return "解冻";
            }
            else {
                return "?";
            }
        }
    })

    // 操作公司认证状态
    .filter('changeApprovedStatusFilter', function () {
        return function (param) {
            if (param === 0) {
                return "认证";
            } else if (param === 1) {
                return "解除";
            }
            else {
                return "?";
            }
        }
    })