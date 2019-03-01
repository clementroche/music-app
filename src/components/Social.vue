<template>
  <div id="social">
    <div>Design by <a href="https://dribbble.com/lucianoir" target="_blank">Lucien Noir</a></div>
    <div>Code by <a href="https://twitter.com/clementroche_" target="_blank">Clément Roche</a></div>
    <div>Data provided by <a href="https://developer.napster.com/" target="_blank">Napster API</a></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='scss'>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';
  #social {
    position: absolute;
    bottom: 16px;
    right: 16px;
    div {
      font-family:$title-font;
      font-size: 0.75rem;
      font-weight: bolder;
      cursor: default;
      a{
        color: #000000;
      }
    }

  }
</style>
