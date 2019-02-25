<template>
    <div id="bottom" ref="bottom">
        <div class="background" :style="bottom"></div>
            <div class="head" :style="bottom">
                <transition v-on:enter="enterH3" appear>
                    <h3>TRACKS</h3>
                </transition>
                <transition v-on:enter="enterSave" appear>
                    <div class="save">
                        <div>save</div>
                    </div>
                </transition>
            </div>
        <tracks-list id="tracks" ref="tracks"></tracks-list>
    </div>
</template>

<script>
import TracksList from '@/components/TracksList'
export default {
    data() {
        return {
            deltaY: 0
        }
    },
    components: {
        TracksList
    },
    mounted() {
        setTimeout(()=>{
            document.addEventListener('wheel', (e) => {
                this.onScroll(e.deltaY)
            })
        },500)
    },
    computed: {
        playerScroll() {
            return this.$store.getters.playerScroll
        },
        bottom() {
            return {
                transform: `translateY(${Math.max(this.deltaY,-540)}px)`
            }
        }
    },
    watch: {
        playerScroll() {
            TweenLite.to(this, 1.5, {
                ease: Elastic.easeOut.config(1, 0.3),
                deltaY: this.playerScroll,
            });
        },
    },
    methods: {
        onScroll(deltaY) {
            if(this.$refs.tracks){
                let maxScroll = Math.max(document.querySelector('#top').offsetHeight + 28,this.$refs.tracks.$el.offsetHeight) + 100 
                this.$store.commit('setPlayerMaxScroll',maxScroll)
                if(this.playerScroll +( Math.sign(deltaY)*50) >= -maxScroll) {
                    let amount = Math.min(this.playerScroll +( Math.sign(deltaY)*50),0)
                    this.$store.commit('playerScroll', amount)
                } else {
                    let amount = -maxScroll
                    this.$store.commit('playerScroll', amount)
                }
            }
        },
        enterH3(el, done) {
            let delay = 1
            
            TweenLite.from(el, 1.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity:0,
                onComplete: ()=>{
                    // done()
                }
            });

            TweenLite.from(el, 1.5, {
                delay: delay,
                ease: Elastic.easeOut.config(1, 0.3),
                y:16,
                onComplete: ()=> {
                    done()
                }
            });
        },
        enterSave(el, done) {
            let delay = 1.25
            
            TweenLite.from(el, 1.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity:0,
                onComplete: ()=>{
                    // done()
                }
            });

            TweenLite.from(el, 1.5, {
                delay: delay,
                ease: Elastic.easeOut.config(1, 0.3),
                y:16,
                onComplete: ()=> {
                    done()
                }
            });
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
        top:-32px;
        left: 0px;
        background: linear-gradient(0deg,#ffffff 98%,rgba(0,0,0,0.001));
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
