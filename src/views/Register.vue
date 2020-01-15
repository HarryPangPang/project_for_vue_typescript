<template>
  <div class="register__container">
    <h1>register</h1>
    <p>{text_register_sub}</p>
    <hr />
    <!-- 用户名 -->
    <div class="input__custom">
      <div class="prepend">
        <img src="../assets/images/ico-user.png" alt="" />
      </div>
      <input
        v-model="name"
        type="text"
        id="name"
        placeholder="{text_register_name_placeholder}" />
      <div class="append" v-show="handleValidate('name')">
        <img src="../assets/images/ico-check.png" alt="" />
      </div>
    </div>
    <!-- 邮箱 -->
    <div class="input__custom">
      <div class="prepend">
        <img src="../assets/images/ico-email.png" alt="" />
      </div>
      <input
        v-model="email"
        type="text"
        id="email"
        placeholder="{text_register_name_placeholder}" />
      <div class="append" v-show="handleValidate('email')">
        <img src="../assets/images/ico-check.png" alt="" />
      </div>
    </div>
    <!-- 手机  -->
    <div class="input__custom">
      <div class="prepend">
        <img src="../assets/images/ico-phone.png" alt="" />
      </div>
      <input
        v-model="phonenumber"
        type="text"
        id="phonenumber"
        placeholder="{text_register_name_placeholder}" />
      <div class="append" v-show="handleValidate('phonenumber')">
        <img src="../assets/images/ico-check.png" alt="" />
      </div>
    </div>
    <img class="ico ico__warn" src="../assets/images/ico-warning.png" alt="" />
    <p class="subheading">{text_register_warn}</p>
    <hr />
    <div class="btn btn__join" @click="handleSubmit">
      {text_register_join}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { validateEmail, validateName, validatePhone } from '@/utils/validate';

@Component
export default class Register extends Vue {
  private name:string = ''

  private email:string = ''

  private phonenumber:string = ''

  // eslint-disable-next-line consistent-return
  private handleValidate(type:string) {
    switch (type) {
      case 'name':
        return validateName(this.name);
      case 'email':
        return validateEmail(this.email);
      case 'phonenumber':
        return validatePhone(this.phonenumber);
      default:
        break;
    }
  }

  private handleSubmit() {
    if (validateName(this.name) && validateName(this.email) && validateName(this.phonenumber)) {
      console.log('register');
    } else {
      this.$toast({
        visable: true,
        msg: 'Please complete',
        delay: 1500,
      });
    }
  }

  created() {}
}
</script>
<style lang="scss" scoped>
.register {
  $self: &;
  $input: ".input";
  $ico: ".ico";
  $btn: ".btn";
  &__container {
    width: 100%;
    position: relative;
    background: url("../assets/images/bg-main-trans.png") no-repeat top center;
    background-size: 100%;
    margin: 15% auto 0;
    padding: 0 5%;
    color: #ffff;
    text-align: center;
    @media screen and (orientation: landscape) {
      margin-top: 5%;
    }
    h1 {
      font-family: Bahnschrift;
      font-size: 12vw;
      font-weight: normal;
      color: #112e41;

      @media screen and (orientation: landscape) {
        font-size: 6vw;
      }
    }
    p {
      padding: 0 7vw;
      margin: 5% 0 15%;
      font-family: Roboto;
      font-size: 3vw;
      color: #727272;
      @media screen and (orientation: landscape) {
        font-size: 1.75vw;
        margin: 2.5% 0 5%;
        padding: 0 10vw;
      }
    }
    hr {
      max-width: 50%;
      border-width: 1px;
      margin: 0 auto;
      background-color: #707070;
    }
    .subheading {
      max-width: 90%;
      font-size: 3.5vw;
      margin: 0 auto 15%;
      color: #727272;

      @media screen and (orientation: landscape) {
        margin-bottom: 5%;
        font-size: 1.75vw;
      }
    }
    #{ $input }__custom {
      position: relative;
      max-width: 80%;
      margin: 0 auto 10%;
      border: 1px solid #dea92a;
      border-radius: 3px;
      &:nth-of-type(1) {
        margin: 15% auto 10%;
      }
      @media screen and (orientation: landscape) {
        margin: 0 auto 5%;
        max-width: 65%;
        &:nth-of-type(1) {
          margin: 7.5% auto 5%;
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
      }
      input {
        width: 100%;
        outline: none;
        border: none;
        border-radius: 3px;
        padding: 0 20%;
        height: 14vw;
        font-family: Roboto;
        &::placeholder {
          color: $grey;
        }
        @media screen and (orientation: landscape) {
          height: 10vw;
        }
      }
    }
    #{ $ico }__warn {
      margin: 15% auto 10%;
      @media screen and (orientation: landscape) {
        margin: 5% auto;
      }
    }
    #{ $btn }__join {
      font-family: Bahnschrift;
      font-size: 6vw;
      background-color: #dea92a;
      padding: 5vw 0.5vw;
      border-radius: 2px;
      color: #ffffff;
      justify-content: center;
      width: 70%;
      margin: 15% auto 20%;
      @media screen and (orientation: landscape) {
        margin: 5% auto 10%;
        padding: 2vw 0.5vw;
        width: 60%;
      }
    }
  }
}
</style>
