<template>
    <div :class="['btn',isPlayButton ? 'playpause' : '']" @click="onClick">
        <div class="border"></div>
        <div class="background"></div>
        <div class="icon">
            <img :src="icon" alt="">
        </div>
    </div>
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
        }
    },
    methods: {
        onClick() {
            this.$emit('triggered')
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
