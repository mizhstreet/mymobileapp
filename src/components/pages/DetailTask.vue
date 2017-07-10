<template>
    <f7-page @page:afterback="back">
      <f7-navbar title="Detail Task" back-link="Back" sliding>
      </f7-navbar>    
      <f7-list>
        <f7-list-item>
        <div>
            <label for="">Tạo bởi: </label>
            <f7-input id="created_by" type="text" :value="task.created_by" :readonly="true"/>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">Tiêu đề: </label>
            <f7-input id="title" type="text" :value="task.title" :readonly="task.status != 0 ? 'readonly' : false "/>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">Nội dung: </label>
            <f7-input id="content" type="text" :value="task.content" :readonly="task.status != 0 ? 'readonly' : false "/>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">Ghi chú </label>
            <f7-input id="note" type="text" :value="task.note" :readonly="task.status != 0 ? 'readonly' : false "/>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">Ngày bắt đầu </label>
            <f7-input id="start" type="text" :value="task.date_start" :readonly="task.status != 0 ? 'readonly' : false "/>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">Ngày kết thúc </label>
            <f7-input id="end" type="text" :value="task.date_end" :readonly="task.status != 0 ? 'readonly' : false "/>
         </div>
        </f7-list-item>
       <f7-buttons >
                <f7-button v-if="task.status == 0" big fill class="button col-50" @click="confirmTask()" color="green">Confirm</f7-button>
                <f7-button v-if="task.status == 0" big fill class="button col-50" @click="deleteTask()" color="red">Delete</f7-button>
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
        createrName: ""
      }
    },
    methods: {
        showConfirm(){
            var self = this;
            self.$f7.confirm('Are you sure want to delete this?', 'Delete Task',function(){
                self.$f7.alert('Deleted Successfully','Delete Task');
            })
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
        confirmTask(){
          var self = this;
          console.log(localStorage.getItem('type'));
          if(localStorage.getItem('type') == 1){
            this.$http.post(cf.serverURL + 'change-status-work-list',{user_id: localStorage.getItem('id'), token: localStorage.getItem('token'), work_id: this.$route.params.id, status: 1})
          .then(
            function(res){
               self.$f7.views.main.router.refreshPreviousPage();
              self.$f7.alert('Confirmed Successfully','Confirm Task', function(){
                 self.$f7.views.main.router.back();
               
              });     
            },
            function(res){

            }
          )
          }
          else if (localStorage.getItem('type') == 2){
            myApp.showPreloader();
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
                self.$f7.alert('Sửa việc thành công','Sửa việc', function(){
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
          this.$f7.confirm("Are you sure want to delete this","Delete", function(){
            self.$http.post(cf.serverURL + 'delete-work-list',{
              user_id: localStorage.getItem('id'),
              token: localStorage.getItem('token'),
              work_id: self.$route.params.id
            }).then(
              function(res){
                console.log(res);
                self.$f7.views.main.router.refreshPreviousPage();
                self.$f7.alert('Confirmed Successfully','Confirm Task', function(){
                 self.$f7.views.main.router.back();              
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
      // myApp.hidePreloader();
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
</style>