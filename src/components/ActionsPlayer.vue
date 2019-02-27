<template>
<div id="actions-player">
    <div class="container">
        <btn-actions-player :index="1" v-on:triggered="track(-1)">
            <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 57 40" style="enable-background:new 0 0 57 40;" xml:space="preserve">
                <g>
                    <g id="Page-1">
                        <g id="Icons" transform="translate(-843 -1808)">
                            <g id="_x32_54---Fast-Backward-_x28_Solid_x29_" transform="translate(843 1808)">
                                <path id="Fill-106" class="st0" d="M56.5,0.1c-0.3-0.2-0.7-0.1-1,0.1L29,18.8V1c0.4-0.3,0.6-0.9,0.2-1.4
                                    c-0.3-0.4-0.9-0.6-1.4-0.2c-0.3,0.2-0.4,0.5-0.4,0.8l-27,19c-0.5,0.3-0.6,0.9-0.2,1.4c0.1,0.1,0.2,0.2,0.2,0.2l27,19
                                    c0.5,0.3,1.1,0.2,1.4-0.2c0.1-0.2,0.2-0.4,0.2-0.6V21.2l26.4,18.6c0.3,0.2,0.7,0.2,1,0.1c0.3-0.2,0.5-0.5,0.5-0.9V1
                                    C57,0.6,56.8,0.3,56.5,0.1"/>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </btn-actions-player>
        <btn-actions-player :index="2" v-on:triggered="toggleAudio" :isPlayButton="true">
            <svg v-if="!isPlaying" version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 31 42" style="enable-background:new 0 0 31 42;" xml:space="preserve">
                <g>
                    <g id="Page-1">
                        <g id="Icons" transform="translate(-377 -1806)">
                            <g id="_x32_58---Play-_x28_Solid_x29_" transform="translate(377 1806)">
                                <path id="Fill-97" class="st0" d="M30.6,20.2l-29-20C1.1-0.1,0.5,0,0.2,0.4C0.1,0.6,0,0.8,0,1v40c0,0.6,0.4,1,1,1
                                    c0.2,0,0.4-0.1,0.6-0.2l29-20c0.5-0.3,0.6-0.9,0.3-1.4C30.8,20.3,30.7,20.2,30.6,20.2"/>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            <svg v-else version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 31 42" style="enable-background:new 0 0 31 42;" xml:space="preserve">
                <rect x="1.3" y="3" class="st0" width="12.8" height="35.5"/>
                <rect x="17.5" y="3" class="st0" width="12.8" height="35.5"/>
            </svg>
        </btn-actions-player>
        <btn-actions-player :index="3" v-on:triggered="track(1)">
            <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 57 40" style="enable-background:new 0 0 57 40;" xml:space="preserve">
                <g>
                    <g id="Page-1">
                        <g id="Icons" transform="translate(-843 -1808)">
                            <g id="_x32_54---Fast-Backward-_x28_Solid_x29_" transform="translate(843 1808)">
                                <path id="Fill-106" class="st0" d="M0.5,39.1c0.3,0.2,0.7,0.1,1-0.1L28,20.4v17.8c-0.4,0.3-0.6,0.9-0.2,1.4
                                    c0.3,0.4,0.9,0.6,1.4,0.2c0.3-0.2,0.4-0.5,0.4-0.8l27-19c0.5-0.3,0.6-0.9,0.2-1.4c-0.1-0.1-0.2-0.2-0.2-0.2l-27-19
                                    c-0.5-0.3-1.1-0.2-1.4,0.2C28.1-0.2,28,0,28,0.2V18L1.6-0.6c-0.3-0.2-0.7-0.2-1-0.1C0.2-0.5,0-0.2,0,0.2v38
                                    C0,38.6,0.2,38.9,0.5,39.1"/>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </btn-actions-player>
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
            if (this.$store.getters.playingAlbum !== this.$route.params.id || this.$store.getters.playingTrack === undefined) {
                if (this.$store.getters.isPlaying === false) {
                    this.$store.commit('setPlayingAlbum', this.$route.params.id)
                }
                this.$store.commit('setPlayingTrack', 0)
            }
            this.$store.commit('toggleIsPlaying')
        },
        track(value) {
            this.$store.commit('setIsPlaying', true)
            this.$store.commit('updateTrack', value)
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
