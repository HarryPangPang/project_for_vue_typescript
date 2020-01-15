<template>
  <div class="menu animated fadeIn show" :class="{'active':navbarVisable}">
    <div class="menu__header trans logged__in">
      <div class="menu__logo trans logged__in"></div>
        <button @click="handleNavbar"
       type="button"
        class="ico hamburger  is-active" :class="[{'is-active':navbarVisable},{'hamburger--3dx':navbarVisable}]">
          <span class="hamburger-box">
            <span class="hamburger-inner" />
          </span>
        </button>
      </div>

      <div v-show="navbarVisable" class="menu__list animated fadeIn faster">
        <!-- <ul> -->
          <li class="menu__item">
            <a>profile</a>
          </li>
          <li class="menu__item">
            <a>profile</a>
          </li>
        <!-- </ul> -->
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Notfound extends Vue {
  navbarVisable:boolean = false

  handleNavbar() {
    this.navbarVisable = !this.navbarVisable;
  }
}
</script>
<style lang="scss" scoped>
.menu {
  $self: &;
  $icon: '.ico';
  list-style-type: none;
  border-bottom: 5px solid rgb(255,237,213);

  #{ $self }__header {
    position: relative;
    background-color: #313131;
    #{ $icon } {
      margin-right: 5%;
      color: #dea92a !important;
    }
    #{ $self }__logo {
      background: url('../../assets/images/logo-ffas.png') no-repeat top center;
      background-size: contain;
      width: 60vw;
      height: 7vw;
      margin-left: 5%;
      &.logged__out {
        margin-left: 0;
      }
      @media screen and (orientation: landscape) {
        width: 30vw;
        background: url('../../assets/images/logo-ffas.png') no-repeat center;
        background-size: contain;
      }
      &.br {
        background-image: url('../../assets/images/logo-ffadvsev-br-black.png');
      }
    }
    &.logged__in {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 8vh;
    }
    &.trans {
      background: rgba(0, 0, 0, 0);
    }
  }
  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #dea92a;
    // height: calc(100vh - 15vw);
    height: 92vh;
    position: fixed;
    top: 8vh;
    // top: 15vw;
    #{ $self }__item {
      display: flex;
      // flex-basis: calc(100% / 10);
      justify-content: center;
      align-items: center;
      font-family: RobotoBlack;
      & > a {
        text-decoration: none;
        color: #ffffff;
        width: 100%;
        text-align: center;
        padding: 3vh 0;
      }
      &.none {
        display: none;
      }
      @media screen and (orientation: landscape) {
        flex-basis: calc(100% / 5);
        top: 10vh;
      }
    }
  }
  &.show {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  &.unshow {
    height: 10vh;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (orientation: landscape) {
      height: 15vw;
    }
  }
  &.active {
    // height: 100vh;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
  }
}
.hamburger {
  padding: 15px 15px;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;
}
.hamburger:hover {
  opacity: 0.7;
}
.hamburger.is-active:hover {
  opacity: 0.7;
}
.hamburger.is-active .hamburger-inner,
.hamburger.is-active .hamburger-inner::before,
.hamburger.is-active .hamburger-inner::after {
  background-color: #dea92a;
}

.hamburger-box {
  width: 40px;
  height: 24px;
  display: inline-block;
  position: relative;
}

.hamburger-inner {
  display: block;
  top: 50%;
  margin-top: -2px;
}
.hamburger-inner,
.hamburger-inner::before,
.hamburger-inner::after {
  width: 40px;
  height: 4px;
  background-color: #dea92a;
  border-radius: 4px;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}
.hamburger-inner::before,
.hamburger-inner::after {
  content: '';
  display: block;
}
.hamburger-inner::before {
  top: -10px;
}
.hamburger-inner::after {
  bottom: -10px;
}
/*
     * 3DX
     */
.hamburger--3dx .hamburger-box {
  perspective: 80px;
}

.hamburger--3dx .hamburger-inner {
  transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
    background-color 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.hamburger--3dx .hamburger-inner::before,
.hamburger--3dx .hamburger-inner::after {
  transition: transform 0s 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.hamburger--3dx.is-active .hamburger-inner {
  background-color: transparent !important;
  transform: rotateY(180deg);
}
.hamburger--3dx.is-active .hamburger-inner::before {
  transform: translate3d(0, 10px, 0) rotate(45deg);
}
.hamburger--3dx.is-active .hamburger-inner::after {
  transform: translate3d(0, -10px, 0) rotate(-45deg);
}

</style>
