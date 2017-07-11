<template>
    <f7-page>
      <f7-navbar title="プロフィール" back-link="バック" sliding></f7-navbar>
      <f7-block>
        <div style="text-align: center;">
          <img src="../../img/pic.jpg" style="border-radius: 50%; max-width:150px; border: 4px solid #007aff" alt="">
          <h1 class="color-blue">{{user.name}}</h1>
        </div>
      </f7-block>
      <f7-block-title>概要情報</f7-block-title>
      <f7-list>
        <f7-list-item>
         <div>
            <label for="">名前: </label>
            <p>{{user.name}}</p>
         </div>
        </f7-list-item>
         <f7-list-item>
         <div>
            <label for="">日本語の名前: </label>
            <p>{{user.name_jp}}</p>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">生年月日: </label>
            <p>{{user.birthday}}</p>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">住所: </label>
            <p>{{user.address}}</p>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">パスポートID: </label>
            <p>{{user.number_passport}}</p>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">会社名: </label>
            <p>{{user.company_id}}</p>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">性別: </label>
            <p>{{user.sex == 1 ? "Female" : "Male"}}</p>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">Facebook: </label>
            <p>{{user.facebook}}</p>
         </div>
        </f7-list-item>
        <f7-list-item>
         <div>
            <label for="">仕事開始日: </label>
            <p>{{user.date_start}}</p>
         </div>
        </f7-list-item>
      </f7-list>
    </f7-page>
  </template>
<script>
var myApp = new Framework7();
import {cf} from './../../main.js';
export default{
    data: function(){
        return{
            user: []
        }
    },
    methods: {
        fetchMyProfile(){
          var self = this;
            this.$http.post(cf.serverURL + 'edit-user', {
                created_by: localStorage.getItem("id"),
                user_id: this.$route.params.id,
                token: localStorage.getItem('token')
            },
            {
              timeout: 15000
            }).then(
                function(res){                    
                  this.user = res.body.results;
                },
                function(res){
                  myApp.hideIndicator();
                  self.$f7.alert("Could not connect, pls try again");
                }
            )
        }
    },
    created: function(){
        myApp.showIndicator();
        this.fetchMyProfile();
    },
    updated: function(){
      myApp.hideIndicator();
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
</style>