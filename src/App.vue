<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div id="menu">
      <img src="./assets/icons/menu.svg" alt="">
      <img src="./assets/icons/search.svg" alt="">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '@/assets/vars.scss';

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  width: 100vw;
  display: flex;
  background:linear-gradient(45deg, $primary-color, $secondary-color);
}

#menu {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  img {
    height: 20px;
  }
}

#app {
  max-height: 700px;
  max-width: 375px;
  height: 100%;
  width: 100%;
  margin: auto;
  background-color: $background-color;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
