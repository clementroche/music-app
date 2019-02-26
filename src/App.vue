<template>
<div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <div id="menu" :style="menu">
        <router-link to="/">
            <!-- <img src="./assets/icons/menu.svg" alt=""> -->
            <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 56 56" style="enable-background:new 0 0 56 56;" xml:space="preserve">
            <g>
                <g>
                    <g id="Page-1_8_">
                        <g id="Icons_8_" transform="translate(-962 -479)">
                            <g id="_x33_63---Menu-_x28_Solid_x29__8_" transform="translate(962 479)">
                                <linearGradient id="Fill-703_1_" gradientUnits="userSpaceOnUse" x1="0" y1="28" x2="56" y2="28">
                                    <stop  offset="0" style="stop-color:#5BF1D9"/>
                                    <stop  offset="1" style="stop-color:#84F4FB"/>
                                </linearGradient>
                                <path id="Fill-703_8_" class="st0" d="M28,0C12.6,0,0,12.6,0,28s12.6,28,28,28s28-12.6,28-28S43.4,0,28,0z M40,41H16
                                    c-1.1,0-2-0.9-2-2s0.9-2,2-2h24c1.1,0,2,0.9,2,2S41.1,41,40,41z M40,30H16c-1.1,0-2-0.9-2-2s0.9-2,2-2h24c1.1,0,2,0.9,2,2
                                    S41.1,30,40,30z M40,19H16c-1.1,0-2-0.9-2-2s0.9-2,2-2h24c1.1,0,2,0.9,2,2S41.1,19,40,19z"/>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
            </svg>
        </router-link>
        <!-- <img src="./assets/icons/search.svg" alt=""> -->
        <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 55 57" style="enable-background:new 0 0 55 57;" xml:space="preserve">
        <g>
            <g id="Page-1">
                <g id="Icons" transform="translate(-363 -359)">
                    <g id="_x33_78---Search-_x28_Solid_x29_" transform="translate(363 359)">
                        <linearGradient id="Fill-708_1_" gradientUnits="userSpaceOnUse" x1="0" y1="28.483" x2="54.9975" y2="28.483">
                            <stop  offset="0" style="stop-color:#5BF1D9"/>
                            <stop  offset="1" style="stop-color:#84F4FB"/>
                        </linearGradient>
                        <path id="Fill-708" class="st0" d="M54.2,51.9L40.6,37.8C44.1,33.6,46,28.4,46,23C46,10.3,35.7,0,23,0S0,10.3,0,23
                            s10.3,23,23,23c4.8,0,9.3-1.4,13.2-4.2L49.8,56c0.6,0.6,1.3,0.9,2.2,0.9c1.7,0,3-1.3,3-3C55,53.2,54.7,52.4,54.2,51.9z M23,6
                            c9.4,0,17,7.6,17,17s-7.6,17-17,17S6,32.4,6,23S13.6,6,23,6z"/>
                    </g>
                </g>
            </g>
        </g>
        </svg>
    </div>
        <router-view />
    <minified-player id="mini"></minified-player>
    </div>
</template>

<script>
import MinifiedPlayer from '@/components/MinifiedPlayer'
import GSAP from "gsap/TweenMax"
export default {
    name: 'App',
    data() {
        return {
            opacity: 0,
            menuY: 32
        }
    },
    mounted() {
        TweenLite.to(this, 1.5, {
            ease: Elastic.easeOut.config(1.2, 0.3),
            // delay: 0.5,
            menuY: 0,
        });

        TweenLite.to(this, 1.5, {
            ease: Power3.easeOut,
            // delay: 0.5,
            opacity: 1,
        });
    },
    computed: {
        menu() {
            return {
                opacity: this.opacity,
                transform: `translateY(${this.menuY}px)`
            }
        }
    },
    components: {
        MinifiedPlayer
    }
}
</script>

<style lang="scss">
@import './assets/vars.scss';

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    height: 100vh;
    width: 100vw;
    display: flex;
    background: linear-gradient(45deg, $primary-color, $secondary-color);
}

#menu {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    z-index: 5;

    // img {
    //     height: 20px;
    // }

    svg {
        height: 20px;
        fill: #84f4fb;
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
    box-shadow: $hard-shadow;
    overflow: hidden;
    position: relative;
}

#mini {
    z-index: 3;
    position: absolute;
    bottom: 0px;
}
</style>
