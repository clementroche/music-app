<template>
<div id="library" ref="library">
    <header>
        <h1>my library</h1>
        <h2>albums {{scrollAmount}}</h2>
    </header>
    <div class="container">
        <albums-list :albums="orderedAlbumsList" :scrollAmount="scrollAmount*scrollStrengh"></albums-list>
        <slider></slider>
    </div>

</div>
</template>

<script>
import AlbumsList from '@/components/AlbumsList'
import Slider from '@/components/Slider'
import {
    TweenMax,
    Elastic,
    TimelineLite
} from "gsap/TweenMax"

export default {
    data() {
        return {
            albumsList: [],
            scrollAmount: 0,
            scrollStrengh: 40,
            albumDivHeight: 140
        }
    },
    methods: {
        fetchAlbumsList() {
            fetch('http://api.napster.com/v2.2/genres/g.146/albums/top?apikey=ZmE2NmVjYjMtMThhYi00ZjZiLWFlOWMtYjQ5MGVjYzk4ZWZk')
                .then(
                    (response) => {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' +
                                response.status);
                            return;
                        }

                        // Examine the text in the response
                        response.json().then((data) => {
                            this.albumsList = data.albums
                        });
                    }
                )
                .catch((err) => {
                    console.log('Fetch Error :-S', err);
                });
        }
    },
    created() {
        this.fetchAlbumsList()
    },
    mounted() {
        this.$refs.library.addEventListener('wheel', (e) => {
            if ((this.scrollAmount + Math.sign(e.deltaY) <= 0) && (this.scrollAmount + Math.sign(e.deltaY) >= -(this.albumsList.length - 1) * (this.albumDivHeight / this.scrollStrengh))) {
                this.scrollAmount += Math.sign(e.deltaY)
            }
        })
    },
    computed: {
        orderedAlbumsList() {
            return this.albumsList.sort(function (a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
        }
    },
    components: {
        AlbumsList,
        Slider
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/fonts.scss';
@import '@/assets/vars.scss';

#library {
    height: 100%;
    display: flex;
    flex-direction: column;

    header {
        padding: 8px 16px;

        h1 {
            font-family: $title-font;
            font-weight: bolder;
            text-transform: uppercase;
        }

        h2 {
            font-family: $title-font;
            text-transform: uppercase;
            background: linear-gradient(180deg, $primary-color, $secondary-color);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }

    .container {
        height: 100%;
        overflow: hidden;
        display: flex;
    }
}
</style>
