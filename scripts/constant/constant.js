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
    'type2':{
        '全部': null,
        '首页banner':0 ,
        '找职位banner':1,
        '找精英banner':2,
        '行业大图':3
    },
    'status2': {
        '全部': null,
        '上线':2 ,
        '下线':1,
    },
    'industry2': {
        '不限': null,
        '移动互联网':0 ,
        '电子商务':1,
        '企业服务':2,
        'O2O':3,
        '教育':4,
        '金融':5,
        '游戏':6
    },
    'type':[
        {type:'', name: '全部'},//参数为空时显示全部
        {type:0, name: '首页banner'},
        {type:1, name: '找职位banner'},
        {type:2, name: '找精英banner'},
        {type:3, name: '行业大图'},
    ],
    'industry': [
        {type: null, name: '不限'},
        {type: 0, name: "移动互联网"},
        {type: 1, name: "电子商务"},
        {type: 2, name: "企业服务"},
        {type: 3, name: "O2O"},
        {type: 4, name: "教育"},
        {type: 5, name: "金融"},
        {type: 6, name: "游戏"}
    ],
    'status': [
        {type:null, name: '全部'},
        {type: 0, name: '草稿'},
        {type: 2, name: '上线'},
        {type: 1, name: '下线'}
    ]
})

// 公司constant
    .constant('companyListConstant',{
        'industry': [
            {type: null, name: '不限'},
            {type: 0, name: "移动互联网"},
            {type: 1, name: "电子商务"},
            {type: 2, name: "企业服务"},
            {type: 3, name: "O2O"},
            {type: 4, name: "教育"},
            {type: 5, name: "金融"},
            {type: 6, name: "游戏"}
        ],
        'financing': [
            {type: null, name: '全部'},
            {type: 0, name: '无需融资'},
            {type: 1, name: '天使轮'},
            {type: 2, name: 'A轮'},
            {type: 3, name: 'B轮'},
            {type: 4, name: 'C轮'},
            {type: 5, name: 'D轮及以上'},
            {type: 6, name: '上市公司'}
        ],
        'financing2':{
            '全部': null,
            '无需融资':0,
            '天使轮':1,
            'A轮':2,
            'B轮':3,
            'C轮':4,
            'D轮及以上':5,
            '上市公司':6,
        },
        'approved': [
            // {type: null, name: '全部'},
            {type: 0, name: '未认证'},
            {type: 1, name: '已认证'},
        ],
        'freezed': [
            // {type: null, name: '全部'},
            {type: 0, name: '正常 '},
            {type: 1, name: '冻结'},
        ]

    })