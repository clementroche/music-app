<template>
<div id="minified-player-actions">
    <div class="previous" @click="updateTrack(-1)">
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
    </div>
    <div :class="['playpause',isPlaying ? 'isPlaying' : '']" @click="togglePlay">
        <div class="border"></div>
        <div class="background"></div>
        <div class="icon">
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
            <!-- <img :src="'../static/icons/play.svg'" alt="" v-if="!isPlaying"> -->
            <svg v-else version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 31 42" style="enable-background:new 0 0 31 42;" xml:space="preserve">
                <rect x="1.3" y="3" class="st0" width="12.8" height="35.5"/>
                <rect x="17.5" y="3" class="st0" width="12.8" height="35.5"/>
                </svg>
            <!-- <img :src="'../static/icons/pause.svg'" alt="" v-else> -->
        </div>
    </div>
    <div class="next" @click="updateTrack(1)">
        <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 57 40" style="enable-background:new 0 0 57 40;" xml:space="preserve">
            <g>
                <g id="Page-1">
                    <g id="Icons" transform="translate(-843 -1808)">
                        <g id="_x32_54---Fast-Backward-_x28_Solid_x29_" transform="translate(843 1808)">
                            <path id="Fill-106" class="st0" style="fill:#BFBFBF" d="M0.5,39.1c0.3,0.2,0.7,0.1,1-0.1L28,20.4v17.8c-0.4,0.3-0.6,0.9-0.2,1.4
                                c0.3,0.4,0.9,0.6,1.4,0.2c0.3-0.2,0.4-0.5,0.4-0.8l27-19c0.5-0.3,0.6-0.9,0.2-1.4c-0.1-0.1-0.2-0.2-0.2-0.2l-27-19
                                c-0.5-0.3-1.1-0.2-1.4,0.2C28.1-0.2,28,0,28,0.2V18L1.6-0.6c-0.3-0.2-0.7-0.2-1-0.1C0.2-0.5,0-0.2,0,0.2v38
                                C0,38.6,0.2,38.9,0.5,39.1"/>
                        </g>
                    </g>
                </g>
            </g>
            </svg>
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
            if(this.$store.getters.playingAlbum !== this.$route.params.id || this.$store.getters.playingTrack === undefined) {
                if(this.$store.getters.isPlaying === false) {
                    this.$store.commit('setPlayingAlbum',this.$route.params.id)
                }
                this.$store.commit('setPlayingTrack',0)
            }
            this.$store.commit('toggleIsPlaying')
        },
        updateTrack(value) {
            this.$store.commit('setIsPlaying', true)
            this.$store.commit('updateTrack', value)
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
    top: -8px;

    >div {
        border-radius: 100%;
    }

    .previous,
    .next {
        cursor: pointer;
        height: 32px;
        width: 28px;
        display: flex;

        img,
        svg {
            height: 40%;
            margin: auto;
            fill: #BFBFBF;
        }
    }

    .playpause {
        box-shadow: $hard-shadow;
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

        img {
            fill: #ffffff;
        }

        &:not(.isPlaying) {

            img,
            svg {
                position: relative;
                left: 1px;
                top: -1px;
                fill: #ffffff;
                height: 100%;
            }
        }

        .background {
            background: linear-gradient(45deg, $primary-color, $secondary-color);
        }

        .border {
            transform: scale(1.2);
            background: #ffffff;
        }

        .border,
        .background {
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

    img,
    svg {
        height: 100%;
        fill: #ffffff;
    }
}
</style>
