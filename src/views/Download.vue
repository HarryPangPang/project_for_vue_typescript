<template>
  <div class="download__container">
    <h1 class="title">{text_download_title}</h1>
    <p class="subtitle">{text_download_apk_client}</p>
    <p class="subtitle secondary">{text_download_sub}</p>

    <h1 class="title secondary">{text_download_for_android}</h1>
    <div class="btn btn__download">
      <span>{text_download_apk}</span>
      <img class="ico ico__android" src="../assets/images/ico-android.png" alt="" />
    </div>
    <p class="subtitle secondary mini">
      {text_download_beta_version}
    </p>
    <hr />
    <div class="btn btn__find">
      <div>
        <p>{text_download_find_bug}</p>
        <h3>Get Diamond</h3>
      </div>
      <img src="../assets/images/ic_navigate_next_48px.svg" alt="" />
    </div>
    <hr />
    <h1 class="title tertiary">FAQ</h1>
    <div class="accordion__container">
      <!-- QA list -->
      <div class="accordion__child" v-for="(item, index) in [0, 1, 2]" :key="index">
        <p class="accordion__content">Q : {el.question}</p>
        <div class="accordion__arrow ratate">
          <img src="../assets/images/ic_navigate_next_48px.png" alt="" />
        </div>
        <div class="accordion__collapse">
          <span>A : {el.answer}</span>
        </div>
      </div>
    </div>
    <div class="group__button">
      <router-link to="profile" class="btn btn__profile">
        <span>{text_your_profile}</span>
        <img className="ico ico__profile" src="../assets/images/ico-profile.png" alt="" />
      </router-link>
      <div class="btn btn__bug" @click="goReport">
        <span>{text_report_bug}</span>
        <img class="ico ico__bug" src="../assets/images/ico-bug.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Download extends Vue {
  goReport() {
    this.$router.push('report');
  }

  created() {}
}
</script>
<style lang="scss" scoped>
.download {
  $self: &;
  $ico: ".ico";
  $btn: ".btn";
  $acc: ".accordion";
  &__container {
    width: 100%;
    position: relative;
    background: url("../assets/images/bg-main-trans.png") no-repeat top center;
    background-size: 100%;
    margin: 15% auto 0;
    color: #112e41;
    text-align: center;
    @media screen and (orientation: landscape) {
      margin-top: 5%;
    }
    .title {
      // margin-top: 20%;
      font-family: Bahnschrift;
      font-weight: normal;
      font-size: 12vw;
      &.secondary {
        font-size: 5vw;
        font-family: RobotoBold;
        color: $green;
        margin-top: 15%;
      }
      &.tertiary {
        margin: 15% auto;
        font-size: 5vw;
      }
      @media screen and (orientation: landscape) {
        font-size: 6vw;
        &.secondary {
          margin-top: 10%;
          font-size: 3vw;
        }
        &.tertiary {
          margin-top: 10%;
          margin-bottom: 10%;
          font-size: 3vw;
        }
      }
    }
    .subtitle {
      // margin: 5% 0 15%;
      font-family: Bahnschrift;
      font-weight: normal;
      margin-top: 5%;
      font-size: 4.75vw;
      &.secondary {
        padding: 0 9vw;
        margin-top: 1%;
        font-size: 3.5vw;
        font-family: RobotoBold;
        color: #727272;
      }
      &.mini {
        margin-bottom: 15%;
        padding: 0;
      }
      span {
        color: $yellow;
      }
      @media screen and (orientation: landscape) {
        font-size: 3vw;
        &.secondary {
          font-size: 2.5vw;
        }
        &.mini {
          margin-bottom: 10%;
        }
      }
    }
    hr {
      max-width: 50%;
      border-width: 0.5px;
      margin: 0 auto;
      border-color: #727272;
    }
    #{ $btn }__find {
      font-family: Bahnschrift;
      font-weight: normal;
      font-size: 5vw;
      background-color: #27b1ee;
      padding: 6vw 4vw;
      border-radius: 2px;
      color: white;
      width: 80%;
      margin: 15% auto;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
      }
      h3 {
        font-size: 6.5vw;
        color: $yellow;
      }
      #{ $ico }__arrow {
        width: 12.5%;
      }
    }
    #{ $btn }__download {
      font-family: Bahnschrift;
      font-weight: normal;
      font-size: 5vw;
      background-color: $green;
      padding: 3vw 4vw;
      border-radius: 2px;
      color: white;
      width: 65%;
      margin: 2.5% auto 0;
      #{ $ico }__android {
        width: 12.5%;
      }
      &.off {
        filter: grayscale(1);
      }
      @media screen and (orientation: landscape) {
        padding: 3vw 4vw;
        width: 50%;
      }
    }
    #{ $btn }__profile {
      font-family: Bahnschrift;
      font-weight: normal;
      font-size: 4.5vw;
      background-color: #734825;
      padding: 6vw 8vw;
      border-radius: 2px;
      color: #fce3c5;
      width: 50%;
      text-decoration: none;
      #{ $ico }__profile {
        width: 20%;
      }
    }
    #{ $btn }__bug {
      font-family: Bahnschrift;
      font-weight: normal;
      font-size: 4.5vw;
      background-color: #de2a42;
      padding: 6vw 8vw;
      border-radius: 2px;
      color: #fbb2bc;
      width: 50%;
      #{ $ico }__bug {
        width: 20%;
      }
      &.off {
        filter: grayscale(1);
      }
    }
    #{ $acc }__container {
      color: #727272;
      text-align: left;
      font-family: RobotoBold;
      width: 100%;
      margin-bottom: 7.5%;
      #{ $acc }__child {
        padding: 5vw 10%;
        color: #c5c5c5;
        border-top: 0.5px solid $grey;
        border-bottom: 0.5px solid $grey;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        font-size: 3.5vw;
        position: relative;
        overflow-y: hidden;
        transition: all 0.3s ease;
        // transition: max-height 0.7s linear;
        @media screen and (orientation: landscape) {
          font-size: 2.5vw;
        }
        &:nth-of-type(2),
        &:nth-of-type(4) {
          border: none;
        }
        &:nth-of-type(4) {
          border-bottom: 0.5px solid $grey;
        }
        #{ $acc }__content {
          flex-basis: 80%;
          font-size: 3.5vw;
          margin-top: 0;
          @media screen and (orientation: landscape) {
            font-size: 2.5vw;
          }
        }
        #{ $acc }__arrow {
          // transform: rotate(180deg);
          flex-basis: 10%;
          position: absolute;
          right: 10%;
          top: 50%;
          transform: translateY(-50%) rotate(180deg);
          // bottom: 0;
          &.rotate {
            transform: translateY(-50%) rotate(0deg);
          }
        }
        #{ $acc }__collapse {
          overflow: hidden;
          // min-height: 20vw;
          max-height: 20vw;
          flex-basis: 80%;
          transition: max-height 0.15s ease-out;
          display: flex;
          align-items: center;
          margin-top: 5%;
        }
      }
    }
    .group {
      &__button {
        display: flex;
      }
    }
  }
}
</style>
