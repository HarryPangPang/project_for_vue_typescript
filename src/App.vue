<template>
  <div id="app">
    <router-view />
    <!-- 非横屏显示 -->
    <div class="wp_pop">
      <div class="wp_content">
        <div class="wp_pop_img"></div>
        <p class="wp_tips">Please rotate your phone for the best browsing experience</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#app{
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  width: 100vw;
  background: #070e24;
  height: 100vh;
  // transform:scale(1);
  overflow: hidden;
}
@media screen and (max-width: 768px) and (orientation: portrait) {
  .wp_pop {
    display: block !important;
  }
}
.wp_pop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #091222;
  z-index: 9999;
  display: none;
}

.wp_content {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.wp_pop_img {
  width: 25vw;
  height: 15vw;
  margin: auto;
  background: url('./assets/images/scape.png') no-repeat;
  background-size: contain;
  animation: rotateA 1.5s ease infinite alternate;
}

.wp_tips {
  width: 60%;
  font-size: 2vw;
  color: #ffffff;
  text-align: center;
  margin: 6vw auto 0;
}
</style>
