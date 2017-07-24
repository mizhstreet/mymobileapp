<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Yeu cau" sliding></f7-navbar>
    <f7-fab @click="addRequest()" >
        <f7-icon f7="add"></f7-icon>
      </f7-fab>
    <f7-block-title>Danh sach yeu cau</f7-block-title>
    <f7-list media-list>
      <f7-list-item
        v-for="request in requests"
        key="n"
        :title="request.username"
        :subtitle="request.title"
        :text="request.created_at"
        :link="'/help-detail/'+request.id"
        after="Da xu li"
      ></f7-list-item>
    </f7-list>
    <f7-popup id="popup-request" style="background-color:#efeff4" no-navbar>
              <f7-block-title>
                  タスクを追加する
              </f7-block-title>
              <f7-list form id="my-form">
                <f7-list-item>
                    <f7-label for="">タイトル: </f7-label>
                     <f7-input name="title" v-model="title" v-validate="'required'" type="text"/>
                    <span v-show="errors.has('title')">{{ errors.first('title') }}</span>
                </f7-list-item>
                <f7-list-item>
                    <f7-label for="">内容: </f7-label>
                    <f7-input name="content" v-model="content" v-validate="'required'" type="textarea"/>
                    <span v-show="errors.has('content')">{{ errors.first('content') }}</span>
                </f7-list-item>
                <f7-buttons >
                        <f7-button big fill class="button col-50" close-popup color="blue">キャンセル</f7-button>
                        <f7-button big fill class="button col-50" @click="createRequest()" color="green">確認</f7-button>
                    </f7-buttons>
              </f7-list>
    </f7-popup>
  </f7-page>
</template> 
<script>
  import {cf} from './../../main.js';
  var myApp = new Framework7();
  var $$ = Dom7;
  export default {
    data: function(){
      return{
        title: "",
        content: "",
        requests: []
      }
    },
    methods: {
      fetchRequested(){
        this.$http.post(cf.serverURL + 'list-question',{
          user_id: localStorage.getItem('id'),
          token: localStorage.getItem('token')
        }).then(
          function(res){
            this.requests = res.body.results;
          }
        )  
      },
      addRequest(){
        myApp.popup('#popup-request');
      },
      createRequest(){
        var self = this;
        this.$validator.validateAll().then(function(result){
          if(result){
            self.$http.post(cf.serverURL + 'create-question',{
              user_id: localStorage.getItem('id'),
              title: self.title,
              content: self.content,
              token: localStorage.getItem('token')
            })
            .then(
              function(res){
                
              },
              function(res){
                alert(res);
              }
            )
          }
        })
      }
    },
    created: function(){
      this.fetchRequested();
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
