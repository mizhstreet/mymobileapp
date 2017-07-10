<template>
  <!-- App -->
  <div id="app">
    <!-- Statusbar -->
    <!-- NOTE: You may need to comment out the next line depending on what device you're running on and see the app title cut off -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left layout="dark">
      <f7-view id="left-panel-view" navbar-through :dynamic-navbar="true">
        <f7-navbar title="Bảng điều khiển"></f7-navbar>
        <f7-pages>
          <f7-page>
            <f7-list>
              <f7-list-item title="Hồ sơ của tôi" :link="'/my-profile/' + getId()" link-close-panel link-view="#main-view"><f7-icon slot="media" f7="person"></f7-icon></f7-list-item>                    
              <f7-list-item v-if="isCompany" link="/list-worker/" title="Danh sách công nhân" link-close-panel link-view="#main-view"><f7-icon slot="media" f7="persons"></f7-icon></f7-list-item>
              <f7-list-item v-if="!isCompany" link="/timeline/" title="Danh sách công việc" link-close-panel link-view="#main-view"><f7-icon slot="media" f7="timeline"></f7-icon></f7-list-item>
<!--               <f7-list-item link="/notification/" title="Notification" link-view="#main-view" link-close-panel><f7-icon slot="media" f7="bell"></f7-icon><f7-badge color="red">5</f7-badge></f7-list-item> -->
              <f7-list-item v-if="isCompany" link="/form/" title="Help Request" link-view="#main-view" link-close-panel><f7-icon slot="media" f7="help"></f7-icon></f7-list-item>
              <f7-list-item link="/about/" title="Thông tin ứng dụng" link-view="#main-view" link-close-panel><f7-icon slot="media" f7="info"></f7-icon></f7-list-item>
              <f7-list-item link="/#/" link-open-login-screen="#logmein" @click="signOut()" title="Đăng xuất" link-view="#main-view" link-close-panel id="logmeout"><f7-icon slot="media" f7="logout"></f7-icon></f7-list-item>
            </f7-list>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-panel>
    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- Navbar -->
        <f7-navbar>
          <f7-nav-left>
            <f7-link icon="icon-bars" open-panel="left"></f7-link>
          </f7-nav-left>
          <f7-nav-center sliding>Màn hình quản lí</f7-nav-center>
        </f7-navbar>
        <!-- Pages -->
        <f7-pages>
          <f7-page>
            <f7-block>
              <div style="text-align: center;">
                <img src="./img/pic.jpg" style="border-radius: 50%; max-width:150px; border: 4px solid #11B771" alt="">
              </div>
            </f7-block>
            <f7-grid>
              <f7-col width="50" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
               <f7-link :href="'/my-profile/' + getId()" class="color-black">
                  <f7-icon if-ios="f7:person" if-material="material:person" size="50px"></f7-icon>
                 <div class="icon-name">Hồ sơ cá nhân</div>
               </f7-link>
              </f7-col>
              <f7-col width="50" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
               <f7-link color="black" href="/timeline/">
                  <f7-icon if-ios="f7:timeline" if-material="material:timeline" size="50px"></f7-icon>
                  <div class="icon-name">Danh sách công việc</div>
               </f7-link>
              </f7-col>
            </f7-grid>
            <f7-grid>
              <!-- <f7-col width="50" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
                <f7-link color="black" href="/notification/">
                  <f7-icon if-ios="f7:bell" if-material="material:bell" size="50px"></f7-icon>
                <div class="icon-name">Notification</div>
                </f7-link>
              </f7-col> -->
              <f7-col width="50" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
                <f7-link href="/about/" color="black">
                  <f7-icon if-ios="f7:info" if-material="material:info" size="50px"></f7-icon>
                <div class="icon-name">Thông tin ứng dụng</div>
                </f7-link>
              </f7-col>
              <f7-col width="50" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
                <f7-link color="black" open-login-screen="#logmein" @click="signOut()">
                  <f7-icon if-ios="f7:logout" if-material="material:logout" size="50px"></f7-icon>
                  <div class="icon-name">Đăng xuất</div>
                </f7-link>
              </f7-col>
            </f7-grid>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-views>
    <!-- Login Screen -->
    <f7-login-screen id="logmein">
      <f7-view>
        <f7-pages>
          <f7-page login-screen>
            <f7-login-screen-title class="color-blue">LOGIN</f7-login-screen-title>
            <f7-block style="padding:0 10px;">
                <f7-block style="text-align: center">
                  <img src="./img/blue-location-icon-png-19.png" style="margin-top: 20%; max-width: 150px;" alt="">
                </f7-block>
                <f7-list form>
                  <f7-list-item>
                    <f7-icon slot="media" f7="person"></f7-icon>
                    <f7-input name="username" id="login-email" placeholder="Email" type="text"></f7-input>
                  </f7-list-item>
                  <f7-list-item>
                    <f7-icon slot="media" f7="lock"></f7-icon>
                    <f7-input name="password" id="login-password" type="password" placeholder="Password"></f7-input>
                  </f7-list-item>
                   <f7-list-item class="small" checkbox name="my-checkbox" value="1" title="Remember Me"></f7-list-item>
                </f7-list>
                <f7-button id="login-btn" @click="signIn()" raised round fill big >Login</f7-button>
              </f7-block>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-login-screen>
  </div>
</template>
<script>
var myApp = new Framework7();
var $$ = Dom7;
import {cf} from './main.js';
export default{
  data: function(){
    return{
        isCompany: true
    }
  },  
  methods: {
    signIn(){
      var self = this;
      myApp.showPreloader("Logging in");
      this.$http.post(cf.serverURL+'login',{
        email: $$('#login-email').val(), 
        password: $$('#login-password').val()
      },
      {
        timeout: 15000
      })
      .then(
        function(res){

          if(res.body.ok){
            localStorage.setItem('id',res.body.results.id);
            localStorage.setItem('token',res.body.results.token);
            localStorage.setItem('type', res.body.results.type);
            if(localStorage.getItem('type') == 3){
              this.isCompany = false;
            }
            self.$f7.views.main.router.refreshPage();
            myApp.closeModal();
            myApp.hidePreloader();
          }
          else{
            self.$f7.alert(res.body.serror);
          }
        },
        function(res){
          myApp.hidePreloader();
          self.$f7.alert("Could not connect, pls try agagin");
        }
      )
    },
    signOut(){
      myApp.openModal('.login-screen');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('type');
    },
    getId(){
      return localStorage.getItem('id');
    },
    checkLogin(){
       if(localStorage.getItem('id') === null || localStorage.getItem('token') === null){
         return true;
        };
    },
    checkAuth(){

    }
  },
  mounted: function(){
    if(this.checkLogin()){
      myApp.openModal('.login-screen');
    }
    if(localStorage.getItem('type') == 3){
      this.isCompany = false;
    }
  },
  updated: function(){
    myApp.hidePreloader();
  }
}
</script>
<style scoped>
  .row{
    margin: 20% 0;
  }
  .small{
    font-size:14px;
  }
</style>