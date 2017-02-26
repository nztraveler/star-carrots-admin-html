/**
 * Created by CT on 2017/2/23.
 */
angular.module('admin')
    // article列表数据，简单写法
    .constant('articleType',{
        null: '全部',
        0: '首页banner',
        1:'找职位banner',
        2:'找精英banner',
        3:'行业大图'
    })
    // article列表数据，高级写法
.constant('articleConstant',{
    'type':[
        {type:null, name: '全部'},//参数为空时显示全部
        {type:0, name: '首页banner'},
        {type:1, name: '找职位banner'},
        {type:2, name: '找精英banner'},
        {type:3, name: '行业大图'},
        ],
    'industry': [
        {type: null, name: '不限'},
        {type: 0, name: "移动互联网"},
        {type: 1, "name": "电子商务"},
        {type: 2, "name": "企业服务"},
        {type: 3, "name": "O2O"},
        {type: 4, "name": "教育"},
        {type: 5, "name": "金融"},
        {type: 6, "name": "游戏"}
    ],
    'status': [
        {type: null, name: '全部'},
        {type: 0, name: '草稿'},
        {type: 1, name: '上线'},
        {type: 2, name: '下线'}
    ]
})