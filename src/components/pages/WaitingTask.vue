<template>
      <f7-page>
          <f7-navbar title="Task" back-link="Back" sliding>
               <f7-nav-right>
                <f7-link open-popup="#demo-popup" link="/about/"><f7-icon f7="add_round"></f7-icon></f7-link>
              </f7-nav-right>
          </f7-navbar>
     <f7-list media-list>
      <f7-list-item
        v-for="task in tasks"
        :key="task.id"
        :title="task.username"
        :subtitle="task.title"
        :text="task.created_at"
        :link="'/detail-task/'+task.id"
      ></f7-list-item>
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
        tasks: [],
      }
    },
    methods: {
      fetchTasks(){
        var self = this;
        myApp.showPreloader();
        var self = this;
        this.$http.post((cf.serverURL + 'get-all-work-list'),{user_id: localStorage.getItem('id'), token: localStorage.getItem('token')})
        .then(
          function(res){
            console.log(res);
            self.tasks = res.body.results;
            myApp.hidePreloader();
          },
          function(res){
            self.$f7.alert("Can't Connect");
            myApp.hidePreloader();
          }
        )
      },
      
    },
    created: function(){
      this.fetchTasks();
    },
    updated: function(){
      myApp.hidePreloader();
    },
    mounted: function(){

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