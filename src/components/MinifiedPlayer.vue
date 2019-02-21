<template>
<transition v-on:enter="enter" v-on:leave="leave">
    <div id="minified-player" v-if="playerScroll < -maxScroll+200 && !maxScroll == 0">
        <div class="slider" :style="slider"></div>
        <div class="container">
            <div class="info">
                <div class="cover">
                    <img :src="player.covers[1].url" alt="">
                </div>
                    <div class="meta">
                        <div>
                            <div class="album">{{player.current.name}}</div>
                            <div class="artist">{{player.current.artistName}}</div>
                        </div>
                        <div class="playing">Now Playing ● <span>{{currentTrackName}}</span></div>
                    </div>
                </div>
                <div class="actions">
                    <minified-player-actions></minified-player-actions>
                </div>
            </div>
        </div>
</transition>
</template>

<script>
import MinifiedPlayerActions from '@/components/MinifiedPlayerActions'

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export default {
    data() {
        return {
            currentTrackName: ''
        }
    },
    methods: {
        enter(el, done) {
            TweenLite.from(el, 0.5, {
                ease: Power3.easeOut,
                y: 110,
                onComplete: () => {
                    done()
                }
            });
        },
        leave(el, done) {
            TweenLite.to(el, 0.5, {
                ease: Power3.easeOut,
                y: 110,
                onComplete: () => {
                    done()
                }
            });
        }
    },
    computed: {
        player() {
            return this.$store.getters.player
        },
        playingTrack() {
            return this.$store.getters.playingTrack
        },
        currentTime() {
            return map_range(this.$store.getters.currentTime, 0, 30, 0, 100)
        },
        slider() {
            return {
                width: this.currentTime + '%'
            }
        },
        playerScroll() {
            return this.$store.getters.playerScroll
        },
        maxScroll() {
            return this.$store.getters.playerMaxScroll
        }

    },
    watch: {
        playingTrack() {
            this.currentTrackName = this.player.currentTracks[this.playingTrack - 1].name
        }
    },
    mounted() {
        setTimeout(() => {
            this.currentTrackName = this.player.currentTracks[this.playingTrack - 1].name
        }, 500)

    },
    components: {
        MinifiedPlayerActions
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

#minified-player {
    // height: 100px;
    background: $background-color;
    padding: 16px 16px;
    width: 100%;
    box-shadow: 0 -2px 25px rgba(0, 0, 0, .25);
    // position: relative;

    .slider {
        background: linear-gradient(180deg, $primary-color, $secondary-color);
        position: absolute;
        top: 0px;
        left: 0px;
        height: 3px;
    }

    .container {
        display: flex;
        justify-content: space-between;
        position: relative;

        .actions {
            display: flex;
            position: absolute;
            right: 0px;
            top: 0px;
            height: 100%;
        }

        .info {
            display: flex;

            .cover {
                height: 70px;
                width: 70px;
            }

            .meta {
                padding-left: 8px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                overflow: hidden;

                .album {
                    font-family: $title-font;
                    font-weight: bolder;
                    text-transform: uppercase;
                    line-height: 0.8rem;
                    font-size: 1rem;
                }

                .artist {
                    font-family: $title-font;
                    text-transform: uppercase;
                    background: linear-gradient(180deg, $primary-color, $secondary-color);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-size: 1rem;
                    font-weight: 600;
                }

                .playing {
                    font-family: $subtitle-font;
                    color: $text-secondary-color;
                    font-weight: 600;
                    font-size: 0.75rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    span {
                        color: #000;
                        font-weight: 700;
                    }
                }
            }
        }
    }
}
</style>
