<template>
    <div id="actions-player">
        <div class="container">
            <btn-actions-player :icon="'../static/icons/back.svg'"></btn-actions-player>
            <btn-actions-player :icon="'../static/icons/play.svg'" :isPlayButton="true"></btn-actions-player>
            <btn-actions-player :icon="'../static/icons/back180.svg'"></btn-actions-player>
        </div>
    </div>
</template>

<script>
import BtnActionsPlayer from '@/components/BtnActionsPlayer'
export default {
    components: {
        BtnActionsPlayer
    }
}
</script>

<style lang="scss" scoped>
    #actions-player {
        padding: 0 16px;
        position: relative;
        top: -30px;

        .container {
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
        }
    }
</style>
