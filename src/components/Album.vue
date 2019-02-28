<template>
<transition appear v-on:enter="enter">
    <!-- <router-link :to="{ name: 'Player', params: { id: album.id,data: data }}" :class="['album']" :style="translation" ref="album"> -->
    <div @click="nav({ name: 'Player', params: { id: album.id,data: data }},$refs.cover)" :class="['album']" ref="album" :style="transform">
        <img class="cover" v-if="covers[0]" :src="covers[0].url" alt="" ref="cover">
        <div class="meta">
            <transition appear v-on:enter="enterMeta">
                <div class="name">{{album.name}}</div>
            </transition>
            <transition appear v-on:enter="enterMeta">
                <div class="artist">{{album.artistName}}</div>
            </transition>
            <transition appear v-on:enter="enterOpacity">
                <div class="tracks">{{album.trackCount}} tracks</div>
            </transition>
        </div>
    </div>
    <!-- </router-link> -->
</transition>
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
            deltaY:0
        }
    },
    methods: {
        enter(el,done) {
            let delay = 1 + (this.album.index*0.1)

            TweenLite.from(el, 1.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity:0,
                onComplete: ()=>{
                    // done()
                }
            });

            TweenLite.from(el, 1, {
                delay: delay,
                ease: Elastic.easeOut.config(1, 0.5),
                y:250,
                onComplete: ()=> {
                    done()
                }
            });
        },
        enterMeta(el,done) {
            let delay = 1.5 + (this.album.index*0.1)

            TweenLite.from(el, 1, {
                delay: delay,
                ease: Elastic.easeOut.config(1, 0.5),
                y:16,
                onComplete: ()=> {
                    // done()
                }
            });

            TweenLite.from(el, 0.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity:0,
                onComplete: ()=>{
                    done()
                }
            });
        },
        enterOpacity(el,done) {
            let delay= 1.75;
            TweenLite.from(el, 0.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity:0,
                onComplete: ()=>{
                    done()
                }
            });
        },
        nav(args, el) {
            TweenLite.to(el, 0.25, {
                ease: Power3.easeOut,
                scale: 0.5,
                onComplete: () => {
                    this.$router.push(args)
                }
            })

            TweenLite.to(el, 0.25, {
                delay: 0,
                ease: Power3.easeOut,
                opacity: 0
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
        data() {
            return {
                covers: this.covers,
                title: this.album.name,
                artist: this.album.artistName
            }
        },
        transform() {
            return {
                transform: `translateY(${this.deltaY}px)`
            }
        }
    },
    mounted() {
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
    cursor: pointer;

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
