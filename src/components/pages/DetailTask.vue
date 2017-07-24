<template>
    <f7-page @page:afterback="back">
      <f7-navbar title="仕事詳細" back-link="Back" sliding>
      </f7-navbar>    
      <f7-list>
        <f7-list-item>
        <div>
            <label for="">作成者: </label>
            <f7-input id="created_by" type="text" :value="task.created_by" :readonly="true"/>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">タイトル: </label>
            <f7-input id="title" type="text" :value="task.title" :readonly="task.status != 0 ? 'readonly' : false "/>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">内容: </label>
            <f7-input id="content" type="text" :value="task.content" :readonly="task.status != 0 ? 'readonly' : false "/>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">備考:</label>
            <f7-input id="note" type="text" :value="task.note" :readonly="task.status != 0 ? 'readonly' : false "/>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">開始時間: </label>
            <f7-input id="start" type="text" :value="task.date_start" :readonly="task.status != 0 ? 'readonly' : false "/>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">終了時間: </label>
            <f7-input id="end" type="text" :value="task.date_end" :readonly="task.status != 0 ? 'readonly' : false "/>
         </div>
        </f7-list-item>
       <f7-buttons >
                <f7-button big v-if="task.status == 0" fill class="button col-50" @click="confirmTask()" color="green">確認</f7-button>
                <f7-button v-if="task.status == 0" big fill class="button col-50" @click="deleteTask()" color="red">削除</f7-button>
                <f7-button v-if="task.status == 1 &amp;&amp; checkWorker() &amp;&amp; checkOverdue() " big fill class="button col-100" @click="finishTask()" color="green">確認</f7-button>
            </f7-buttons>
      </f7-list>

    </f7-page>
  </template>
