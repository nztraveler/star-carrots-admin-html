/**
 * Created by CT on 2017/2/25.
 */
angular.module('admin')
    //ui-bootstrap日历插件调试失败，弃用！
.directive('timePicker',function () {
    return {
        restrict: 'E',
        templateUrl: 'views/template/TimePicker.html',
        $scope: {
            startAt: '=',
            endAt: '=',
            clear: '='
        },
        replace: 'true',
        link: function ($scope) {
            $scope.today = function () {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };

            $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: false
            };

            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yyyy',
                showWeeks: false,
                minDate: new Date(2017,2,1),
                // maxDate: new Date(),
                startingDay: 1
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 7 || date.getDay() === 8);
            }

            $scope.toggleMin = function () {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
            };

            $scope.toggleMin();

            $scope.open1 = function () {
                $scope.popup1.opened = true;
            };

            $scope.open2 = function () {
                $scope.popup2.opened = true;
            };

            $scope.setDate = function (year, month, day) {
                $scope.dt = new Date(year, month, day);
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['M!/d!/yyyy'];

            $scope.popup1 = {
                opened: false
            };

            $scope.popup2 = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            $scope.events = [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }

                //个人配置
                // $scope.$watch('dtStart',function () {
                //     $scope.dateOptions2={
                //         minDate: new Date($scope.dtStart)
                //     }
                // })

                return '';
            }


        }

    }
})

.directive('bsPicker',function () {
    return{
        restrict: 'E',
        templateUrl: 'views/template/bsPicker.html',
        replace: 'true',
        link: function ($scope){
            $scope.today = new Date();
            $scope.startMax = new Date();
            $scope.$watch('vm.articleSearch.endAt',function (newDate) {
                if (newDate==null||newDate==undefined||newDate==''){
                    $scope.startMax = new Date();
                }else {
                    $scope.startMax =newDate ;
                }
            })
        }
    }
})


//上传
    .directive('upLoader', function (FileUploader) {
        return {
            restrict: 'E',
            templateUrl: 'views/template/upload.html',
            scope: {
                logoUrl: '=ngModel',//图片上传后地址
                tabName: '@'
            },
            replace: 'true',
            link: function (scope, ele, attrs) {
                scope.class = attrs.class;
                scope.labelClass = attrs.labelClass;
                scope.uploader = new FileUploader({//实例化
                    url: '/lbd-admin/a/u/img/test',
                    queueLimit: 1
                });
                scope.clearItem = function () {//清空队列
                    scope.uploader.clearQueue()
                };
                scope.getUrl = function (files) {
                    scope.fileList = files;
                    scope.imgURL = window.URL.createObjectURL(scope.fileList[0]);//考虑性能用后清除
                };
                scope.uploader.onSuccessItem = function (item, response) {//上传成功返回地址
                    scope.logoUrl = response.data.url
                }
            }
        }
    })