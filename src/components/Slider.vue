<template>
<div id="slider" :style="slider">
    <curve-silder :height="550"></curve-silder>
    <labels-slider></labels-slider>
</div>
</template>

<script>
import CurveSilder from '@/components/CurveSlider'
import LabelsSlider from '@/components/LabelsSlider'

export default {
    name: 'slider',
    data() {
        return {
            opacity: 0,
            right: 32
        }
    },
    computed: {
        slider() {
            return {
                transform: `translateX(${this.right}px)`,
                opacity: this.opacity
            }
        }
    },
    mounted() {
        TweenLite.to(this, 1.5, {
            ease: Elastic.easeOut.config(1.2, 0.3),
            delay: 0.75,
            right: 0,
        });

        TweenLite.to(this, 1, {
            ease: Power3.easeOut,
            delay: 0.75,
            opacity: 1
        });
    },
    components: {
        CurveSilder,
        LabelsSlider
    }
}
</script>

<style lang="scss" scoped>
#slider {
    width: 50%;
    height: 100%;
    // max-height: 550px;
    // padding-bottom: 16px;
    // padding-top: 12px;
    position: absolute;
    right: 0px;
    // padding-right: 16px;
}
</style>
