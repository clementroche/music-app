<template>
<transition v-on:enter="enter" appear>
    <div id="cover">
        <div class="container">
            <img :src="covers[4] ? covers[4].url : covers[3].url" alt="">
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
            covers: [
                {url:''},
                {url:''},
                {url:''},
                {url:''},
                {url:''}
            ]
        }
    },
    methods: {
        enter(el, done) {
            console.log('start')
            TweenLite.to(el, 0, {
                ease: Power3.easeOut,
                scale: 0.2,
                opacity: 0
            });
            TweenLite.to(el, 1.5, {
                delay:0.5,
                ease: Elastic.easeOut.config(1, 0.3),
                scale: 1,
                onComplete: () => {
                    console.log('end')
                    done()
                }
            });
            TweenLite.to(el, 1.5, {
                delay:0.5,
                ease: Power3.easeOut,
                opacity: 1,
                onComplete: () => {
                    console.log('end')
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
                            this.$store.commit('setCovers',data.images)
                        });
                    }
                )
                .catch((err) => {
                    console.log('Fetch Error :-S', err);
                });
        },
    },
    watch: {
        album() {
            this.fetchCover(this.album.links.images.href)
        }
    },
    mounted() {
        // console.log(this.album.links.images.href)
        // this.fetchCover(this.album.links.images.href)
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
            margin: auto;
            width: 100%;
            padding: 0 32px;
            img {
                border-radius: 16px;
                width: 100%;
                box-shadow: $soft-shadow;
            }
        }
    }

</style>
