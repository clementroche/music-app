<template>
<div id="slider">
    <curve-silder :height="550"></curve-silder>
    <labels-slider></labels-slider>
</div>
</template>

<script>
import CurveSilder from '@/components/CurveSlider'
import LabelsSlider from '@/components/LabelsSlider'

export default {
    name: 'slider',
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
