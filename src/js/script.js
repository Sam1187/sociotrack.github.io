'use strict';

        // Компонент для диалогового окна
        Vue.component('v-dialog', {
            template: '#dialog-template',
            data: function() {
                return {
                    active: false
                }
            },
            props: ['btnText'],
            methods: {
                open: function() {
                    this.active = true
                },
                close: function() {
                    this.active = false
                },
                onCancel: function() {
                    this.close();
                },
                onConfirm: function() {
                    this.close();
                }
            }
        })
    
        // Подключение Vue
        new Vue({
            el: "#app",
            data: {
                day: [],
                week: [],
                month: [],
                per: [],
                periods: [
                    {period: 'Last day'},
                    {period: 'Week'},
                    {period: 'Month'}
                ],
                selectPeriodIndex: 0
            },
            methods: {
                // Переключение вкладок навигации
                selectPeriod: function (index) {
                    this.selectPeriodIndex = index
                    if ( index == 0) {
                        this.per = this.day
                    } else if ( index == 1) {
                        this.per = this.week
                    } else if ( index == 2) {
                        this.per = this.month
                    }
                }
            },

            // Загрузка с JSON
            mounted: function () {
                var self = this;
                $.ajax({
                    url: 'https://api.myjson.com/bins/hfaly',
                    method: 'GET',
                    success: function (data) {
                        self.day = data.day;
                        self.week = data.week;
                        self.month = data.month;
                        self.per = self.day;
                    },
                    error: function (eror) {
                        console.log(error);
                    }
                });
            }
        })

 