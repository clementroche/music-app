<template>
    <div class="btn">
        <div class="icon">
            <img :src="icon" alt="">
        </div>
        <div class="wording">{{ wording }}</div>
    </div>
</template>

<script>

export default {
    props: {
        icon: {
            type: String,
            required: true,
        },
        wording: {
            type: String,
            required: true
        }
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
        height: 50px;
        cursor: pointer;

        &.scale {
            img {
                transform: scale(1.75);
            }
        }

        .icon {
            height: 20px;
            width: 100%;

            img {
                height: 100%;
                width: 100%;
            }
        }

        .wording {
            margin-top: 8px;
            font-family: $subtitle-font;
            color: $text-secondary-color;
            font-weight: 800;
            font-size: 0.8rem;
            
            &:first-letter {
                text-transform: uppercase;
                
            }
        }
    }
</style>
