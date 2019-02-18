<template>
    <div :class="['track',isPlayingTrack ? 'playing' : '']" @click="setPlayingTrack(track.index)" :style="elastic">
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
        },
        index : {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            deltaY: 0
        }
    },
    methods: {
        setPlayingTrack(index) {
            this.$store.commit('setIsPlaying',true)
            this.$store.commit('setPlayingTrack',index)
            
        }
    },
    watch: {
        playerScroll() {
            TweenLite.to(this, 2.5 - Math.abs((10 - this.index) / 10), {
                ease: Elastic.easeOut.config(1, 0.3),
                deltaY: this.playerScroll,
            });
        },
    },
    computed: {
        isPlayingTrack() {
            return Boolean(this.track.index === this.$store.getters.playingTrack)
        },
        playerScroll() {
            return this.$store.getters.playerScroll
        },
        elastic() {
            return {
                transform: `translateY(${this.deltaY}px)`,
                opacity: ((this.index+1) * 32) + this.deltaY < -525 ? 0 : 1
            }
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
