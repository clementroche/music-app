<template>
    <div id="bottom" ref="bottom">
        <div class="background" :style="bottom"></div>
        <div class="head">
            <h3>{{bottom.transform}}</h3>
            <div class="save">
                <div>save</div>
            </div>
        </div>
        <tracks-list id="tracks"></tracks-list>
    </div>
</template>

<script>
import TracksList from '@/components/TracksList'
export default {
    components: {
        TracksList
    },
    mounted() {
        document.addEventListener('wheel', (e) => {
            // if(this.$refs.list) {
                this.onScroll(e.deltaY)
            // }
            
        })
    },
    computed: {
        playerScroll() {
            return this.$store.getters.playerScroll
        },
        bottom() {
            return {
                transform: `translateY(${this.playerScroll}px)`
            }
        }
    },
    methods: {
        onScroll(deltaY) {
            console.log(this.$refs.bottom.offsetTop)
            // console.log(this.$refs.bottom.offsetHeight,this.$refs.bottom.offsetTop)
            let maxScroll = document.querySelector('#top').offsetHeight + 28
            if(this.playerScroll +( Math.sign(deltaY)*50) >= -maxScroll) {
                let amount = Math.min(this.playerScroll +( Math.sign(deltaY)*50),0)
                this.$store.commit('playerScroll', amount)
            } else {
                let amount = -maxScroll
                this.$store.commit('playerScroll', amount)
            }

        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

#bottom {
    margin-top: 28px;
    padding: 0 32px;
    position: relative;

    #tracks {
        z-index: 3;
        position:relative;
    }

    .background {
        z-index: 2;
        height: 100%;
        width: 100%;
        position: absolute;
        top:0px;
        left: 0px;
        background: #ffffff;
    }
    
    .head{
        display: flex;
        z-index: 3;
        position:relative;
    
        h3 {
            font-family: $title-font;
            text-transform: uppercase;
            color: #000;
            display: inline;
            margin-right: 32px;
        }

        .save {
            font-family: $subtitle-font;
            color: $text-secondary-color;
            border: 1px solid $primary-color;
            padding: 0 12px;
            border-radius: 24px;
            font-weight: 700;
            font-size: 0.8rem;
            display: flex;
            margin: 5px;
            
            div {
                margin: auto;

                &::first-letter {
                    text-transform: uppercase;
                }
            }

        }
    }
}
</style>
