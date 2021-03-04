<template>
    <div class="title">
        <span class='back' @click="back"></span>
        <span class='backText'>返回</span>
        <div class='text'>{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"navgater",
    props:['title'],
    data(){
        return{}
    },
    methods:{
        back(){
            this.$router.go(-1);
        }
    },
}
</script>

<style scoped>
.title{
    position:fixed;
    top:7vh;
    width:100%;
    height:5vh;
    background: #fff;
    z-index: 999;
    box-shadow:0 0  2px 2px #ccc;
    box-sizing: border-box;
}
.back{
    background:url('../../../static/img/back.png') no-repeat;
    position:absolute;
    top:0.5vh;
    color:#666;
    display:inline-block;
    width:16vw;
    height:4vh;
    background-size:contain;
    z-index: 999;

}
.text{
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
}
.backText{
    position: absolute;
    top: 1.5vh;
    left: 8vw;
    display: inline-block;
    height:100%;
}
</style>