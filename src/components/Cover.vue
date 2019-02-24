<template>
<transition v-on:enter="enter" appear>
    <div id="cover">
        <div class="container">
            <img :src="covers[4] ? covers[4].url : covers[3].url" alt="">
            <div class="track" ref="track">
                <div class="name">{{currentTrackName}}</div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    props: {
        album: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            covers: [{
                    url: ''
                },
                {
                    url: ''
                },
                {
                    url: ''
                },
                {
                    url: ''
                },
                {
                    url: ''
                }
            ]
        }
    },
    methods: {
        anime() {
            let tl = new TimelineLite();

            tl.set(this.$refs.track, {
                    height: '0%',opacity:0
                })
                .to(this.$refs.track, 1, {
                    height: '50%',
                    opacity:1,
                    ease: Power3.easeOut
                })
                .to(this.$refs.track, 1, {
                    height: '0%',
                    opacity:0,
                    ease: Power3.easeOut
                })
        },
        enter(el, done) {
            let delay = 0.5;
            // console.log('start')
            TweenLite.from(el, 1.5, {
                delay: delay,
                ease: Elastic.easeOut.config(1, 0.3),
                scale: 0,
                onComplete: () => {
                    // done()
                }
            });
            TweenLite.from(el, 1.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity: 1,
                onComplete: () => {
                    done()
                }
            });
        },
        fetchCover(url) {
            fetch(url + '?apikey=ZmE2NmVjYjMtMThhYi00ZjZiLWFlOWMtYjQ5MGVjYzk4ZWZk')
                .then(
                    (response) => {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }

                        // Examine the text in the response
                        response.json().then((data) => {
                            this.covers = data.images
                            this.$store.commit('setCovers', data.images)
                        });
                    }
                )
                .catch((err) => {
                    console.log('Fetch Error :-S', err);
                });
        }
    },
    computed: {
        playingTrack() {
            return this.$store.getters.playingTrack
        },
        currentTracks() {
            return this.$store.getters.currentTracks
        },
        currentTrackName() {
            if (this.currentTracks[this.playingTrack]) {
                return this.currentTracks[this.playingTrack].name
            }
        },
    },
    watch: {
        album() {
            this.fetchCover(this.album.links.images.href)
        },
        playingTrack() {
            this.anime()
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

#cover {
    display: flex;
    padding: 0 16px;
    height: 283px;

    .container {
        // margin: auto;
        width: 100%;
        margin: 0 32px;
        position: relative;

        img {
            border-radius: 16px;
            width: 100%;
            height: 100%;
            box-shadow: $soft-shadow;
        }

        .track {
            position: absolute;
            bottom: 0px;
            width: 100%;
            left: 0px;
            height: 0%;
            background: linear-gradient(0deg, #000, rgba(0, 0, 0, 0.001));
            display: flex;
            border-radius: 16px;

            .name {
                font-family: $title-font;
                font-weight: bolder;
                // text-transform: uppercase;
                font-size: 1.5rem;
                color: #ffffff;
                margin: auto;
                max-width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 0 32px;
            }
        }
    }
}
</style>
