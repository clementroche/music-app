<template>
    <div :class="['track',isPlayingTrack ? 'playing' : '']" @click="setPlayingTrack(track.index)">
        <div class="index">{{ track.index }}</div>
        <div class="name">{{ track.name }}</div>
        <div class="duration">{{ track.playbackSeconds | minutes }}</div>
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
    methods: {
        setPlayingTrack(index) {
            this.$store.commit('setPlayingTrack',index)
        }
    },
    computed: {
        isPlayingTrack() {
            return Boolean(this.track.index === this.$store.getters.playingTrack)
        }
    },
    filters: {
        minutes(seconds) {
            let m = parseInt(seconds/60)
            let s = seconds % 60
            if(s.toString().length < 2) {
                s+='0'
            }
            return m + ':' + s
        }
    },
    mounted() {
        // console.log(this.track)
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
    cursor: pointer;

    &.playing {
        background: linear-gradient(180deg, #5bf1d9, #84f4fb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    
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
