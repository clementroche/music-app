<template>
<div id="albums-list">
    <div class="gradient"></div>
    <div class="vertical"></div>
    <div class="list">
    <div class="letter" v-for="(letter,i) in orderedAlbumsList" :key="i" :class="i" ref="letter"> 
        <album v-for="(album,index) in letter" :key="album.upc" :index="album.index" :album="album" :isLast="(letter.length-1 == index)" :letter="i"></album>
    </div>   
    </div>
</div>
</template>

<script>
import Album from '@/components/Album'

export default {
    name: 'AlbumsList',
    props: {
        albums: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            alphabet: '#abcdefghijklmnopqrstuvwxyz'
        }
    },
    mounted() {

    },
    computed: {
        orderedAlbumsList() {
            let albums = {}
            this.albums.forEach((album,index)=>{
                album.index = index
                let char = album.name.charAt(0).toLowerCase()
                if(!this.alphabet.includes(char)) {
                    char = '#'
                }
                if(!albums[char]) {
                    albums[char] = []
                    this.$store.commit('addLetter',char)
                }

                albums[char].push(album)
                
            })
            return albums
        }
    },
    components: {
        Album
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/fonts.scss';
@import '@/assets/vars.scss';

#albums-list {
    height: 100%;
    position: relative;

    .gradient {
        width: 100%;
        height: 40px;
        position: absolute;
        top: 0px;
        left: 0px;
        background: linear-gradient(#fff, hsla(0, 0%, 100%, .001));
        z-index: 3;
    }

    .vertical {
        height: 100%;
        width: 3px;
        left: calc(16px + 50px);
        position: absolute;
        z-index: 0;
        background: linear-gradient(hsla(0, 0%, 100%, .001), $primary-color 5%, $secondary-color 95%, hsla(0, 0%, 100%, .001));
    }

    .list {
        padding: 16px;
        height: 100%;
        z-index: 2;
    }
}
</style>
