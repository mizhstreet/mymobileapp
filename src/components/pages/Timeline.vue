<template>
  <f7-page>
    <f7-navbar back-link="Back" title="仕事項目" sliding>
    </f7-navbar>
      <f7-fab @click="addTimeline()" >
        <f7-icon f7="add"></f7-icon>
      </f7-fab>
    <f7-grid>
      <f7-col width="25" style="text-align:center" no-gutter>
        <f7-icon if-ios="f7:circle_fill" if-material="material:circle_fill" size="15px" color="white"></f7-icon>
        <div class="icon-name">待機中</div> 
      </f7-col>
      <f7-col width="25" style="text-align:center" no-gutter>
        <f7-icon if-ios="f7:circle_fill" if-material="material:circle_fill" size="15px" color="blue"></f7-icon>
        <div class="icon-name">実施中</div> 
      </f7-col>
      <f7-col width="25" style="text-align:center" no-gutter>
        <f7-icon if-ios="f7:circle_fill" if-material="material:circle_fill" size="15px" color="green"></f7-icon>
        <div class="icon-name">終了</div> 
      </f7-col>
      <f7-col width="25" style="text-align:center" no-gutter>
        <f7-icon if-ios="f7:circle_fill" if-material="material:circle_fill" size="15px" color="red"></f7-icon>
        <div class="icon-name">期限オーバー</div> 
      </f7-col>
    </f7-grid>
    <f7-timeline sides >
      <f7-timeline-item :day="event.start"
        v-for="event in events"
        :key="event.id"
        :month="event.month"
        :time="event.hour + ':' + event.minute"
        :title="event.title"
      >
        <f7-list inset>
          <f7-list-item :link="'/detail-task/'+event.id" :id="'event' + event.id" :class="'color-white ' + event.class">
            <f7-timeline-item-child 
              :subtitle="event.note"
              :text="event.content">
          
        </f7-timeline-item-child>
          </f7-list-item>
        </f7-list>
      </f7-timeline-item>
    </f7-timeline>
    <f7-popup id="addTask-popup" style="background-color:#efeff4" no-navbar>
              <f7-block-title>
                  タスクを追加する
              </f7-block-title>
              <f7-list form id="my-form">
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
                    <f7-input name="start" type="text" placeholder="Date Time" readonly id="picker-date1"></f7-input>
                 </div>
                </f7-list-item>
                <f7-list-item>
                 <div>
                    <label for="">終了時間: </label>
                    <f7-input name="end" type="text" placeholder="Date Time" readonly id="picker-date2"/>
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
var $$ = Dom7;
var myApp = new Framework7();
import {cf} from './../../main.js'
  export default {
    data: function(){
      return{
        i: 1,
        events: [],
        title: '',
        note: '',
        content: ''
      }
    },
    methods: {
      fetchEvents(num){
        var self = this;
        myApp.showIndicator();
        this.$http.post(cf.serverURL + 'list-work-list',{
          user_id: localStorage.getItem('id'),
          token: localStorage.getItem('token'),
          worker_id: localStorage.getItem('id'),
          page: 2
        },
        {
          timeout: 15000
        }).then(
          function(res){
            if(res.body.ok){
              var now = self.$moment(new Date());
              $$.each(res.body.results, function(value, key){
                var n = self.$moment(key.date_start);
                var e = self.$moment(key.date_end);
                key.start = n.date();
                key.minute = n.minute();
                key.hour = n.hour();
                key.month = n.month();
                if(key.status !=2 && e < now){
                  key.class="bg-red"
                }
                else if(key.status == 0){
                  key.class="color-black";
                }
                else if(key.status == 1){
                  key.class="bg-blue"
                }
                else if(key.status == 2){
                  key.class ="bg-green"
                }
                self.events = res.body.results;
              })
              myApp.hideIndicator();
            }
            else{
              myApp.hideIndicator();
              self.$f7.alert("Oops! Something went wrong","ERROR");
            }
            
          },
          function(res){
            myApp.hideIndicator();
            self.$f7.alert("Could not connect, please try again");
          }
        )
      },
      addTimeline(){
        myApp.popup('#addTask-popup');
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
            var formData = myApp.formToData("#my-form");
            self.$http.post(cf.serverURL + 'create-work-list',
              {
                user_id: localStorage.getItem('id'),
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
                myApp.closeModal('#addTask-popup');
                self.$f7.alert("Created Successfully","Create Task");
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

      this.fetchEvents(this.i);
    },
    updated: function(){
      myApp.hideIndicator();
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
  .timeline-item-subtitle{
    font-size: 15px;
    color:#fff;
  }
  .button{
    margin: 20px;
    /*border: 1px solid green !important;*/
  }
  .timeline-item-text{
    font-size: 20px;
  }
  .border-red{
    border: 2px solid red !important;
  }
  .theme{
    background-color: #efeff4;
  }
</style>