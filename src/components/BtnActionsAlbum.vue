<template>
    <transition v-on:enter="enter" appear>
        <div class="btn">
            <div class="icon">
                <slot></slot>
                <!-- <img :src="icon" alt=""> -->
            </div>
            <div class="wording">{{ wording }}</div>
        </div>
    </transition>
</template>

<script>

export default {
    props: {
        wording: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        enter(el,done) {
            let delay = 1 + (0.1*this.index)
            
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
                scale:0,
                onComplete: ()=> {
                    done()
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';



    .btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0 16px;
        width: 50px;
        height: 40px;
        cursor: pointer;



        &.scale {
            .icon {
                transform-origin: center center;
                transform: scale(1.75);
            }
        }

        .icon {
            height: 100%;
            width: 100%;
            display: flex;

            img {
                height: 100%;
                // width: 100%;
            }
        }

        .wording {
            margin-top: 8px;
            font-family: $subtitle-font;
            color: $text-secondary-color;
            font-weight: 600;
            font-size: 0.8rem;
            
            &:first-letter {
                text-transform: uppercase;
                
            }
        }
    }
</style>
