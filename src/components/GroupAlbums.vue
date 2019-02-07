<template>
<div :class="['group',letter]" ref="group">
    <!-- {{letter}} - {{ offsetTop }} -->
    <album v-for="album in albums" :key="album.upc" :album="album"></album>
    <!-- {{letter}} - {{ offsetBottom }} -->
</div>
</template>

<script>
import Album from '@/components/Album'

export default {
    data() {
        return {
            offsetTop: 0,
            offsetBottom: 0
        }
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
    methods: {
        updateOffset() {
            this.offsetTop = this.$refs.group.offsetTop + this.scrollAmount
            this.offsetBottom = this.offsetTop + this.$refs.group.offsetHeight
            this.$store.commit('updateLetterOffset', {letter: this.letter, offsetTop:this.offsetBottom})
        }
    },
    mounted() {
        this.updateOffset()
    },
    watch: {
        scrollAmount() {
            this.updateOffset()
        }
    },
    computed: {
        scrollAmount() {
            return this.$store.getters.scrollAmount
        }
    },
    components: {
        Album
    }
}
</script>

<style lang="scss" scoped>

</style>
