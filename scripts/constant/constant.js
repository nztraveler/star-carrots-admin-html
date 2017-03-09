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
    // 'type2':{
    //     // '全部': null,
    //     '首页banner':0 ,
    //     '找职位banner':1,
    //     '找精英banner':2,
    //     '行业大图':3
    // },
    // 'status2': {
    //     // '全部': null,
    //     '上线':2 ,
    //     '下线':1,
    // },
    // 'industry2': {
    //     // '不限': null,
    //     '移动互联网':0 ,
    //     '电子商务':1,
    //     '企业服务':2,
    //     'O2O':3,
    //     '教育':4,
    //     '金融':5,
    //     '游戏':6
    // },
    'type':[
        // {type:'', name: '全部'},//参数为空时显示全部
        {type:0, name: '首页banner'},
        {type:1, name: '找职位banner'},
        {type:2, name: '找精英banner'},
        {type:3, name: '行业大图'},
    ],
    'industry': [
        // {type: null, name: '不限'},
        {type: 0, name: "移动互联网"},
        {type: 1, name: "电子商务"},
        {type: 2, name: "企业服务"},
        {type: 3, name: "O2O"},
        {type: 4, name: "教育"},
        {type: 5, name: "金融"},
        {type: 6, name: "游戏"}
    ],
    'status': [
        // {type:null, name: '全部'},
        // {type: 0, name: '草稿'},
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
            // {type: null, name: '全部'},
            {type: 0, name: '无需融资'},
            {type: 1, name: '天使轮'},
            {type: 2, name: 'A轮'},
            {type: 3, name: 'B轮'},
            {type: 4, name: 'C轮'},
            {type: 5, name: 'D轮及以上'},
            {type: 6, name: '上市公司'}
        ],
        // 'financing2':{
        //     // '全部': null,
        //     '无需融资':0,
        //     '天使轮':1,
        //     'A轮':2,
        //     'B轮':3,
        //     'C轮':4,
        //     'D轮及以上':5,
        //     '上市公司':6,
        // },
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

    // 公司行业多选数据
    .constant('companyIndustryGroup', [
        {
            industry: 0,
            name: '移动互联网'
            // ticked: true
        },
        {
            name: '电子商务',
            industry: 1
        },
        {
            name: '企业服务 ',
            industry: '2'
        },
        {
            name: 'O2O',
            industry: '3'
        },
        {
            name: '教育',
            industry: '4'
        },
        {
            name: '金融',
            industry: '5'

        },
        {
            name: '游戏',
            industry: '6'
        }
    ])

    //职业数据
    .constant('ProfessionConstant', {
        'tabelTitle': ['序号', '公司名称', '职位名称', '职位类别', '薪资', '学历要求', '工作经验', '发布时间', '状态', '操作'],
        'recommend': [
            {type: null, name: '全部'},
            {type: 0, name: '普通'},
            {type: 1, name: '推荐'},
        ],
        'category': [
            {type: null, name: '全部'},
            {type: 1, name: '产品'},
            {type: 2, name: 'UI'},
            {type: 3, name: 'QA'},
            {type: 4, name: 'Android'},
            {type: 5, name: 'IOS'},
            {type: 6, name: 'WEB'},
            {type: 7, name: 'OP'},
            {type: 8, name: 'Java'},
            {type: 9, name: 'NLP'},
            {type: 10, name: 'DM'},
            {type: 11, name: 'DL'}
        ],
        'subCategory': [
            {
                type: 1,
                name: "产品",
                data: [{type: null, name: '不限', choose: true},
                    {type: 1, name: '助理', choose: false},
                    {type: 2, name: '初级', choose: false},
                    {type: 3, name: '中级', choose: false},
                    {type: 4, name: '高级', choose: false},
                    {type: 5, name: '总监', choose: false}]
            },
            {
                type: 2,
                name: "UI",
                data: [{type: null, name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false},
                    {type: 4, name: '总监', choose: false}
                ]
            },
            {
                type: 3,
                name: "QA",
                data: [{type: null, name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                type: 4,
                name: "Android",
                data: [{type: null, name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                type: 5,
                name: "IOS",
                data: [{type: null, name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                type: 6,
                name: "WEB",
                data: [{type: null, name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                type: 7,
                name: "OP",
                data: [{type: null, name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                type: 8,
                name: "Java",
                data: [{type: null, name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false},
                    {type: 4, name: '总监', choose: false}
                ]
            },
            {
                type: 9,
                name: "NLP",
                data: [{type: null, name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                type: 10,
                name: "DM",
                data: [{type: null, name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            },
            {
                type: 11,
                name: "DL",
                data: [{type: null, name: '不限', choose: true},
                    {type: 1, name: '初级', choose: false},
                    {type: 2, name: '中级', choose: false},
                    {type: 3, name: '高级', choose: false}
                ]
            }
        ],
        'education': [
            // {type: null, name: '全部'},
            {type: 0, name: '大专'},
            {type: 1, name: '本科'},
            {type: 2, name: '硕士'},
            {type: 3, name: '博士及以上'}
        ],
        // 'education2': {
        //     // '全部':null,
        //     '大专':0,
        //     '本科':1,
        //     '硕士':2,
        //     '博士及以上':3,
        //
        // },

        'experience': [
            // {type: null, name: '全部'},
            {"type": 0, name: '应届'},
            {"type": 1, name: '1~2年'},
            {"type": 2, name: '3~5年'},
            {"type": 3, name: '6～9年'},
            {"type": 4, name: '10年及以上'}
        ],

        // 'experience2': {
        //     // '全部': null,
        //     '应届': 0,
        //     '1~2年': 1,
        //     '3~5年': 2,
        //     '6～9年': 3,
        //     '10年及以上': 4,
        // },

        'compensation': [
            // {type: null, name: '全部'},
            {"type": 0, name: "0-8k"},
            {"type": 1, name: "8-15k"},
            {"type": 2, name: "16-25k"},
            {"type": 3, name: "26k及以上"}
        ],
        'compensation2': {
            // '全部': null,
            '0-8k': 0,
            '8-15k': 1,
            '16-25k': 2,
            '26k及以上': 3,
        },

        'status': [
            // {"type": null, name: '全部'},
            {"type": 0, name: "下架"},
            {"type": 1, name: "上架"},
        ],
        'status2': [
            // {type: null, name: '全部'},
            {"type": 1, name: "下架"},
            {"type": 0, name: "上架"},
        ]
    })

    // 职业分类二级联动数据
    .constant('categoryData', [
        {
            id: 1,
            name: "产品",
            subCategory: [
                {
                    id: 1,
                    name: "助理"
                },
                {
                    id: 2,
                    name: "初级"
                },
                {
                    id: 3,
                    name: "中级"
                },
                {
                    id: 4,
                    name: "高级"
                },
                {
                    id: 5,
                    name: "总监"
                }
            ]
        },
        {
            id: 2,
            name: "UI",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                },
                {
                    id: 4,
                    name: "总监"
                }
            ]
        },
        {
            id: 3,
            name: "QA",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 2,
                    name: "高级"
                }
            ]
        },
        {
            id: 4,
            name: "Android",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        },
        {
            id: 5,
            name: "IOS",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        },
        {
            id: 6,
            name: "WEB",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        },
        {
            id: 7,
            name: "OP",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        },
        {
            id: 8,
            name: "JAVA",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                },
                {
                    id: 4,
                    name: "总监"
                }
            ]
        },
        {
            id: 9,
            name: "NLP",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        },
        {
            id: 10,
            name: "DM",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        },
        {
            id: 11,
            name: "DL",
            subCategory: [
                {
                    id: 1,
                    name: "初级"
                },
                {
                    id: 2,
                    name: "中级"
                },
                {
                    id: 3,
                    name: "高级"
                }
            ]
        }

    ]);