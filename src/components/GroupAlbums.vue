<template>
    <div :class="['group',letter]">
        <album v-for="album in albums" :key="album.upc" :album="album"></album>
    </div>
</template>

<script>
import Album from '@/components/Album'

export default {
    mounted() {
        console.log(this.letter)
    },
    props: {
        albums: {
            type: Array,
            required: true
        },
        letter: {
            type: String,
            required: true
        }
    },
    components: {
        Album
    }
}
</script>

<style lang="scss" scoped>

</style>
