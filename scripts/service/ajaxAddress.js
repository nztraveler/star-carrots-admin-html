/**
 * Created by gaogao on 16/7/22.
 */
angular.module("admin")
    .factory('pathProject', function () {
        return {
            //上传图片接口
            upload_url: function () {
                return "/carrots-admin-ajax/a/u/img/3"
            },
            // 获取公司列表接口
            getCompanyList_url: "/carrots-admin-ajax/a/company/search",
            // 删除公司信息接口
            delCompany_url: function (id) {
                return "/carrots-admin-ajax/a/u/company/" + id
            },
            // 认证/冻结公司状态接口
            changeCompanyStatus_url: function (id, type, status) {
                return "/carrots-admin-ajax/a/u/company/status?id=" + id + "&type=" + type + "&status=" + status;
            },
            // 获取公司详情接口
            getCompanyDetail_url: function (id) {
                return "/carrots-admin-ajax/a/company/" + id;
            },
            // 新增公司详情
            addCompany_url: "/carrots-admin-ajax/a/u/company",
            // 编辑公司详情
            editCompany_url: function (id) {
                return "/carrots-admin-ajax/a/u/company/" + id
            },

            // 职业列表接口
            PositionList_url: " /carrots-admin-ajax/a/profession/search",//JSON/PositionList.json
            // 添加职业接口
            postPosition_url: "/carrots-admin-ajax/a/u/profession",
            // 编辑职业接口
            putPosition_url: function (id) {
                return " /carrots-admin-ajax/a/u/profession/" + id
            },
            // 删除职业接口
            deletePosition_url: function (id) {
                return "/carrots-admin-ajax/a/u/profession/" + id
            },
            // 职业冻结修改接口
            putPositionstatus_url: function (params, id) {
                console.log(id);
                return "/carrots-admin-ajax/a/u/profession/status/?id=" + id + "&status=" + params
            },
            // 获取职位明细信息接口
            getPosition_url: function (id) {
                return " /carrots-admin-ajax/a/profession/" + id
            },
            // 获取公司福利标签接口
            getCompanyTags_url: function (id) {
                return "/carrots-admin-ajax/a/tags/" + id
            },

            //Article管理
            //Article列表接口
            getArticlelist_url: "/carrots-admin-ajax/a/article/search",
            // 获取article
            getArticle_url: function (id) {
                return "/carrots-admin-ajax/a/article/" + id;
            },
            // 新增article
            addArticle_url: "/carrots-admin-ajax/a/u/article",
            // 删除article
            delArticle_url: function (id) {
                return "/carrots-admin-ajax/a/u/article/" + id;
            },
            // 编辑article
            editArticle_url: function (id) {
                return "/carrots-admin-ajax/a/u/article/" + id;
            },
            //修改article的上架/下架
            changeArticleStatus_url: function (id, status) {
                return "/carrots-admin-ajax/a/u/article/status?id=" + id + "&status=" + status;
            }


            // getArticleList_url: "/a/article/search",
            // delArticle_url: function (id) {
            //     return "JSON/asdasdasdasd" + id
            // },
            // //排序article
            // postArticleSort_url: "JSON/BaASDASD",
            // //编辑article
            // putArticle_url: "/a/u/article",
            // //新增article
            // postArticle_url: "/a/u/article",
            // //article详细接口
            // getArticleDetail_url: function (id) {
            //     return "/a/article/" + id
            // }
        }
    });