<template>
      <f7-page @page:afterback="back" data-page="page1">
          <f7-navbar title="Task" back-link="Back" sliding>
               <f7-nav-right>
                <f7-link open-popup="#demo-popup" link="/about/"><f7-icon f7="add_round"></f7-icon></f7-link>
              </f7-nav-right>
          </f7-navbar>
          <f7-toolbar tabbar labels>
              <f7-link tab-link="#tab1" class="active"><f7-icon f7="timeline"></f7-icon>待機中</f7-link>
              <f7-link tab-link="#tab2"><f7-icon f7="reload"></f7-icon>実施中</f7-link>
              <f7-link tab-link="#tab3"><f7-icon f7="check"></f7-icon>終了</f7-link>
              <f7-link tab-link="#tab4"><f7-icon f7="info"></f7-icon>期限オーバー</f7-link>
            </f7-toolbar>
          <f7-tabs>
      <f7-tab id="tab1" active>
        <f7-list>
          <f7-list-item :key="task.id" :link="'/detail-task/' + task.id" v-for="task in tasks" v-if="task.status == 0">{{task.title}}</f7-list-item>
        </f7-list>
      </f7-tab>
      <f7-tab id="tab2">
        <f7-list>
          <f7-list-item :key="task.id" :link="'/detail-task/' + task.id" v-for="task in tasks" v-if="task.status == 1">{{task.title}}</f7-list-item>
        </f7-list>
        </f7-list>
      </f7-tab>
      <f7-tab id="tab3">
        <f7-list>
          <f7-list-item :key="task.id" :link="'/detail-task/' + task.id" v-for="task in tasks" v-if="task.status == 2">{{task.title}}</f7-list-item>
        </f7-list>
        </f7-list>
      </f7-tab>
      <f7-tab id="tab4">
        <f7-list>
          <f7-list-item :link="'/detail-task/' + task.id" v-for="task in tasks" v-if="task.status == 3" :key="task.id">{{task.title}}</f7-list-item>
        </f7-list>
        </f7-list>
      </f7-tab>
    </f7-tabs>
    <f7-popup id="demo-popup" no-navbar>
         <f7-list form id="my-form1">
        <f7-list-item>
         <div>
            <label for="">タイトル: </label>
             <f7-input name="title" v-model="title" v-validate="'required'" type="text"/>
            <span v-show="errors.has('title')">{{ errors.first('title') }}</span>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">内容: </label>
            <f7-input name="content" v-model="content" v-validate="'required'" type="text"/>
            <span v-show="errors.has('content')">{{ errors.first('content') }}</span>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">備考: </label>
            <f7-input name="note" v-model="note" v-validate="'required'" type="text" />
            <span v-show="errors.has('note')">{{ errors.first('note') }}</span>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">開始時間: </label>
            <f7-input name="start" type="text" readonly id="picker-date1"></f7-input>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">終了時間: </label>
            <f7-input name="end" type="text" readonly id="picker-date2"/>
         </div>
        </f7-list-item>
        <f7-buttons >
                <f7-button big fill class="button col-50" close-popup color="blue">キャンセル</f7-button>
                <f7-button big fill class="button col-50" @click="createTask()" color="green">確認</f7-button>
            </f7-buttons>
      </f7-list>
    </f7-popup>
  </f7-page>        
  </template>
<script>
var myApp = new Framework7();
var $$ = Dom7;
  import {cf} from './../../main.js';
  export default{
    data: function(){
      return{
        tasks: [],
        title: '',
        note: '',
        content: ''
      }
    },
    methods: {
      fetchTasks(){
        var self = this;
        this.$http.post((cf.serverURL + 'list-work-list'),{
          user_id: localStorage.getItem('id'), 
          token: localStorage.getItem('token'), 
          worker_id: this.$route.params.id,
          page: 1
        })
        .then(
          function(res){
            console.log(res);
            $$.each(res.body.results,function(value, key){
              var n = self.$moment(new Date());
              var e = self.$moment(key.date_end);
              if(key.status !=2 && e < n){
                key.status = 3;
              }
            });
            self.tasks = res.body.results;
          },
          function(res){
            alert(res);
          }
        )
      },
      back(){
      },
      showPicker(a){
        var today = new Date(); 
        var pickerInline = myApp.picker({
            input: '#picker-date' + a,
            rotateEffect: true,     
            value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
         
            onChange: function (picker, values, displayValues) {
                var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
                if (values[1] > daysInMonth) {
                    picker.cols[1].setValue(daysInMonth);
                }
            },
         
            formatValue: function (p, values, displayValues) {
                return values[2] + '-' +values[0] + '-' + values[1] + ' '  + ' ' + values[3] + ':' + values[4] + ':00';
            },
         
            cols: [
                // Months
                {
                    values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                    displayValues: ('1 2 3 4 5 6 7 8 9 10 11 12').split(' '),
                    textAlign: 'left'
                },
                // Days
                {
                    values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                },
                // Years
                {
                    values: (function () {
                        var arr = [];
                        for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                        return arr;
                    })(),
                },
                // Space divider
                {
                    divider: true,
                    content: '  '
                },
                // Hours
                {
                    values: (function () {
                        var arr = [];
                        for (var i = 0; i <= 23; i++) { arr.push(i); }
                        return arr;
                    })(),
                },
                // Divider
                {
                    divider: true,
                    content: ':'
                },
                // Minutes
                {
                    values: (function () {
                        var arr = [];
                        for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                        return arr;
                    })(),
                }
            ]
        }); 
      },
      createTask(){
        var self = this;
        this.$validator.validateAll().then(function(result){
          if(result){
            var formData = myApp.formToData("#my-form1");
            self.$http.post(cf.serverURL + 'create-work-list',
              {
                user_id: self.$route.params.id,
                title: formData.title,
                content: formData.content,
                note: formData.note,
                date_start: formData.start,
                date_end: formData.end,
                created_by: localStorage.getItem('id'),
                token: localStorage.getItem('token')
              }
            ).then(
              function(res){
                self.$f7.views.main.router.refreshPage();
                myApp.closeModal();  
                self.$f7.alert("Created Successfully","Create Task");
                console.log(res);
              },
              function(res){
                console.log(res);
              })
          }
          else{
             self.$f7.alert("Correct them all","Error Validated");
            return false;
          }
        })
      }
    },
    created: function(){
      myApp.showPreloader();
      this.fetchTasks();
    },
    updated: function(){
      myApp.hidePreloader();
      this.showPicker(1);
      this.showPicker(2);
    },
    mounted: function(){
      this.showPicker(1);
      this.showPicker(2);
    }
  }
</script>
<style scoped>
  label{
    color: #007aff;
    font-weight: bold;
    font-size: 16px;
  }
  p{
    font-size: 20px;
  }
  .button{
    margin: 20px;
    /*border: 1px solid green !important;*/
  }
</style>