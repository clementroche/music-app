<template>
    <div id="bottom" ref="bottom">
        <div class="head">
            <h3>title</h3>
            <div class="save">
                <div>save</div>
            </div>
        </div>
        <tracks-list></tracks-list>
    </div>
</template>

<script>
import TracksList from '@/components/TracksList'
export default {
    components: {
        TracksList
    },
    mounted() {
        document.addEventListener('wheel', (e) => {
            // if(this.$refs.list) {
                this.onScroll(e)
            // }
            
        })
    },
    methods: {
        onScroll() {
            console.log('scroll')
            console.log(this.$refs.bottom.offsetHeight,this.$refs.bottom.offsetTop)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

#bottom {
    margin-top: 28px;
    padding: 0 32px;
    
    .head{
        display: flex;
    
        h3 {
            font-family: $title-font;
            text-transform: uppercase;
            color: #000;
            display: inline;
            margin-right: 32px;
        }

        .save {
            font-family: $subtitle-font;
            color: $text-secondary-color;
            border: 1px solid $primary-color;
            padding: 0 12px;
            border-radius: 24px;
            font-weight: 700;
            font-size: 0.8rem;
            display: flex;
            margin: 5px;
            
            div {
                margin: auto;

                &::first-letter {
                    text-transform: uppercase;
                }
            }

        }
    }
}
</style>
