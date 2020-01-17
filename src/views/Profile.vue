<template>
  <div >
    <div class="profile__container">
      <h1 class="title">{text_profile_title}</h1>
      <p class="subtitle">{text_profile_sub}</p>
      <hr />
      <form class="form__custom">
        <div class="input__custom">
          <div class="prepend">
            <img src="../assets/images/ico-user.png" alt="" />
          </div>
          <input
            type="text"
            id="name"
            placeholder="Nama lengkap"
            readOnly
            disabled
            value="nameeee"
          />
          <div class="append">
            <img src="../assets/images/ico-check.png" alt="" />
          </div>
        </div>
        <div class="input__custom">
          <div class="prepend">
            <img src="../assets/images/ico-email.png" alt="" />
          </div>
          <input
            type="text"
            id="email"
            placeholder="Email aktif"
            value="nameeee@test.com"
            disabled
          />
          <div class="append">
            <img src="../assets/images/ico-check.png" alt="" />
          </div>
        </div>
        <div class="input__custom">
          <div class="prepend">
            <img src="../assets/images/ico-phone.png" alt="" />
          </div>
          <input
            value="312312312312"
            type="number"
            id="phonenumber"
            placeholder="No. telp aktif"
            disabled
          />
          <div class="append">
            <img src="../assets/images/ico-check.png" alt="" />
          </div>
        </div>
      </form>
      <hr />
      <h1 class="title">bug history</h1>
      <p class="subtitle">List of Submitted Bug</p>
      <div class="history__container">
        <div :key="index" class="history__item" v-for="(item, index) in [1, 2, 3, 4, 5]">
          <div class="date">
            May 29th 19
          </div>
          <div class="category">match</div>
          <div class="details" @click="historyDetailVisable = true">
            chack
            <img src="../assets/images/Component 13 – 1.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <!-- 历史详情弹窗 -->
    <ha-dialog-box :visable="historyDetailVisable" class="modal modal__detail">
      <div slot="content" class="bugs__details">
        <h1>{text_bug_title}</h1>
        <p>{text_bug_sub}</p>
        <div class="bugs__info">
          <p class="date">23.06.19</p>
          <p class="text title">{text_bug_category}</p>
          <p class="text">{breadcrumb}</p>
        </div>
        <div class="bugs__prob">
          <p class="text title">{text_bug_complain}</p>
          <p class="text">{profile.details.description}</p>
        </div>
        <div class="bugs__link">
          <p class="text title">{text_bug_link_bug}</p>
          <p class="text">{text_bug_link_sub}</p>
          <p class="text subtitle">{text_bug_evidence_r} 1</p>

        </div>
        <div class="btn btn__ok" @click="historyDetailVisable = false">
          {text_bug_ok}
        </div>
      </div>
    </ha-dialog-box>
  </div>
</template>

<script lang="ts">


import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {

  },
})
export default class Profile extends Vue {
  historyDetailVisable: boolean = false;

  handleCheckDetail(idx: any) {
    this.historyDetailVisable = true;
  }
}
</script>
<style lang="scss" scoped>
.profile {
  $self: &;
  $input: ".input";
  $ico: ".ico";
  $btn: ".btn";
  $hst: ".history";
  &__container {
    width: 100%;
    overflow-y:auto;
    position: relative;
    background: url("../assets/images/bg-main-trans.png") no-repeat top center;
    background-size: 100%;
    margin: 15% auto 0;
    color: #ffffff;
    text-align: center;
    // min-height: 0px;

    @media screen and (orientation: landscape) {
      margin-top: 5%;
    }
    .title {
      font-family: Bahnschrift;
      font-weight: normal;
      font-size: 12vw;
      color: #112e41;
      &:nth-of-type(2) {
        margin-top: 15%;
      }
      @media screen and (orientation: landscape) {
        font-size: 6vw;
      }
    }
    .subtitle {
      padding: 0 7vw;
      margin: 2.5% 0 15%;
      font-family: Roboto;
      font-size: 3vw;
      color: #727272;
      &:nth-of-type(2) {
        margin: 2.5% 0 0;
      }
      @media screen and (orientation: landscape) {
        margin-bottom: 10%;
      }
    }
    hr {
      max-width: 50%;
      border-width: 0.5px;
      margin: 0 auto;
      width: 100%;
    }
    .subheading {
      max-width: 90%;
      font-size: 3.5vw;
      margin: 0 auto 15%;
      color: $white;
    }
    .form__custom {
      margin: 10% auto;
      max-width: 80%;
      @media screen and (orientation: landscape) {
        max-width: 65%;
      }
      #{ $input }__custom {
        position: relative;
        margin: 0 auto 10%;
        &:nth-of-type(3) {
          margin: 0 auto;
        }
        input {
          width: 100%;
          outline: none;
          border: none;
          border-radius: 3px;
          background-color: #ffffff;
          border: 2px solid #734825;
          padding: 5% 20%;
          // height: 14vw;
          font-family: Roboto;
          &::placeholder {
            color: $grey;
          }
          @media screen and (orientation: landscape) {
            // padding: 5% 20%;
          }
        }
        .prepend {
          position: absolute;
          top: 0;
          bottom: 0;

          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20%;
          height: 100%;
        }
        .append {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20%;
          height: 100%;
        }
      }
    }
    #{ $hst }__container {
      margin-top: 5%;
      padding: 10% 10vw;
      @media screen and (orientation: landscape) {
        padding: 0 15vw 0;
      }
      #{ $hst }__item {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        font-family: RobotoBold;
        color: #311905;
        padding: 3vw 0;
        .date {
          font-size: 3.5vw;
          width: 30%;
        }
        .category {
          // margin-left: 7.5vw;
          width: 30%;
          text-align: left;
          font-size: 3.5vw;
        }
        .details {
          color: #dea92a;
          max-width: 30%;
          // margin-left: 5vw;
          font-size: 3vw;
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            margin-left: 1vw;
            max-width: 50%;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
