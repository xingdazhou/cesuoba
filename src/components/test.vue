<template>
  <div class>
    <p>
      <input type='text' v-model="username" style="border:1px solid #000"/>
      <input type='text' v-model="password" style="border:1px solid #000"/>
    </p>
    <button @click="getValue">获取数据</button>
    <button @click="setValue">添加数据</button>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    getValue() {
      // axios.get('/', {params: ''})
      this.$axios.get('/api/getValue', {
        params: {username:this.username }
      }).then( (res) => {
        console.log('res', res);
        this.username = res.data[0].username;
        this.password = res.data[0].password;
      })
    },
    setValue() {
      // axios.post('/', {})
      this.$axios.post('/api/setValue', {
        username: this.username, password: this.password
      }).then( (res) => {
        console.log('res', res);
      })
    }
  }
}
</script>