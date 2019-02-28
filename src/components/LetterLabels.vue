<template>
    <div :class="['letter',active ? 'active' : '']" :style="animation">
        {{letter}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            right: 16
        }
    },
    props: {
        letter: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        animation() {
            if(this.active) {
                return {
                    transform: `translateX(${this.right}px) scale(${1.75})`
                }
            } else {
                return {
                    transform: `translateX(${this.right}px)`
                }
            }

        }
    },
    mounted() {
            TweenLite.to(this, 1.5, {
                ease: Elastic.easeOut.config(1.2, 0.3),
                delay: 0.75 + (0.01*this.index),
                right: 0,
            });
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';
    .letter {
        background: linear-gradient(90deg, $primary-color, $secondary-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: $title-font;
        font-weight: bolder;
        text-transform: uppercase;
        font-size: 0.8rem;
        line-height: 0.8rem;
        text-align: center;

        &.none {
          opacity: 0.5;
        }

        &.active {
            // font-size: 1.25rem;
            // line-height: 1.25rem;
            transform: scale(1.75)
        }
    }
</style>
