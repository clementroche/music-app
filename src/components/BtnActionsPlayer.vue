<template>
        <transition v-on:enter="enter" appear>
        <div :class="['btn',isPlayButton ? 'playpause' : '']" @click="onClick">
                <transition v-on:enter="enterBorder" appear>
            <div class="border"></div>
            </transition>
            <div class="background"></div>
            
                <div class="icon">
                    <transition v-on:enter="enterIcon" appear>
                    <img :src="icon" alt="">
                    </transition>
                </div>
            
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        isPlayButton: {
            type: Boolean,
            required: false
        },
        icon: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        onClick() {
            this.$emit('triggered')
        },
        enter(el,done) {
            let delay = 0.75 + (0.1*this.index)
            TweenLite.to(el, 0, {
                delay: 0,
                ease: Elastic.easeOut.config(1, 0.3),
                opacity:0,
            });
            TweenLite.to(el, 0.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity:1,
                onComplete: ()=> {
                    done()
                }
            });
        },
        enterIcon(el,done) {
            let delay = 1 + (0.1*this.index)
            TweenLite.to(el, 0, {
                delay: 0,
                ease: Elastic.easeOut.config(1, 0.3),
                scale:0
            });
            TweenLite.to(el, 1.5, {
                delay: delay,
                ease: Elastic.easeOut.config(1, 0.3),
                scale:1,
                onComplete: ()=> {
                    done()
                }
            });
        },
        enterBorder(el,done) {
            let delay = 0.75 + (0.1*this.index)
            TweenLite.to(el, 0, {
                delay: 0,
                ease: Elastic.easeOut.config(1, 0.3),
                scale:0.2
            });
            TweenLite.to(el, 1.5, {
                delay: delay,
                ease: Elastic.easeOut.config(1, 0.3),
                scale:1.15,
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

    .btn {
        width: 38px;
        height: 38px;
        position: relative;
        box-shadow: $soft-shadow;
        border-radius: 100%;
        margin: 0 16px;
        cursor: pointer;
        &.isPlaying {
            .background {
                background:$text-secondary-color;
            }
        }

        &.playpause {
            width: 56px;
            height: 56px;
            >.icon {
                img {
                    height: 40%;
                }
            }
        }

        >div:not(.icon) {
            position: absolute;
            top: 0px;
            left: 0px;
            height: 100%;
            width: 100%;
            border-radius: 100%;
        }
        
        .border {
            background: $background-color;
            transform: scale(1.15);
            z-index: 1;
        }

        .background {
            background:linear-gradient(45deg, $primary-color, $secondary-color);
            z-index: 2;
        }

        .icon {
            z-index: 3;
            display: flex;
            height: 100%;

            img {
                 z-index: 3;
                margin: auto;
                height: 25%;
                // max-width: 100%;
            }
        }
    }
</style>
