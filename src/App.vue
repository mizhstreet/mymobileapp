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
              <f7-list-item style="margin:10px 0" title="プロフィール" :link="'/my-profile/' + getId()" link-close-panel link-view="#main-view"><f7-icon slot="media" f7="person"></f7-icon></f7-list-item>                    
              <f7-list-item style="margin:10px 0" v-if="isCompany" link="/list-worker/" title="従業員リスト" link-close-panel link-view="#main-view"><f7-icon slot="media" f7="persons"></f7-icon></f7-list-item>
              <f7-list-item style="margin:10px 0" v-if="!isCompany" link="/timeline/" title="仕事項目" link-close-panel link-view="#main-view"><f7-icon slot="media" f7="timeline"></f7-icon></f7-list-item>
              <f7-list-item style="margin:10px 0" v-if="!isCompany" link="/notification/" title="お知らせ" link-view="#main-view" link-close-panel><f7-icon slot="media" f7="bell"></f7-icon><f7-badge color="red">1</f7-badge></f7-list-item>
              <f7-list-item style="margin:10px 0" v-if="isCompany" link="/help-request/" title="ヘルプリクエイスト" link-view="#main-view" link-close-panel><f7-icon slot="media" f7="help"></f7-icon></f7-list-item>
              <f7-list-item style="margin:10px 0" v-if="!isCompany" link="/help/" title="ヘルプリクエイスト" link-view="#main-view" link-close-panel><f7-icon slot="media" f7="help"></f7-icon></f7-list-item>
              <f7-list-item style="margin:10px 0" link="/about/" title="Thông tin ứng dụng" link-view="#main-view" link-close-panel><f7-icon slot="media" f7="info"></f7-icon></f7-list-item>
              <f7-list-item style="margin:10px 0" link="/#/" link-open-login-screen="#logmein" @click="signOut()" title="ログアウト" link-view="#main-view" link-close-panel id="logmeout"><f7-icon slot="media" f7="logout"></f7-icon></f7-list-item>
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
                <img src="./img/pic.jpg" style="max-height:150px; max-width:150px; border: 4px solid #11B771" alt="">
              </div>
            </f7-block>
            <f7-grid>
              <f7-col width="50" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
               <div class="item-homeblock">
                  <f7-link :href="'/my-profile/' + getId()" class="color-black">
                    <f7-icon if-ios="f7:person" if-material="material:person" size="50px"></f7-icon>
                   <div class="icon-name">プロフィール</div>
                  </f7-link>
               </div>
              </f7-col>
              <f7-col width="50" v-if="!isCompany" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
                <div class="item-homeblock">
                  <f7-link color="black" href="/timeline/">
                      <f7-icon if-ios="f7:timeline" if-material="material:timeline" size="50px"></f7-icon>
                      <div class="icon-name">仕事項目</div>
                   </f7-link>
                </div>
              </f7-col>
              </f7-col>
              <f7-col width="50" v-if="isCompany" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
                <div class="item-homeblock">
                  <f7-link color="black" href="/list-worker/">
                      <f7-icon if-ios="f7:persons" if-material="material:timeline" size="50px"></f7-icon>
                      <div class="icon-name">従業員リスト</div>
                   </f7-link>
                </div>
              </f7-col>
            </f7-grid>
            <f7-grid>
              <f7-col width="50" v-if="!isCompany" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
                <div class="item-homeblock">
                  <f7-link color="black" href="/notification/">
                  <f7-icon if-ios="f7:bell" if-material="material:bell" size="50px"></f7-icon>
                  <f7-badge id="badgeNoti" color="red"></f7-badge>
                  <div class="icon-name">Notification</div>
                  </f7-link>
                </div>
              </f7-col>
              <f7-col width="50" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
                <div class="item-homeblock">
                  <f7-link :href="isCompany ? '/help-request/' : '/help/'" color="black">
                  <f7-icon if-ios="f7:help" if-material="material:help" size="50px"></f7-icon>
                  <div class="icon-name">Request</div>
                  </f7-link>
                </div>
              </f7-col>
              <f7-col width="50" v-if="isCompany" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
                <div class="item-homeblock">
                  <f7-link color="black" href="/waiting-task/">
                  <f7-icon if-ios="f7:favorites" if-material="material:favorites" size="50px"></f7-icon>
                  <div class="icon-name">Waiting Task</div>
                  </f7-link>
                </div>
              </f7-col>
            </f7-grid>
            <f7-grid>
              <f7-col width="50" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
                <div class="item-homeblock">
                  <f7-link href="/about/" color="black">
                  <f7-icon if-ios="f7:info" if-material="material:info" size="50px"></f7-icon>
                  <div class="icon-name">Thông tin ứng dụng</div>
                  </f7-link>
                </div>
              </f7-col>
              <f7-col width="50" tablet-width="50" class="homeblock" style="text-align:center" no-gutter>
                <div class="item-homeblock">
                  <f7-link color="black" open-login-screen="#logmein" @click="signOut()">
                  <f7-icon if-ios="f7:logout" if-material="material:logout" size="50px"></f7-icon>
                  <div class="icon-name">ログアウト</div>
                </f7-link>
                </div>
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
            <f7-login-screen-title class="color-blue">ログイン</f7-login-screen-title>
            <f7-block style="padding:0 10px;">
                <f7-block style="text-align: center">
                  <img src="./img/logo.png" style="margin-top: 20%; max-width: 150px;" alt="">
                </f7-block>
                <f7-list form>
                  <f7-list-item>
                    <f7-icon slot="media" f7="person"></f7-icon>
                    <f7-input name="username" id="login-email" placeholder="eメール" type="text"></f7-input>
                  </f7-list-item>
                  <f7-list-item>
                    <f7-icon slot="media" f7="lock"></f7-icon>
                    <f7-input name="password" id="login-password" type="password" placeholder="パスワード"></f7-input>
                  </f7-list-item>
                </f7-list>
                <f7-button id="login-btn" @click="signIn()" raised round fill big >ログイン</f7-button>
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
        isCompany: true,
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
            if(localStorage.getItem('type') == 2){
              this.isCompany = true;
            }
            if(localStorage.getItem('type') ==3){
                self.showNotify();
              }
            self.$f7.views.main.router.refreshPage();
            myApp.closeModal();
            myApp.hidePreloader();
          }
          else
          {
            myApp.hidePreloader();
            self.$f7.alert(res.body.serror);
          }
        },
        function(res){
          myApp.hidePreloader();
          self.$f7.alert("Could not connect, pls try agagin");
        }
      )
    },
     showNotify(){
      myApp.showPreloader();
      var self = this;
      this.$http.post(cf.serverURL + 'get-notification',{
        user_id: localStorage.getItem('id'),
        token: localStorage.getItem('token')
      })
      .then(
        function(res){
          var count = 0;
          var countSeen = 0;
          var arr = [];
          $$.each(res.body.results, function(key, value){
            if(value.status ==0 && value.type ==0){
              count++;
              arr.push(value);
            }
            else{
              countSeen++;
            }
          });
          if(countSeen == 0 && count ==0){
            $$('#badgeNoti').hide();
          }
          else{
            $$('#badgeNoti').html(countSeen + count);
          }
          function x(notf){
              myApp.addNotification({
              title: notf.ob[notf.id].title,
              subtitle: notf.ob[notf.id].created_at,
              message: notf.ob[notf.id].content,
              media: '<i class="icon icon-f7"></i>',
              hold: 3000,
              onClick: function(){
                clearInterval(loop);
                self.$http.post(cf.serverURL + 'seen-notification',{
                  user_id: localStorage.getItem('id'),
                  token: localStorage.getItem('token'),
                  notify_id: notf.ob[notf.id].id
                }).then(
                  function(res){
                    console.log(res);
                  }
                );
               self.$f7.views.main.router.loadPage(notf.ob[notf.id].link);
              },
              onClose: function(){
                // clearInterval(loop);
              }
            });
            notf.id++;
            if(notf.id == notf.ob.length){
              clearInterval(loop);
            }
          }
          if(count !=0){
            var loop = setInterval(x, 2000,{id:0, ob:arr});
          }
          self.$http.post(cf.serverURL + 'show-notification',{
            user_id: localStorage.getItem('id'),
            token: localStorage.getItem('token')
          });
          myApp.hidePreloader();
        },
        function(res){

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
    checkAuth(){
      var self = this;
        this.$http.post(cf.serverURL + 'check-login', {
          user_id : localStorage.getItem('id'),
          token: localStorage.getItem('token')
        }).then(
          function(res){
            if(!res.body.ok){
              myApp.openModal('.login-screen');
            }
            else{
              if(localStorage.getItem('type') ==3){
                self.showNotify();
              }
            }
          },
          function(res){
            self.$f7.alert("Cannot Connect","Error");
          }
        )
    }
  },
  created: function(){
    // myApp.showPreloader();
    this.checkAuth();
  },
  mounted: function(){
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
    margin: 5% 10px;

  }
  .item-content{
    margin:10px 0;
  }
  .homeblock{
  }
  .item-homeblock{
    margin: 0 auto;
    max-width: 140px;
    background-color: white;
    padding: 30px 0;
    border-radius: 8%;
  }
  .small{
    font-size:14px;
    text-align: center;
    padding-left: 15%;
  }
  .small .item-title{
    text-align: center;
    padding:0 30px;
  }
  .label-checkbox{
    text-align: center;
  }
</style>