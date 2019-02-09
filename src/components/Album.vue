<template>
<!-- <div :class="['album', isLast ? 'last' : '']" :style="translation" ref="album"> -->
<div :class="['album']" :style="translation" ref="album">
    <img class="cover" v-if="covers[0]" :src="covers[0].url" alt="">
    <div class="meta">
        <div class="name">{{album.name}}</div>
        <div class="artist">{{album.artistName}}</div>
        <div class="tracks">{{album.trackCount}} tracks</div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        album: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            covers: [],
            deltaY: 0,
            appearY: -250,
            opacity:0
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
    },
    mounted() {
            TweenLite.to(this, 1.5, {
                ease: Elastic.easeOut.config(1, 0.4),
                delay: 1+this.album.index/6,
                appearY: 0,
            });

            TweenLite.to(this, 1, {
                ease: Power3.easeOut,
                delay: 1+this.album.index/6,
                opacity: 1
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

    .cover {
        height: 80px;
        width: 80px;
        border-radius: 8px;
        box-shadow: $shadow;
    }

    .meta {
        padding-left: 16px;

        .name {
            font-family: $title-font;
            font-weight: bolder;
            font-size: 1.1rem;
        }

        .artist {
            font-family: $title-font;
            font-weight: normal;
            font-size: 1rem;
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
