<template>
  <div class="butt">
    <div style="width:30%;margin:0 auto;padding:3em 0"><img style="width:100%;" src="../assets/images/titlogo.png"></div>
    <div style="padding:0 1em;">
      <div style="position:relative;margin-bottom:3%;">
        <div class="pos postwo"><img style="width:100%;" src="../assets/images/yinhang.png"></div>
        <x-button style="background-color: #FF4948;font-size: 16px;color:#fff;" link='/add_card'>添加银行卡</x-button>
      </div>
      <div style="position:relative">
        <div class="pos posone"><img style="width:100%;"src="../assets/images/zhifubao.png"></div>
        <x-button link='/add_zhifubao' style="background-color: #FF4948;font-size: 16px;color:#fff;text-indent: 11%;">添加支付宝账户</x-button>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {Cell,Group,XButton} from "vux"
  import http from '../ajax.js'
    export default {
      components:{
        Cell,
        Group,
        XButton
      },
      data(){
        return {
          pageHeader:true,
          bg:{white:false,grey:true},
          pageName:"添加收款账户",
          bg:{white:false,grey:true},
        }
      },
      mounted:function(){

      },
      methods:{

      },
      mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pos{
    position: absolute;
    width: 5%;
  }
  .posone{
    top: 25%;
    left: 30%;
    z-index: 999;
    margin-right: 2%
  }
  .postwo{
    top: 22%;
    left: 35%;
    z-index: 999;
    margin-right: 2%
  }
  .butt .weui-btn{
    /*padding-left: 5% !important;*/
    text-indent: 10%;
  }
</style>
