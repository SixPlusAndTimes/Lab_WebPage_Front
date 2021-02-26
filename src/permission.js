import router from "./router";

// 路由判断登录 根据路由配置文件的参数
router.afterEach((to) => {
    if(to.path.substring(0, 6) === "/admin"){
     document.title = "后台管理";
  }
  else{
     document.title = "徐州大学计算机网络与人工智能研究室";
  }
})

router.beforeEach((to, _from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    const token = localStorage.getItem("token");
    // console.log("token:\n" + token);

    if (token) { // 判断当前的token是否存在 ； 登录存入的token
      // eslint-disable-next-line no-empty
      if (to.path === '/login') {
      }
      else {
        next();
      }
    }
    else {
      next({
        path: '/login'
      });
    }
  }
  else {
    next();
  }
})