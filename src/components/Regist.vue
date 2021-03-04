<template>
  <div>
    <cube-form :model="model" :schema="schema" @submit="submitHandler"></cube-form>
    <p>
      已有账号，去
      <router-link to="/login" style="color:red">登录</router-link>
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
            label: "注册"
          }
        ]
      }
    };
  },
  methods: {
    showBtn(goOrBack) {
       this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-question',
        title: '注册成功',
        content: '登陆后可标记该厕所',
        confirmBtn: {
          text: '马上登陆',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '稍后再说',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {          
          this.$router.push(goOrBack)
        },
        onCancel: () => {
           this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '登陆可体验标记功能哦'
          }).show()
        }
      }).show();
    },
     showClose(text) {
      this.$createDialog({
        type: 'alert',
        icon: 'cubeic-alert',
        showClose: true,
        title: text,
        onClose: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '点击关闭按钮'
          }).show()
        }
      }).show()
    },
    submitHandler(e) {
      //阻止表单提交
      e.preventDefault(),
      console.log(e.target[0].value);
      console.log(e.target[1].value);
      this.getValue(e.target[0].value,e.target[1].value);
    },

    getValue(username,password) {
      // axios.get('/', {params: ''})
      this.$axios.get('/api/getValue', {
        params: {username:username }
      }).then( (res) => {
        console.log('gres', res);
        if(res.data[0]){
            // alert('用户名已存在')
            this.showClose('用户名已存在')
            return;
        }
        // 先查询后添加
        this.setValue(username,password);
      })
    },
    setValue(username,password) {
      // axios.post('/', {})
      this.$axios.post('/api/setValue', {
        username: username, password: password
      }).then( (res) => {
        console.log('pres', res);
      })
      // alert('注册成功，去登录->')
      this.showBtn('/login')
    }
  }
};
</script>

<style  scoped>
p {
  font-size: 14px;
  padding: 20px;
  text-align: right;
}
</style>
