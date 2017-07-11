<template>
      <f7-page>
          <f7-navbar title="Worker Profile" back-link="Back" sliding>
               <f7-nav-right>
                <f7-link open-popup="#demo-popup"><f7-icon f7="compose"></f7-icon></f7-link>
              </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <div style="text-align: center;">
              <img src="http://lorempixel.com/200/200/" style="border-radius: 50%; max-width:150px; border: 4px solid #007aff" alt="">
              <h1 class="color-blue">{{worker.name}}</h1>
            </div>
          </f7-block>
          <f7-block-title>概要情報</f7-block-title>
          <f7-list>
              <f7-list-item>
                  <a href="tel:900" class="external">900</a>
                  <f7-icon f7="phone" class="color-blue" slot="media"></f7-icon>
              </f7-list-item>
              <f7-list-item>
                  <a :href="'mailto:'+worker.email" class="external">{{worker.email}}</a>
                  <f7-icon f7="email" class="color-blue" slot="media"></f7-icon>
              </f7-list-item>
              <f7-list-item :title="worker.address">
                  <f7-icon f7="world" class="color-blue" slot="media"></f7-icon>
              </f7-list-item>
          </f7-list>
          <f7-list>
              <f7-list-item :link="'/task/' + worker.id" title="進捗状況">
                  <f7-icon f7="favorites" class="color-blue" slot="media"></f7-icon>
              </f7-list-item>
          </f7-list>
      <f7-popup id="demo-popup">
         <f7-list form id="my-form">
              <f7-list-item>
               <div>
                  <label for="">Name: </label>
                  <f7-input type="text" :value="worker.name"/>
               </div>
              </f7-list-item>
               <f7-list-item>
               <div>
                  <label for="">Japanese Name: </label>
                  <f7-input type="text" :value="worker.name_jp"/>
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Birthday: </label>
                  <f7-input type="text" :value="worker.birthday"/>
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Address: </label>
                  <f7-input type="text" :value="worker.address"/>
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Passport: </label>
                  <f7-input type="text" :value="worker.number_passport"/>
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Company: </label>
                  <f7-input type="text" :value="worker.company"/>
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Gender: </label>
                  <f7-input type="text" :value="(worker.sex == 1) ? 'Male' : 'Female'"/>
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Facebook: </label>
                  <f7-input type="text" :value="worker.facebook"/>
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Started Working: </label>
                  <f7-input type="text" :value="worker.date_start"/>
               </div>
              </f7-list-item>
        <f7-buttons >
                <f7-button big fill class="button col-50" close-popup color="blue">Cancel</f7-button>
                <f7-button big fill class="button col-50" @click="createTask()" color="green">Confirm</f7-button>
            </f7-buttons>
      </f7-list>
    </f7-popup>
      </f7-page>    

  </template>
<script>
 import {cf} from './../../main.js';
  export default{
    data: function(){
     return{
       worker: []
     }
    },
    methods:{
      fetchAWorker(){
          var self = this;
          this.$http.post((cf.serverURL+ 'edit-user'),{created_by: localStorage.getItem('id'), token: localStorage.getItem('token'), user_id:this.$route.params.id})
          .then(
            function(res){
              if(res.body.ok){
                this.worker = res.body.results;
              }
            },
            function(res){
              alert("error")
            }
          )
      }
    },
    created: function(){
      this.fetchAWorker();
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
  .buttons-row{
    margin: 8% 0 ;
    padding: 0 20px;
    text-align: center;
  }
  .buttons-row > a{
    text-align: center;
  }
</style>