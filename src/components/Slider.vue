<template>
<div id="slider">
    <curve-silder></curve-silder>
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
    width: 75px;
    height: 100%;
    padding-bottom: 16px;
    padding-top: 16px;
}
</style>