<script>
var myApp = new Framework7();
var $$ = Dom7;
import {cf} from './../../main.js';
  export default{
    data: function(){
      return{
        task:[],
        createrName: "",
        message: ''
      }
    },
    methods: {
        checkWorker(){
          if(localStorage.getItem('type') == 3){
            return true;
          }
          else{
            return false;
          }
        },
        checkOverdue(){
          var now = this.$moment(new Date());
          var e = this.$moment(this.task.date_end);
          if(e<now){
            return false;
          }
          else{
            return true;
          }
        },
        fetchTask(){
          this.$http.post(cf.serverURL + 'edit-work-list', 
          { user_id: localStorage.getItem('id'),
            token: localStorage.getItem('token'),
            work_id: this.$route.params.id
          }).then(
            function(res){
              this.task = res.body.results;
            },
            function(res){

            }
          )
        },
        finishTask(){
          var self = this;
          myApp.showPreloader();
          this.$http.post(cf.serverURL + 'change-status-work-list',{user_id: localStorage.getItem('id'), token: localStorage.getItem('token'), work_id: this.$route.params.id, status: 2})
          .then(
            function(res){
              if(res.body.ok){
                myApp.hidePreloader();
                self.$f7.views.main.router.refreshPreviousPage();
                self.$f7.alert('承認しました。','Confirm Task', function(){
                self.$f7.views.main.router.back();});
              }
            },
            function(res){
              myApp.hidePreloader();
              self.$f7.alert('承認しました。','Error');
            }
          )
        },
        confirmTask(){
           // myApp.showPreloader();
          var self = this;
          if(localStorage.getItem('type') == 2){
            if(
                  $$('#title').val() != self.task.title ||
                  $$('#note').val() != self.task.note ||
                  $$('#content').val() != self.task.content ||
                  $$('#start').val() != self.task.date_start ||
                  $$('#end').val() != self.task.date_end 
                ){
                  this.$http.post(cf.serverURL + 'create-work-list',{
                    user_id: self.task.user_id, 
                    token: localStorage.getItem('token'), 
                    work_id: this.$route.params.id,
                    title: $$('#title').val(),
                    created_by: $$('#created_by').val(),
                    content: $$('#content').val(),
                    note: $$('#note').val(),
                    date_start: $$('#start').val(),
                    date_end: $$('#end').val()
                  })
                    .then(function(res){
                    },
                    function(){
                      self.$f7.alert("Da co loi xay ra");
                    });                  
                }
          this.$http.post(cf.serverURL + 'change-status-work-list',{user_id: localStorage.getItem('id'), token: localStorage.getItem('token'), work_id: this.$route.params.id, status: 1})
          .then(
            function(res){   
              // myApp.hidePreloader();
                self.$f7.views.main.router.refreshPreviousPage();
                $$('.modal-overlay').css({"visibility": "visible","opacity": "1"});
              myApp.alert('Confirmed Successfully','Confirm Task', function(){
                 self.$f7.views.main.router.back();
                 $$('.modal-overlay').css({"visibility": "hidden","opacity": "0"});               
              });   
                
            },
            function(res){

            }
          );
          this.$http.post(cf.serverURL + 'create-notification',{
            user_id: this.task.user_id,
            title: this.task.title,
            status: 0,
            content: "Công việc đã được xử lí",
            created_by: localStorage.getItem('id'),
            link: "/detail-task/" + this.task.id,
            token: localStorage.getItem('token')
          }).then(
            function(res){
              console.log(res);
            },
            function(res){
              console.log(res);
            }
          )
          }
          else if (localStorage.getItem('type') == 3){
            this.$http.post(cf.serverURL + 'create-work-list',{
              user_id: localStorage.getItem('id'), 
              token: localStorage.getItem('token'), 
              work_id: this.$route.params.id,
              title: $$('#title').val(),
              created_by: $$('#created_by').val(),
              content: $$('#content').val(),
              note: $$('#note').val(),
              date_start: $$('#start').val(),
              date_end: $$('#end').val()
            }).then(
              function(res){
                myApp.hidePreloader();
                self.$f7.views.main.router.refreshPreviousPage();
                self.$f7.alert('仕事内容を修正しました','Sửa việc', function(){
                 self.$f7.views.main.router.back();
               
                  });  
              },
              function(res){
                myApp.hidePreloader();
                self.$f7.alert('Không thể kết nối, kiểm tra lại đường truyền','', function(){
                  self.$f7.views.main.router.back();
                })
              }
            )
          }
          
        },
        back(){
        },
        deleteTask(){
          var self = this;
          this.$f7.confirm("削除しますか。","削除", function(){
            self.$http.post(cf.serverURL + 'delete-work-list',{
              user_id: localStorage.getItem('id'),
              token: localStorage.getItem('token'),
              work_id: self.$route.params.id
            }).then(
              function(res){
                // console.log(res);
                this.$http.post(cf.serverURL + 'create-notification',{
                  user_id: this.task.user_id,
                  title: this.task.title,
                  status: 0,
                  content: "Công việc đã bị xóa",
                  created_by: localStorage.getItem('id'),
                  link: "/detail-task/" + this.task.id,
                  token: localStorage.getItem('token')
                });
                self.$f7.views.main.router.refreshPreviousPage();
                $$('.modal-overlay').css({"visibility": "visible","opacity": "1"});
                self.$f7.alert('承認しました。','確認', function(){
                 self.$f7.views.main.router.back(); 
                 $$('.modal-overlay').css({"visibility": "hidden","opacity": "0"});             
              });
              },
              function(res){
              }
            )
          })
        }

    },
    created: function(){
      myApp.showPreloader();
      this.fetchTask();
    },
    mounted: function(){
      myApp.hidePreloader();
      this.$f7.views.main.router.refreshPreviousPage();
    },
    updated: function(){
      myApp.hidePreloader();
    }
  }
</script>
<style scoped>
  label{
    color: #007aff;
    font-weight: bold;
    font-size: 16px;
  }
  input{
    font-size: 20px;
  }
  .btn-group{
    text-align: center;
  }
  .button{
    margin: 20px;
  }
  .buttons-row{
    margin: 8% ;
  }
  .modal-overlay-visiblee{
    visibility: visible;
    opacity: 1;
  }
</style>