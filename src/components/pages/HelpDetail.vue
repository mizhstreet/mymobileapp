<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Yeu cau" sliding>
      <f7-nav-right>
      <f7-link v-if="request.status == 0" @click="save()">Save</f7-link>
    </f7-nav-right>
    </f7-navbar>
    <f7-block-title>Danh sach yeu cau</f7-block-title>
    <f7-list form>
      <f7-list-item>
        <f7-label>Name</f7-label>
        <f7-input readonly type="text" :value="request.username"/>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Title</f7-label>
        <f7-input readonly type="text" :value="request.title"/>
      </f7-list-item>
      <f7-list-item>
        <f7-label>ngay tao</f7-label>
        <f7-input type="text" :value="request.created_at" readonly/>
      </f7-list-item>
       <f7-list-item>
        <f7-label>status:</f7-label>
        <f7-input type="switch" :checked="request.status ==1" disabled></f7-input>
      </f7-list-item>
	  <f7-list-item>
        <f7-label>Noi dung</f7-label>
        <f7-input readonly type="textarea" :value="request.content"/>
      </f7-list-item>
    </f7-list>
    <f7-block-title>Phan hoi</f7-block-title>
    <f7-list form>
	  <f7-list-item>
        <f7-input type="textarea" :readonly="request.status ==1" v-model="answer" placeholder="Noi dung phan hoi" />
      </f7-list-item>
    </f7-list>
  </f7-page>
</template> 
<script>
	import {cf} from './../../main.js';
  // var myApp = new Framework7();
  // var $$ = Dom7;
  export default {
    data: function(){
      return{
        request:[],
        answer:""
      }
    },
    methods: {
      fetchARequest(){
        this.$http.post(cf.serverURL + 'get-a-question',{
          user_id: localStorage.getItem('id'),
          token: localStorage.getItem('token'),
          question_id: this.$route.params.id
        }).then(
          function(res){
            console.log(res);
            this.request = res.body.results;
            this.answer = res.body.results.answer;
          },
          function(res){
            console.log(res);
          }
        )
      },
      save(){
        this.$http.post(cf.serverURL + 'create-answer',{
          user_id: localStorage.getItem('id'),
          token: localStorage.getItem('token'),
          question_id: this.$route.params.id,
          answer: this.answer
        }).then(function(res){
          console.log(res);
        })
      }
    },
    created: function(){
      this.fetchARequest();
    }
  }
</script>
