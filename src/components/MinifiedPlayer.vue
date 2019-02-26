<template>
<transition v-on:enter="enter" v-on:leave="leave">
    <div id="mini" v-if="((playerScroll < -maxScroll+200 && !maxScroll == 0) || ($route.name == 'Library' && playingTrack != undefined) && playingTrack !== undefined) ">
        <div class="slider" :style="slider"></div>
        <div class="container">
            <div class="info">
                <div class="cover">
                    <img :src="utils.cover" alt="">
                </div>
                    <div class="meta">
                        <div>
                            <div class="album">{{utils.name}}</div>
                            <div class="artist">{{utils.artistName}}</div>
                        </div>
                        <div class="playing">Now Playing ● <span>{{utils.currentTrackName}}</span></div>
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
            // currentTrackName: '',
            audio: undefined,
            currentPlaying: undefined,
            utils: {
                cover: undefined,
                name: undefined,
                artistName: undefined,
                currentTrackName: undefined,
                tracks: []
            }
            // cover: undefined
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
        },
        audioPlay(boolean = false) {
            if (this.audio != undefined) {
                this.audio.pause()
            }
            if (this.currentPlaying !== this.playingTrack || boolean) {
                this.audio = new Audio(this.currentTrackURL)
                this.audio.addEventListener("timeupdate", () => {
                    this.$store.commit('setCurrentTime', this.audio.currentTime)
                });
                this.audio.addEventListener("ended", () => {
                    this.$store.commit('updateTrack', 1)
                });
                this.currentPlaying = this.playingTrack
            }

            this.audio.play()

        },
        audioPause() {
            if (this.audio != undefined) {
                this.audio.pause()
            }
        }
    },
    computed: {
        player() {
            return this.$store.getters.player
        },
        cover() {
            return this.$store.state.player.covers[1]
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
        },
        currentTrackURL() {
            if (this.utils.tracks[this.playingTrack]) {
                return this.utils.tracks[this.playingTrack].previewURL
            } else {
                return null
            }

        },
        isPlaying() {
            return this.$store.getters.isPlaying
        },
        currentTracks() {
            return this.$store.getters.currentTracks
        },
        currentTimeFromSlider() {
            return this.$store.getters.currentTimeFromSlider
        },
        currentTrackName() {
            if (this.utils.tracks[this.playingTrack]) {
                return this.utils.tracks[this.playingTrack].name
            }
        },
        playingAlbum() {
            return this.$store.getters.playingAlbum
        }

    },
    watch: {
        playingAlbum(newValue, oldValue) {
            if (oldValue === undefined) {
                setTimeout(() => {
                    this.utils.tracks = this.currentTracks
                    this.utils.name = this.player.current.name
                    this.utils.artistName = this.player.current.artistName
                    this.utils.currentTrackName = this.currentTrackName
                }, 250)
            } else {
                this.utils.tracks = this.currentTracks
                this.utils.name = this.player.current.name
                this.utils.artistName = this.player.current.artistName
                this.utils.currentTrackName = this.currentTrackName
            }

            setTimeout(() => {
                this.utils.cover = this.cover.url
            }, 500)

        },
        playingTrack() {
            if (this.utils.tracks[this.playingTrack]) {
                this.utils.currentTrackName = this.utils.tracks[this.playingTrack].name
            }
        },
        currentTrackURL() {

            if (this.isPlaying === true) {
                this.audioPlay(true)
            }
        },
        isPlaying() {
            if (this.isPlaying === true) {
                this.audioPlay()
            } else {
                this.audioPause()
            }
        },
        currentTimeFromSlider() {
            if (this.audio) {
                this.audio.currentTime = this.currentTimeFromSlider
            }

        }
    },
    mounted() {
        this.$store.commit('setIsPlaying', false)

    },
    components: {
        MinifiedPlayerActions
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

#mini {
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
            width: 100%;

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
