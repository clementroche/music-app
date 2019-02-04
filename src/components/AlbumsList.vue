<template>
    <div id="albums-list">
        <div class="gradient"></div>
        <div class="vertical"></div>
        <div class="list">
            <album v-for="(album,index) in albums" :key="album.upc" :index="index" :album="album" :scrollAmount="scrollAmount"></album>
        </div>
    </div>
</template>

<script>
import Album from '@/components/Album'

export default {
    name:'AlbumsList',
    props: {
        albums: {
            type: Array,
            required: true
        },
        scrollAmount: {
            type: Number,
            required: true
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

#albums-list{
    height: 100%;
    overflow: hidden;
    position: relative;

    .gradient{
        width: 100%;
        height: 40px;
        position: absolute;
        top:0px;
        left: 0px;
        background: linear-gradient(#fff,hsla(0,0%,100%,.001));
        z-index: 3;
    }

    .vertical{
        height: 100%;
        width: 3px;
        left: calc(16px + 50px);
        position: absolute;
        z-index: 0;
        background: linear-gradient(hsla(0,0%,100%,.001),$primary-color 5%,$secondary-color 95%,hsla(0,0%,100%,.001));
    }

    .list {
        padding: 16px;
        height: 100%;
        z-index: 2;
    }
}
</style>
