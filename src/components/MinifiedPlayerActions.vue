<template>
    <div id="minified-player-actions">
        <div class="previous" @click="updateTrack(-1)">
            <img :src="'../static/icons/back-grey.svg'" alt="">
        </div>
        <div :class="['playpause',isPlaying ? 'isPlaying' : '']" @click="togglePlay">
            <div class="border"></div>
            <div class="background"></div>
            <div class="icon">
                <img :src="'../static/icons/play.svg'" alt="" v-if="!isPlaying">
                <img :src="'../static/icons/pause.svg'" alt="" v-else>
            </div>
        </div>
        <div class="next" @click="updateTrack(1)">
            <img :src="'../static/icons/back180-grey.svg'" alt="">
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        isPlaying() {
            return this.$store.getters.isPlaying
        }
    },
    methods: {
        togglePlay() {
            this.$store.commit('toggleIsPlaying')
        },
        updateTrack(value) {
            this.$store.commit('setIsPlaying',true)
            this.$store.commit('updateTrack',value)
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

    #minified-player-actions {
        display: flex;
        align-items: center;
        position: relative;
        top:-8px;
        >div {
            border-radius: 100%;
        }
        .previous,.next {
            cursor: pointer;
            height: 32px;
            width: 28px;
            display: flex;
            img {
                height: 40%;
                margin: auto;
            }
        }
        .playpause {
            box-shadow:$hard-shadow;
            cursor: pointer;
            margin: 0 8px;
            height: 32px;
            width: 32px;
            position: relative;
            display: flex;
            &.isPlaying {
                .background {
                    background: $text-secondary-color;
                }
            }
            .background {
                background:linear-gradient(45deg, $primary-color, $secondary-color);
            }
            .border {
                transform: scale(1.2);
                background: #ffffff;
            }
            .border,.background {
                height: 100%;
                width: 100%;
                position: absolute;
                top: 0px;
                left: 0px;
                border-radius: 100%;
            }
            .icon {
                height: 40%;
                margin: auto;
                position: relative;
                z-index: 3;
            }
            
        }
        img {
            height: 100%;
        }
    }
</style>
