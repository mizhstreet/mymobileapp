<template id="list-user">
    <f7-page pull-to-refresh @ptr:refresh="onRefresh">
      <f7-navbar back-link="Back" title="Task List" sliding></f7-navbar>
      <f7-list media-list>
              <f7-list-item swipeout v-for="notify in notifications"  
              :title="notify.title"
              :id="notify.id"
              @click="seen(notify.id,notify.status)"             
              :link="notify.link"
              :key = "notify.id"
              media="<img src='http://lorempixel.com/160/160/people/1' width='80' />"text
              :text="notify.content"
              :after="notify.status == 1 ? 'Seen' : ''"
              :subtitle="notify.created_at"
              :style="notify.status == 0 ? '' : 'background-color:#f7f7f8' "
              class="edited"
              >
              <f7-swipeout-actions>
              <f7-swipeout-button @click="deleteIt(notify.id)" class="bg-red" >Delete</f7-swipeout-button>
            </f7-swipeout-actions>
            </f7-list-item>
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
        notifications: []
      }
    },
    methods: {
      fetchNotif(){
        myApp.showPreloader();
        this.$http.post(cf.serverURL + 'get-notification', {
          user_id: localStorage.getItem('id'),
          token: localStorage.getItem('token')
        })
        .then(
          function(res){
            this.notifications = res.body.results;
            myApp.hidePreloader();
          },
          function(res){
            myApp.hidePreloader();
          }
        )
      },
      onRefresh: function (event, done) {
        var self = this;
        myApp.showIndicator();
        setTimeout(function () {
          self.$f7.views.main.router.refreshPage();
          done();
          myApp.hideIndicator();
        }, 2000);
      },
      seen(id,status){
        if(status == 0){
            this.$http.post(cf.serverURL + 'seen-notification',{
            user_id: localStorage.getItem('id'),
            token: localStorage.getItem('token'),
            notify_id: id
          }).then(function(res){
            console.log(res);
          })
        }
      },
      deleteIt(id){
        var self = this;
        this.$http.post(cf.serverURL + 'delete-notification',{
          notify_id: id,
          user_id: localStorage.getItem('id'),
          token: localStorage.getItem('token')
        })
        .then(
          function(res){
            $$('#badgeNoti').html($$('#badgeNoti').html() -1);
            if($$('#badgeNoti').html() == 0){
              $$('#badgeNoti').hide();
            }
          },
          function(res){

          }
        );
        myApp.swipeoutDelete('#'+id);
      }
    },
    created: function(){
      this.fetchNotif();
    },
    mounted: function(){
      $$('.swipeout').on('click', function () {
        myApp.alert('Item removed');
      }); 
    }
  }
 </script>
 <style scoped>
   /*.swipeout-delete{
      background: none !important;
      border: 1px solid #ff3b30 !important;
      color: red !important;   
   }
   .no-background{
      background: none !important;
      border: 1px solid   #007aff;
      color: #007aff !important;
   }*/
   .item-content{
    padding: 0 !important;
   }
   .edited > .swipeout-content > .item-link > .item-content{
      padding: 0 !important;
   }
 </style>