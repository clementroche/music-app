<template>
<div :class="['group',letter]" ref="group">
    <album v-for="album in albums" :key="album.upc" :album="album" :id="album.upc"></album>
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
            this.offsetTop = this.$refs.group.offsetTop + this.scrollAmount -36
            this.offsetBottom = this.offsetTop + this.$refs.group.offsetHeight
            this.$store.commit('updateLetterOffset', {letter: this.letter, offsetTop:this.offsetBottom})
        }
    },
    mounted() {
        this.updateOffset()
        setTimeout(()=>{
            this.$store.commit('initLetterOffset', {letter: this.letter, offsetTop:this.$refs.group.offsetTop-18})
        },0)
        
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
