<template>
    <div id="actions-album">
        <div class="container">
            <btn-actions-album :wording="'playlist'" :icon="'../static/icons/add-playlist.svg'"></btn-actions-album>
            <btn-actions-album :wording="'cruch'" :icon="'../static/icons/crush.svg'"></btn-actions-album>
            <btn-actions-album :wording="'more'" :icon="'../static/icons/more.svg'" class="scale"></btn-actions-album>
        </div>
    </div>
</template>

<script>
import BtnActionsAlbum from '@/components/BtnActionsAlbum'
export default {
    components: {
        BtnActionsAlbum
    }
}
</script>

<style lang="scss" scoped>
    #actions-album {
        padding: 0 16px;
        .container {
            display: flex;
            width: 100%;
            justify-content: center;
        }
    }
</style>
