<template>
  <div>
    <cube-form :model="model" :schema="schema" @submit="submitHandler"></cube-form>
    <p>
      没有账号？，去
      <router-link to="/regist" style="color:red">注册</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //model 就是整个表单需要的数据源
      model: {
        username: "",
        password: ""
      },
      //schema 就是生成表单所定义的模式
      schema: {
        fields: [
          //用户名配置
          {
            type: "input",
            modelkey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              //校验规则
              required: true,
              type: "string",
              min: 3,
              max: 15
            },
            //失去焦点后检测
            trigger: "blur",
            messages: {
              required: "用户名不能为空",
              min: "用户名不能小于3个字符",
              max: "用户名不能大于15个字符"
            }
          },
          //密码配置
          {
            type: "input",
            modelkey: "password",
            label: "密码",
            props: {
              placeholder: "请输入密码",
              type: "password",
              eye: {
                open: false
              }
            },
            rules: {
              //校验规则不能为空
              required: true
            },
            //失去焦点后检测
            trigger: "blur"
          },
          //按钮配置
          {
            type: "submit",
            label: "登录"
          }
        ]
      }
    };
  },
  methods: {
    showAlert(text,text1) {
      this.$createDialog({
        type: "alert",
        title: text,
        content: text1,
        icon: "cubeic-alert"
      }).show();
    },
    showBtn(go,back) {
       this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-question',
        title: '登陆成功',
        content: '欢迎使用厕所吧',
        confirmBtn: {
          text: '去首页看看',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '返回我的',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {          
          this.$router.push(go)
        },
        onCancel: () => {
          this.$router.push(back)
        }
      }).show();
    },


    // 查询数据库的代码
    getValue(username, password) {
      // axios.get('/', {params: ''})
      this.$axios
        .get("/api/getValue", {
          params: { username: username }
        })
        .then(res => {
          console.log("gres", res);
          if (!res.data[0]) {
            // alert("用户名不存在！！！");
            this.showAlert("登录失败","用户名不存在");

            return;
          } else if(res.data[0].password === password){
            // alert("登录成功");
            this.showBtn("/","/myself");
            localStorage.setItem("username",username);
          }else{
            // alert('密码错误，请重新输入')
            this.showAlert("登录失败","密码错误，请重新输入");
          }
          // 先查询后添加
        });
    },
    submitHandler(e) {
      //阻止表单提交
      e.preventDefault(), this.getValue(e.target[0].value, e.target[1].value);
    }
  }
};
</script>

<style scoped>
p {
  font-size: 14px;
  padding: 20px;
  text-align: right;
}
</style>