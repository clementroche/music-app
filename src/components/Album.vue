<template>
<router-link :to="{ name: 'Player', params: { id: album.id,data: data }}" :class="['album']" :style="translation" ref="album">
    <img class="cover" v-if="covers[0]" :src="covers[0].url" alt="">
    <div class="meta">
        <div class="name" :style="name">{{album.name}}</div>
        <div class="artist" :style="artist">{{album.artistName}}</div>
        <div class="tracks" :style="tracks">{{album.trackCount}} tracks</div>
    </div>
</router-link>
</template>

<script>
export default {
    props: {
        album: {
            type: Object,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            covers: [],
            deltaY: 0,
            appearY: -250,
            opacity: 0,
            nameY: 16,
            nameOpacity: 0,
            artistY: 16,
            artistOpacity: 0,
            tracksOpacity:0
        }
    },
    methods: {
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
                        });
                    }
                )
                .catch((err) => {
                    console.log('Fetch Error :-S', err);
                });
        },
    },
    watch: {
        scrollAmount() {
            TweenLite.to(this, 2.5 - Math.abs((10 - this.album.index) / 10), {
                ease: Elastic.easeOut.config(1, 0.3),
                deltaY: this.scrollAmount,
            });
        },
    },
    computed: {
        scrollAmount() {
            return this.$store.getters.scrollAmount
        },
        translation() {
            return {
                transform: `translateY(${this.deltaY-this.appearY}px)`,
                opacity: this.opacity
            }
        },
        data() {
            return {
                covers: this.covers,
                title: this.album.name,
                artist: this.album.artistName
            }
        },
        name() {
            return {
                transform: `translateY(${this.nameY}px)`,
                opacity: this.nameOpacity
            }
        },
        artist() {
            return {
                transform: `translateY(${this.artistY}px)`,
                opacity: this.artistOpacity
            }
        },
        tracks() {
            return {
                opacity: this.tracksOpacity
            }
        }
    },
    mounted() {
        TweenLite.to(this, 1.5, {
            ease: Elastic.easeOut.config(1, 0.5),
            delay: 1 + this.album.index / 10,
            appearY: 0,
        });

        TweenLite.to(this, 1, {
            ease: Power3.easeOut,
            delay: 1 + this.album.index / 6,
            opacity: 1
        });

        TweenLite.to(this, 1.5, {
            ease: Elastic.easeOut.config(1.2, 0.3),
            delay: 1.5,
            nameY: 0,
        });

        TweenLite.to(this, 1.5, {
            ease: Power3.easeOut,
            delay: 1.5,
            nameOpacity: 1,
        });

        TweenLite.to(this, 1.5, {
            ease: Elastic.easeOut.config(1.2, 0.3),
            delay: 1.75,
            artistY: 0,
        });

        TweenLite.to(this, 1.5, {
            ease: Power3.easeOut,
            delay: 1.75,
            artistOpacity: 1,
        });

        TweenLite.to(this, 1.5, {
            ease: Power3.easeOut,
            delay: 1.75,
            tracksOpacity: 1,
        });
    },
    created() {
        this.fetchCover(this.album.links.images.href)
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

.album {
    display: flex;
    margin: 20px 0;
    z-index: 2;
    text-decoration: none;

    .cover {
        height: 80px;
        width: 80px;
        border-radius: 8px;
        box-shadow: $soft-shadow;
    }

    .meta {
        padding-left: 16px;

        .name {
            font-family: $title-font;
            font-weight: bolder;
            font-size: 1.1rem;
            color: #000;
        }

        .artist {
            font-family: $title-font;
            font-weight: normal;
            font-size: 1rem;
            color: #000;
            text-decoration: none;
        }

        .tracks {
            font-family: $title-font;
            color: $text-secondary-color;
            font-weight: normal;
            font-size: 0.9rem;
        }
    }
}
</style>
