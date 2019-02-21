<template>
    <div id="actions-player">
        <div class="container">
            <btn-actions-player :index="1" :icon="'../static/icons/back.svg'" v-on:triggered="track(-1)"></btn-actions-player>
            <btn-actions-player :index="2" :class="isPlaying ? 'isPlaying' : ''" :icon="isPlaying ? '../static/icons/pause.svg' : '../static/icons/play.svg'" v-on:triggered="toggleAudio" :isPlayButton="true"></btn-actions-player>
            <btn-actions-player :index="3" :icon="'../static/icons/back180.svg'" v-on:triggered="track(1)"></btn-actions-player>
        </div>
    </div>
</template>

<script>
import BtnActionsPlayer from '@/components/BtnActionsPlayer'
export default {
    components: {
        BtnActionsPlayer
    },
    methods: {
        toggleAudio() {
            this.$store.commit('toggleIsPlaying')
        },
        track(value) {
            this.$store.commit('setIsPlaying',true)
            this.$store.commit('updateTrack',value)
        }
    },
    computed: {
        isPlaying() {
            return this.$store.getters.isPlaying
        }
    },
}
</script>

<style lang="scss" scoped>
    #actions-player {
        padding: 0 16px;
        position: relative;
        top: -30px;

        .container {
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
        }
    }
</style>
