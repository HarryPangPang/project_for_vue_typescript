<template>
<div class="ws-header-block">
     <div class="ws-header-wrap" v-if="back || title">
      <div @click="()=>{EvtLeft() || goBack()}" :class="{'no-background':!back&&!picknWin}">
          <!-- back -->
          <template v-if="back">
            <div class="back">
                <i class="back-icon"></i>
                <span>{{back}}</span>
            </div>
          </template>
          <!--  picknWin-->
          <template v-if="picknWin">
              <div class="pickn-win">
                  <i class="pickn-win-icon"></i>
                  <span>{{picknWin}}</span>
              </div>
          </template>
      </div>
      <!-- 标题内容 -->
      <div class="content" v-if="title.length>0">
          <!-- <span> -->
              <span  class="title" :class="{'lineheingt0':isIOS}">{{title}}
                  <slot name="contentIcon"></slot>
              </span>

              <span class="question" v-if="question" @click="EvtQuestion"></span>
      </div>
      <div v-if="rightShow==='id'" class="just-id">
                    <span class="title">ID:{{userInfo.uid||'--'}}</span>
        </div>
      <!-- uid和金币 -->
      <div class="user-info" v-if="userInfo">
           <template v-if="rightShow==='diamond'">
                <div class="user-doller">
                    <i class="user-doller-icon"></i>
                    <span>{{userInfo.gems|| 0}}</span>
                </div>
                <div class="user-id">
                    <span>ID:{{userInfo.uid||'--'}}</span>
                </div>
           </template>
           <template v-if="rightShow==='ticket'">
               <div class="user-ticket">
                    <i class="user-doller-icon"></i>
                    <span>{{userInfo.ticket|| 0}}</span>
                </div>
           </template>
      </div>
  </div>
</div>

</template>

<script lang="ts">
import {
  Component, Prop, Vue, PropSync, Watch, Emit,
} from 'vue-property-decorator';

@Component({
  name: 'HaHeader',
})

export default class HaHeader extends Vue {
    isIOS:boolean = false;

    @Prop() rightShow?:string

    @Prop() title?:string

    @Prop() picknWin?:string

    @Prop() back?:string

    @Prop() question?:boolean

    @Prop() userInfo?:object

    @Prop() EvtQuestion?:Function

    @Prop() EvtLeft?:Function

    goBack() {
      this.$router.go(-1);
    }
}
</script>

<style lang="scss" scoped>
.ws-header-block{
    color: #212121;
    position: static;
    width: 100vw;
    background-repeat: no-repeat;
    background-size:100% auto;
    height:74px;
    // transform:scale(1);
    .ws-header-wrap{
        font-family: 'Bangers', cursive;
        // display: flex;
        text-align: center;
        width: 100%;
        position: relative;
        top: 0;
        z-index: 2;
        height: 100%;
        .no-background{
            background:none !important;
        }
        .user-info{
            font-family: Teko-Regular;
            position: absolute;
            top: 50%;
                margin-top:-32px;
                right:40px;
                height:45px;
            color: #9b9390;
        }
         .user-doller{
            // position: absolute;
            text-align: left;

                line-height:27px;
                font-size:36px;
                padding-left:12px;
            span{
                display: inline-block;
            }
            .user-doller-icon{
                background-repeat: no-repeat;
                display: inline-block;
                top: 50%;
                    width:25px;
                    height:25px;
                    margin-top:-15px;
                    background-size:25px;
                    left:20px;
            }
        }
        .user-ticket{
            background-color: #c0c0c0;
            right: 0;
            // position: absolute;
            text-align: left;
            font-family: 'Bebas Neue';
                padding-right:30px;
                height:51px;
                line-height:51px;
                font-size:33px;
                padding-left:12px;
                margin-left:20px;
                margin-top:10px;
            span{
                display: inline-block;
                transform: skew(-45deg);
            }
            .user-doller-icon{
                // background: url('../../assets/images/ticket.png') no-repeat;
                display: inline-block;
                transform: skew(-45deg);
                top: 50%;
                vertical-align: middle;
                    width:42px;
                    height:42px;
                    margin-top:-8px;
                    background-size:42px;
                    margin-left:15px;
                    left:20px;
            }
        }
         .user-id{
            text-align: left;
            font-family: ArialMT;
            width: fit-content;
            float: right;
                right:-33px;
                height:20px;
                line-height:27px;
                font-size:20px;
            span{
                display: inline-block;
                padding-left:40px;
            }
        }
        .just-id{
            position: absolute;
            top: 0;
            color: #cbb988;
            right:33px;
                height:74px;
                line-height:74px;
                font-size:20px;
        }
        .pickn-win{
            background-image: linear-gradient(0deg,#ff4040 0%,#ffa400 100%);
            transform: skew(45deg);
            left: 0;
            text-align: left;
            box-shadow: px2vw(-4px) px2vw(7px) 0px 0px rgba(17, 17, 17, 0.54);
                padding-right:40px;
                height:52px;
                line-height:55px;
                font-size:34px;
                margin-top:10px;
                margin-right:20px;
            span{
                display: block;
                transform: skew(-45deg);
                padding-left:90px;
            }
            .pickn-win-icon{
                position: absolute;
                // background: url('../../assets/images/pickn-win-icon.png') no-repeat;
                display: inline-block;
                transform: skew(-45deg);
                top: 50%;
               width:39px;
                    height:34px;
                    margin-top:-15px;
                    background-size:39px;
                    left:40px;
            }
        }
        .back{
            background-color: #ffa400;
            transform: skew(45deg);
            // position: relative;
            left: 0;
            text-align: left;
                padding-right:40px;
                height:79px;
                line-height:79px;
                font-size:34px;
            span{
                // position: absolute;
                display: block;
                transform: skew(-45deg);
                padding-left:100px;
            }
            .back-icon{
                position: absolute;
                // background: url('../../assets/images/back.png') no-repeat;
                display: inline-block;
                transform: skew(-45deg);
                top: 50%;
                 width:50px;
                    height:38px;
                    margin-top:-15px;
                    background-size:38px;
                    left:40px;
            }
        }
        .content{
            color: #3f332c;
            // background: linear-gradient(top,rgb(39,215,255),#fff);
            // background: -webkit-linear-gradient(top,rgb(39,215,255),#fff);
            // -webkit-background-clip: text;
            // color: transparent;
            // left: 0;
            // display: inline-flex;
            position: relative;
             height:74px;
                line-height:74px;
                font-size:60px;
            .lineheingt0{
                line-height: 0;
            }
            .title{
                display: inline-block;
                transform: skew(-5deg);
                // line-height: 0;

            }
            .question{
                display: inline-block;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                    width:36px;
                    height:36px;
                    margin-left:10px;
            }
            i{
                font-size: 32px;
                display: inline-block;
                color: #dbdbdb;
                background-color: #212121;
                text-align: center;
                vertical-align: middle;
                    width:32px;
                    line-height: 40px;
                    height:32px;
                    border-radius:32px;
                    margin-left:12px;
            

            }
        }
    }

};


</style>
