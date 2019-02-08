<template>
<div id="albums-list">
    <div class="gradient"></div>
    <div class="vertical"></div>
    <div class="list" ref="list">
        <!-- <div class="letter" v-for="(letter,i) in albumsList" :key="i" :class="i" ref="letter">
            <album v-for="(album,index) in letter" :key="album.upc" :index="album.index" :album="album" :isLast="(letter.length-1 == index)" :letter="i"></album>
        </div> -->
        <group-albums ref="group" v-for="(letter,index) in albumsList" :key="index" :albums="albumsList[index]" :letter="index"></group-albums>
    </div>
</div>
</template>

<script>
import GroupAlbums from '@/components/GroupAlbums'

export default {
    name: 'AlbumsList',
    data() {
        return {
            scrollStrengh: 42,
            // albumDivHeight: 100,
            scrollControl: 0,
            maxScroll:0
        }
    },
    watch: {
        maxScroll() {
            this.$store.commit('updateMaxScroll',-this.maxScroll)
        }
    }, 
    methods: {
        onScroll(e) {
            this.maxScroll = this.$refs.list.offsetHeight - 500 - 72
                let amount = Math.sign(-e.deltaY) * this.scrollStrengh
                if((this.scrollAmount + amount)>0) {
                    this.$store.commit('scroll', 0)
                } else {
                    this.$store.commit('scroll', Math.max(this.scrollAmount + amount,-this.maxScroll))
                }
        }
    },
    mounted() {
        document.addEventListener('wheel', (e) => {
            if(this.$refs.list) {
                this.onScroll(e)
            }
            
        })
        setTimeout(()=>{
            this.maxScroll = this.$refs.list.offsetHeight - 500 - 72
        },100)
    },
    beforeDestroy() {
        
    },
    created() {
        this.$store.dispatch('fetchAlbums')
    },
    computed: {
        albumsList() {
            return this.$store.getters.albums
        },
        scrollAmount() {
            return this.$store.getters.scrollAmount
        }
    },
    components: {
        GroupAlbums
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

#albums-list {
    height: 100%;
    position: relative;
    border-radius: 16px;
    max-width: 75%;

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
        // height: 100%;
        z-index: 2;
    }
}
</style>
