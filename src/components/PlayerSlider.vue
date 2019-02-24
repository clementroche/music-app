<template>
    <div id="slider">
        <div class="container" ref="slider">
            <transition v-on:enter="enterBar" appear>
                <div class="bar"></div>
            </transition>
            <transition v-on:enter="enterCursor" appear>
                <div class="cursor" :style="cursor">
                    <div class="border"></div>
                    <div class="inner"></div>
                </div>
            </transition>
            <transition v-on:enter="enterTime" appear>
                <div class="fill" :style="fill"></div>
            </transition>
        </div>
        <transition v-on:enter="enterTime" appear>
            <div class="time">
                <div class="current">{{currentTime | minutes}}</div>
                <div class="end">0:30</div>
            </div>
        </transition>
    </div>
</template>

<script>
function map_range(value, low1, high1, low2, high2) {
	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
export default {
    data() {
        return {
            width: 0,
            mouseDown: false,
            left: 0,
            moveX: 0
        }
    },
    mounted() {
        this.width = this.$refs.slider.offsetWidth

        this.$refs.slider.addEventListener('click',(e)=>{
            this.updateCurrentTime(e.offsetX)
        })

        this.$refs.slider.addEventListener('mousedown',(e)=>{
            this.mouseDown = true
        })

        this.$refs.slider.addEventListener('mouseup',(e)=>{
            if(this.mouseDown) {
                this.mouseDown = false
                this.updateCurrentTime(e.offsetX)
                this.moveX = 0
            }
        })

        this.$refs.slider.addEventListener('mousemove',(e)=>{
            if(this.mouseDown) {
                this.moveX = this.left - e.offsetX
            }
        })
    },
    methods: {
        updateCurrentTime(x) {
            let t = map_range(x,0,this.width,0,30)
            this.$store.commit('setCurrentTimeFromSlider',t)
        },
        enterBar(el,done) {
            let delay = 1.5
            TweenLite.from(el, 0.5, {
                ease: Power3.easeOut,
                delay: delay,
                width: '0%',
                left: '50%',
                onComplete: () => {
                    done()
                }
            });
        },
        enterCursor(el,done) {
            let delay = 2
            TweenLite.from(el, 0.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity:0,
                onComplete: ()=>{
                    // done()
                }
            });
            
            TweenLite.from(el, 1.5, {
                delay: delay,
                ease: Elastic.easeOut.config(1, 0.3),
                scale:0,
                onComplete: ()=>{
                    done()
                }
            });
        },
        enterTime(el,done) {
            let delay = 2.25
            TweenLite.from(el, 0.5, {
                delay: delay,
                ease: Power3.easeOut,
                opacity:0,
                onComplete: ()=>{
                    // done()
                }
            });
        }
    },
    watch: {
        range() {
            TweenLite.to(this, 1.5, { ease: Elastic.easeOut.config(0.8, 0.3), left: this.range });
        }
    },
    computed: {
        currentTime() {
            return Math.floor(this.$store.getters.currentTime)
        },
        range() {
            return map_range(this.currentTime,0,30,0,this.width)
        },
        cursor() {
            if(Math.floor(this.left) - 8 < 0) {
                return {
                    left: 0 + 'px'
                }
            } else if(Math.floor(this.left) > this.width) {
                return {
                    left: this.width - 8 + 'px'
                }
            } else {
                return {
                    left: Math.floor(this.left - this.moveX) - 8 + 'px'
                }
            }
        },
        fill() {
            if(Math.floor(this.left) - 8 < 0) {
                return {
                    width: 0 + 'px'
                }
            } else if(Math.floor(this.left) > this.width) {
                return {
                    width: this.width - 8 + 'px'
                }
            } else {
                return {
                    width: Math.floor(this.left- this.moveX) - 8 + 'px'
                }
            }
        },
    },
    filters: {
        minutes(seconds) {
            let s = Math.floor(seconds)
            if(s.toString().length < 2) {
                s ='0'+s
            }
            return '0:' + s
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/fonts.scss';
@import '../assets/vars.scss';

#slider {
    width: 100%;
    padding: 0 32px;
    margin-top: 20px;

    .time {
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-family: $subtitle-font;
        color: $text-secondary-color;
        font-weight: 600;
        font-size: 0.8rem;
        // padding-top: 12px; 
    }

    .container {
        height: 32px;
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
        top:14px;
        left: 0px;
    }

    .fill {
        background:linear-gradient(45deg, $primary-color, $secondary-color);
        top:14px;
        left: 0px;
        height: 4px;
        pointer-events: none;
    }

    .cursor {
        pointer-events: none;
        height: 16px;
        width: 16px;
        position: relative;
        top: 8px;
        z-index: 5;
        >div {
            position: absolute;
            top:0px;
        }
        .inner {
            background:linear-gradient(45deg, $primary-color, $secondary-color);
            height: 100%;
            width: 100%;
            border-radius: 100%;
        }
        .border {
            height: 100%;
            width: 100%;
            border-radius: 100%;
            transform: scale(1.2);
            background: #ffffff;
        }
    }
}

</style>
