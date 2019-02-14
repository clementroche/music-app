<template>
    <div class="track">
        <div class="index">{{ track.index }}</div>
        <div class="name">{{ track.name }}</div>
        <div class="duration">{{ parseInt(track.playbackSeconds/60) + ':' + track.playbackSeconds % 60 }}</div>
    </div>
</template>

<script>
export default {
    props: {
        track: {
            type: Object,
            required: true
        }
    },
    mounted() {
        console.log(this.track)
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

.track{
    display: flex;
    border-bottom: 1px solid $text-secondary-color;
    padding: 8px 0px;
    font-size: 0.8rem;
    
    >div {
        font-family: $subtitle-font;
        font-weight: 700;
    }
    .name {
        width: 80%;
        
       
    }
    .index,.duration {
        width:10%;
    }
}
</style>
