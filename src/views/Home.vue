<template>
  <div class="home">
    <div class="home__container">
          <div class="home__heading">
            <h1>Free Fire Advanced Server Registration</h1>
            <p>{text_home_chosen_as}</p>
          </div>
          <div class="home__subheading">
            <p>Login using your Facebook account to sign-up for Free Fire Advance Server</p>
            <div
              class="btn btn__fb"
              @click="goFacebook">
              <span>Login Facebook</span>
              <img
                class="ico ico__fb"
                src='../assets/images/ico-fb.png'
                alt=""
              />
            </div>
          </div>
          <hr />
          <div class="timeline__section-title">
            <h1>Timeline</h1>
          </div>
          <div class="timeline__section">
            <table>
              <thead>
                <tr>
                  <th colSpan=2 style="text-align: center;">PLAYER REGISTRATION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class='one'>
                    <h3>First Batch</h3>
                    <p>23 - 27 November</p>
                  </td>
                  <td>
                    <h3>First Batch</h3>
                    <p>23 - 27 November</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <img
              class="arrow"
              src='../assets/images/arrow.png'
              alt=""
            />
            <table>
              <thead>
                <tr>
                  <th>ADVANCED SERVER OPENED</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="one">
                    <h3>To Be Announced</h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="home__section-title">
            <h1>Free Fire Advance Server</h1>
          </div>
          <!-- list benefit -->
          <div :key="index" :class='`home__section home__section-${index + 1}`'
           v-for="index in [0,1,2]">
            <div class='box__header' :class="{'rtl':index===1}">
              <p>{el.benefit_number}</p>
              <p>{el.benefit_title}</p>
            </div>
            <div class='box__content' :class="{'rtl':index===1}">
              <p>{el.benefit_content}</p>
            </div>
          </div>

          <div class="home__section home__section-4">
            <p>{text_home_interested}</p>
            <p>{text_home_desc_fb_2}</p>
            <div
              class="btn btn__fb"
              @click="goFacebook">
              <span>{text_home_login_fb}</span>
              <img
                class="ico ico__fb"
                src='../assets/images/ico-fb.png'
                alt=""
              />
            </div>
          </div>
        </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';

// 组件注册
@Component({
  name: 'Home',
  components: {
  },
})

export default class Home extends Vue {
  private loginFacebook() {
    (window.location.href = `${
      process.env.VUE_APP_API_ENDPOINT
    }auth/login/fb/${window.localStorage.getItem('lang') || 'en'}`);
  }
  // 生命周期函数

  created() {
  }

