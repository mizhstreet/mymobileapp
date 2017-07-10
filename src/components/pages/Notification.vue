<template id="list-user">
    <f7-page pull-to-refresh @ptr:refresh="onRefresh">
      <f7-navbar back-link="Back" title="Task List" sliding></f7-navbar>
      <f7-fab color="blue" link="/about/">
        <f7-icon f7="add"></f7-icon>
      </f7-fab>
      <f7-list media-list>
              <f7-list-item swipeout  
              title="Công việc"
              link="/detail-task/"
              subtitle="Bùi Tuấn Minh"
              text="20/3/2018"
              >
              <f7-swipeout-actions>
              <f7-swipeout-button delete>Delete</f7-swipeout-button>
              <f7-swipeout-button delete class="no-background">Confirm</f7-swipeout-button>
            </f7-swipeout-actions>
              </f7-list-item>
              <f7-list-item swipeout  
              title="Công việc"
              link="/detail-task/"
              subtitle="Bùi Tuấn Minh"
              text="20/3/2018"
              >
              <f7-swipeout-actions>
              <f7-swipeout-button delete>Delete</f7-swipeout-button>
              <f7-swipeout-button delete class="no-background">Confirm</f7-swipeout-button>
            </f7-swipeout-actions>
              </f7-list-item>
              <f7-list-item swipeout  
              title="Công việc"
              link="/detail-task/"
              subtitle="Bùi Tuấn Minh"
              text="20/3/2018"
              >
              <f7-swipeout-actions>
              <f7-swipeout-button delete>Delete</f7-swipeout-button>
              <f7-swipeout-button delete class="no-background">Confirm</f7-swipeout-button>
            </f7-swipeout-actions>
              </f7-list-item>          
      </f7-list>
    </f7-page> 
 </template>
 <script>
  export default{
    methods: {
      onRefresh: function (event, done) {
        var self = this;
        setTimeout(function () {
          
          done();
        }, 2000);
      }}
  }
 </script>
 <style scoped>
   .swipeout-delete{
      background: none !important;
      border: 1px solid #ff3b30 !important;
      color: red !important;   
   }
   .no-background{
      background: none !important;
      border: 1px solid   #007aff;
      color: #007aff !important;
   }
 </style>