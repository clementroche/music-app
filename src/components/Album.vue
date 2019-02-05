<template>
<div class="album" :style="translation" ref="album">
    <img class="cover" v-if="covers[0]" :src="covers[0].url" alt="">
    <div class="meta">
        <div class="name">{{album.name}}</div>
        <div class="artist">{{album.artistName}} - {{index}}</div>
        <div class="tracks">{{album.trackCount}} tracks {{offsetTop}}</div>
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
        scrollAmount: {
            type: Number,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            covers: [],
            deltaY: 0,
            offsetTop:0
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
        }
    },
    watch: {
        scrollAmount() {
            TweenLite.to(this, 2.5 - Math.abs((10 - this.index) / 10), {
                ease: Elastic.easeOut.config(1, 0.3),
                deltaY: this.scrollAmount,
                onUpdate:() => {
                    this.offsetTop = this.$refs.album.getBoundingClientRect().top
                }
            });
        }
    },
    computed: {
        translation() {
            return {
                transform: `translateY(${this.deltaY}px)`
            }
        }
    },
    created() {
        this.fetchCover(this.album.links.images.href)
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/fonts.scss';
@import '@/assets/vars.scss';

.album {
    display: flex;
    margin: 20px 0;
    z-index: 2;

    .cover {
        height: 100px;
        width: 100px;
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
