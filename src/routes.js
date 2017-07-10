export default[
	{
	    path: '/about/',
	    component: require('./components/pages/About.vue')
  	},
  	{
  		path: '/list-worker/',
	    component: require('./components/pages/ListWorker.vue')
  	},
  	{
  		path: '/my-profile/:id',
	    component: require('./components/pages/MyProfile.vue')
  	},
  	{
  		path: '/worker/:id',
  		component: require('./components/pages/Worker.vue')
  	},
  	{
  		path: '/task/:id',
  		component: require('./components/pages/Task.vue')
  	},
    {
      path: '/detail-task/:id',
      component: require('./components/pages/DetailTask.vue')
    },
    {
      path:'/notification/',
      component: require('./components/pages/Notification.vue')
    },
    {
      path: '/timeline/',
      component: require('./components/pages/Timeline.vue')
    }

 ]