  mounted() {
    // this.$toast({
    //   msg: 'This is Toast',
    //   visable: false,
    // });
    // this.$http.get(this.$api.userinfo).then((res:any) => {
    //   this.userData = res.data.data;
    // });
  }
}
</script>
<style lang="scss" scoped>
.home {
  $self: &;
  $btn: '.btn';
  $ico: '.ico';
  $tm: '.timeline';
  &__container {
    width: 100%;
    position: relative;
    #{ $self }__heading {
      background: url('../assets/images/bg-main.png') no-repeat bottom center;
      background-size: cover;
      width: 100%;
      height: 70vh;
      color: #112e41;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-bottom: 25%;
      @media screen and (orientation: landscape) {
        background: url('../assets/images/bg-main.png') no-repeat top 14% center;
        background-size: 100%;
        height: 40vw;
        margin-top: 5%;
      }

      & > h1 {
        font-family: Bahnschrift;
        font-size: 12vw;
        font-weight: normal;
        max-width: 75%;
        margin: 0 auto;
        margin-bottom: -0%;
        @media screen and (orientation: landscape) {
          font-size: 6vw;
        }
      }
      & > p {
        font-family: Bahnschrift;
        font-size: 4.75vw;
        line-height: 1.5;
        max-width: 75%;
        margin: 0 auto;
        margin-bottom: -20%;
        & span {
          color: #f9d340;
        }
        @media screen and (orientation: landscape) {
          font-size: 3.75vw;
        }
      }
    }
    #{ $self }__subheading {
      text-align: center;
      color: #727272;
      width: 60%;
      margin: 5% auto 10%;
      & > p {
        font-family: Roboto;
        font-size: 3vw;
        line-height: 1.5;
      }
    }
    hr {
      background-color: #ffff;
      width: 40%;
      border-width: 0.5px;
      margin: 0 auto;
    }
    #{ $tm }__section {
      font-family: Bahnschrift;
      color: #112e41;
      text-align: center;
      .arrow {
        display: block;
        margin: 5% auto;
      }
      table {
        width: 80%;
        margin: 0 auto;
        border-spacing: 0px;
        border-radius: 10px;

        thead {
          tr {
            th {
              padding: 2vh 2vw;
              border: 1px solid #c5c5c5;
              border-bottom: none;
              font-weight: normal;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
            }
          }
        }
        tbody {
          tr {
            td {
              padding: 2vh 2vw;
              border: 1px solid #c5c5c5;
              border-bottom-left-radius: 10px;
              &:last-child {
                border-left: none;
                border-bottom-left-radius: 0px;
                border-bottom-right-radius: 10px;
              }
              &.one {
                border: 1px solid #c5c5c5;
                border-bottom-left-radius: 10px;
              }
              h3 {
                color: #dea92a;
                font-size: 4vw;
                font-weight: 900;
                font-family: RobotoBold;
              }
              p {
                margin-top: 2.5%;
                font-size: 3.5vw;
              }
            }
          }
        }
      }

      &-title {
        color: #112e41;
        margin: 10% auto;
        & > h1 {
          font-size: 6vw;
          font-family: Bahnschrift;
          font-weight: normal;
          text-align: center;
          @media screen and (orientation: landscape) {
            font-size: 3vw;
          }
        }
      }
    }
    #{ $self }__section {
      position: relative;
      z-index: 2;
      padding-bottom: 25%;

      .box {
        &__header {
          position: relative;
          background: url('../assets/images/bg-header.png') no-repeat top center;
          background-size: cover;

          &.rtl {
            transform: scaleX(-1);
            p {
              transform: scaleX(-1);
            }
          }

          p {
            width: 90%;
            margin: 0 auto;
            font-family: Bahnschrift;
            color: #ffff;

            &:nth-child(1) {
              color: #dea92a;
              padding-top: 7.5vw;
              @media screen and (orientation: landscape) {
                padding-top: 5vw;
              }
            }
            &:nth-child(2) {
              color: #112e41;
              padding-bottom: 7.5vw;
              @media screen and (orientation: landscape) {
                padding-bottom: 5vw;
              }
            }
          }
        }
        &__content {
          margin-left: 5%;
          width: 60%;
          font-family: Roboto;
          font-size: 3.25vw;
          color: #727272;
          position: relative;
          z-index: 1;
          padding-top: 5%;
          &.rtl {
            margin-left: auto;
            margin-right: 5%;
          }
          @media screen and (orientation: landscape) {
            font-size: 1.5vw;
          }
        }
      }
      &-title {
        color: #112e41;
        margin: 10% auto;
        & > h1 {
          font-size: 6vw;
          font-family: Bahnschrift;
          font-weight: normal;
          text-align: center;
          @media screen and (orientation: landscape) {
            font-size: 3vw;
          }
        }
      }
      &-1 {
        &::after {
          background: url('../assets/images/img-benefit-1.png') no-repeat bottom 13% right;
          background-size: 24%;
          content: ' ';
          top: 0;
          left: 0;
          right: -0.5%;
          bottom: 0;
          position: absolute;
          z-index: 0;
        }
      }
      &-2 {
        text-align: right;
        &::after {
          background: url('../assets/images/img-benefit-2.png') no-repeat bottom 100% left;
          background-size: 26%;
          content: ' ';
          top: 5%;
          left: 0;
          right: 0;
          bottom: 0;
          position: absolute;
          z-index: 0;
        }
      }
      &-3 {
        &::after {
          background: url('../assets/images/img-benefit-3.png') no-repeat bottom 90% right;
          background-size: 31%;
          content: ' ';
          top: 0;
          left: 0;
          right: 0%;
          bottom: 0;
          position: absolute;
          z-index: 0;
        }
      }
      &-4 {
        padding: 20%;
        background-color: rgb(115,72,37);

        p {
          color: white;
          font-family: Roboto;
          text-align: center;
          // width: 75%;
          margin: 0 auto;
          font-size: 3vw;
          &:nth-child(1) {
            margin-bottom: 10%;
          }
        }
      }
    }
    #{ $btn }__fb {
      font-family: Bahnschrift;
      font-size: 3.5vw;
      background-color: rgb(222,169,42);
      padding: 3vw 4vw;
      border-radius: 2px;
      color: rgb(255,247,222);
      width: 80%;
      margin: 15% auto 0;
      #{ $ico }__fb {
        // margin-left: 9vw;
        width: 12.5%;
      }
    }
  }
}
</style>
