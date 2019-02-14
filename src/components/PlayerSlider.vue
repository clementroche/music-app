<template>
    <div id="slider">
        <div class="container">
            <div class="bar"></div>
            <div class="cursor">
                <div class="border"></div>
                <div class="inner"></div>
            </div>
            <div class="fill"></div>
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

#slider {
    width: 100%;
    padding: 0 16px;

    .container {
        width: 100%;
        position: relative;
        >div {
            position: absolute;
        }
    }

    .bar {
        background: $text-secondary-color;
        height: 4px;
        border-radius: 4px;
        width: 100%;
        top:0px;
        left: 0px;
    }

    .fill {
        background:linear-gradient(45deg, $primary-color, $secondary-color);
        top:0px;
        left: 0px;
    }
}

</style>
