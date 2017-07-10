<template id="list-user">
    <f7-page>
      <f7-navbar back-link="Back" title="Worker List" sliding>
      </f7-navbar>
      <f7-fab @click="addWorker()" >
        <f7-icon f7="add"></f7-icon>
      </f7-fab>
      <f7-list media-list contacts>
          <f7-list-item group-title></f7-list-item>
          <f7-list-item
			    media="<img src='http://lorempixel.com/200/200/' style='max-width:48px'>"
          v-for="worker in workers"
          :title="worker.name"
			    v-bind:link="'/worker/' + worker.id+ '/'"
			    subtitle="Worker"
			  >
			</f7-list-item>
      </f7-list>
        <f7-popup id="demo-popup" no-navbar>
            <f7-list form id="my-form">
              <f7-list-item>
               <div>
                  <label for="">Email: </label>
                  <f7-input name="email" type="text"/>
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Name: </label>
                  <f7-input name="name" type="text"/>
               </div>
              </f7-list-item>
               <f7-list-item>
               <div>
                  <label for="">Japanese Name: </label>
                  <f7-input name="jname" type="text" />
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Birthday: </label>
                  <f7-input name="birthday" type="text"/>
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Address: </label>
                  <f7-input name="address" type="text"/>
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Passport: </label>
                  <f7-input name="passport" type="text" />
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Company: </label>
                  <f7-input name="company" type="text" />
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Gender: </label>
                  <f7-list-item radio inline name="gender" value="0" title="Female" checked></f7-list-item>
                  <f7-list-item radio inline name="gender" value="1" title="Male"></f7-list-item>
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Facebook: </label>
                  <f7-input name="facebook" type="text" />
               </div>
              </f7-list-item>
              <f7-list-item>
               <div>
                  <label for="">Started Working: </label>
                  <f7-input name="start" type="text" />
               </div>
              </f7-list-item>
            </f7-list>
            <f7-buttons>
                <f7-button big fill class="button col-50" close-popup color="blue">Cancel</f7-button>
              <f7-button big fill class="button col-50" color="green" @click="submit()">Confirm</f7-button>
            </f7-buttons>
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
       workers: []
      }
    },
    methods: {
      fetchWorker(){
        var self = this;
        this.$http.post((cf.serverURL+ 'list-user'),{
          created_by: localStorage.getItem('id'), 
          token: localStorage.getItem('token')
        },
        {
          timeout: 15000
        })
        .then(
          function(res){
            if(res.body.ok){
              this.workers = res.body.results;
            }
          },
          function(res){
            myApp.hideIndicator();
            self.$f7.alert("Could not connect, pls try again!");
          }
        )
      },
      submit(){
        var self = this;
        var formData = myApp.formToData('#my-form');
        this.$http.post(cf.serverURL + 'create-user',
          {
            email: formData.email,
            name: formData.name,
            name_jp: formData.jname,
            birthday: formData.birthday,
            address: formData.address,
            number_passport: formData.passport,
            company: formData.company,
            sex: formData.gender,
            facebook: formData.facebook,
            date_start: formData.start,
            created_by: localStorage.getItem('id'),
            token: localStorage.getItem('token')
          }
        ).then(
          function(res){
            self.$f7.views.main.router.refreshPage();
            myApp.closeModal('#demo-popup');
            self.$f7.alert("Created Successfully","Create User");
          },
          function(res){
            console.log(res);
          }
        )
      },
      addWorker(){
          myApp.popup('#demo-popup');
      }
    },
    created: function(){
      myApp.showIndicator();
      this.fetchWorker();
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
  .buttons-row{
    margin: 8% 0 ;
    padding: 0 20px;
    text-align: center;
  }
  .buttons-row > a{
    text-align: center;
  }
</style>