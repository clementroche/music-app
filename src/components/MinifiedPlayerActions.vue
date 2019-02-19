<template>
    <div id="minified-player-actions">
        <div class="previous">
            <img :src="'../static/icons/back-grey.svg'" alt="">
        </div>
        <div class="playpause">
            <div class="border"></div>
            <div class="background"></div>
            <div class="icon">
                <img :src="'../static/icons/play.svg'" alt="">
            </div>
        </div>
        <div class="next">
            <img :src="'../static/icons/back180-grey.svg'" alt="">
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

    #minified-player-actions {
        display: flex;
        align-items: center;
        .previous,.next {
            cursor: pointer;
            height: 16px;
            img {
                height: 80%;
            }
        }
        .playpause {
            cursor: pointer;
            margin: 0 8px;
            height: 32px;
            width: 32px;
            position: relative;
            display: flex;
            .isPlaying {
                .background {
                    
                }
            }
            .background {
                background:linear-gradient(45deg, $primary-color, $secondary-color);
            }
            .border {
                transform: scale(1.2);
                background: #ffffff;
            }
            .border,.background {
                height: 100%;
                width: 100%;
                position: absolute;
                top: 0px;
                left: 0px;
                border-radius: 100%;
            }
            .icon {
                height: 50%;
                margin: auto;
                position: relative;
                z-index: 3;
            }
            
        }
        img {
            height: 100%;
        }
    }
</style>
