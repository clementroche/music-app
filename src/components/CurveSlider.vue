<template>
<div id="curve" ref="curve">
    <div class="container">
        <div class="cursor" :style="cursor">
            <div class="middle"></div>
        </div>
        <svg width="46" :height="height" xmlns="http://www.w3.org/2000/svg" id="svg" ref="svg">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop :offset="offset[0] + '%'" stop-color="#ffffff" />
                    <stop :offset="offset[1] + '%'" stop-color="#5bf1d9" />
                    <stop :offset="offset[2] + '%'" stop-color="#84f4fb" />
                    <stop :offset="offset[3] + '%'" stop-color="#ffffff" />
                </linearGradient>
            </defs>
            <path :d="path" stroke-width="3" fill="transparent"  stroke="url(#gradient)" />
        </svg>
    </div>
</div>
</template>

<script>
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export default {
    data() {
        return {
            points: [
                [35, -275],
                [35, 52.5, 35, 100],
                [35, 145, 25, 185],
                [10, 240, 10, 275],
                [10, 310, 25, 365],
                [35, 405, 35, 450],
                [35, 497.5, 35, 825]
            ],
            delta: -275,
            isDown: false,
            movingDelta: 0
        }
    },
    props: {
        height: {
            type: Number,
            required: true
        }
    },
    mounted() {
        if(this.$refs.curve){
            this.$refs.curve.addEventListener('mousedown',(e)=>{
                this.isDown=true
                console.log('down')
            })

            this.$refs.curve.addEventListener('mousemove',(e)=>{
                if(this.isDown){
                    console.log('moove')
                    this.changeLetter(e.offsetY-12)
                    // this.movingDelta = e.offsetY
                    console.log(this.deltaD)
                }
            })

            this.$refs.curve.addEventListener('mouseup',(e)=>{
                this.isDown=false
                console.log('up')
                this.movingDelta = 0
                this.changeLetter(e.offsetY-12)
            })

            this.$refs.curve.addEventListener('click',(e)=>{
                console.log('click')
                this.changeLetter(e.offsetY-12)
            })
        }
    },
    methods: {
        changeLetter(value) {
            let index = Math.round(map_range(value,0,(this.height-50),0,26))
            this.$store.commit('changeLetter',index)
        }
    },
    computed: {
        path() {
            let d = `M ${this.points[0][0]} ${this.points[0][1] + this.deltaD}`;
            for (let i = 1; i < this.points.length; i++) {
                d += ` Q  ${this.points[i][0]} ${this.points[i][1] + this.deltaD} ${this.points[i][2]} ${this.points[i][3] + this.deltaD}`;
            }
            return d;
        },
        current() {
            return this.$store.getters.currentLetterAlphabetIndex
        },
        cursor() {
            return {
                top: this.points[3][3] + this.deltaD-4+'px',
                left: this.points[3][0] - 12+'px'
            }
        },
		range() {
			return 50-((((this.height-40)/2) -this.deltaD) / (this.height-40)) * 100 / 2;
        },
        offset() {
            return [50 - this.range,58 - this.range,92 - this.range,100 - this.range];
        },
        deltaD() {
            return this.delta+this.movingDelta
        }
    },
    watch: {
        current() {
            let d = map_range(this.current, 0, 27, -(this.height-50) / 2, (this.height-50) / 2)
            TweenLite.to(this, 1.5, {
                ease: Elastic.easeOut.config(1.5, 0.3),
                delta: d
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/vars.scss';

#curve {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 5;
    .container {
        position: absolute;
        right: 28px;
        top:12px;
        pointer-events: none;
    }

    .cursor{
        height: 24px;
        width: 24px;
        border-radius: 100%;
        background: linear-gradient(45deg, rgba($color: $primary-color, $alpha: 0.25), rgba($color: $secondary-color, $alpha: 0.25));
        
        position: absolute;
        display: flex;

        .middle {
            margin: auto;
            height: 12px;
            width: 12px;
            border-radius: 100%;
            background:linear-gradient(45deg, $primary-color, $secondary-color);
        }
    }
}
</style>
