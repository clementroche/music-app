<template>
<div id="curve">
    <svg width="40" height="550" xmlns="http://www.w3.org/2000/svg" id="svg" ref="svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
 <stop offset="0%" stop-color="transparent" />
      <stop offset="8%" stop-color="#5bf1d9" />
      <stop offset="92%" stop-color="#84f4fb" />
 <stop offset="100%" stop-color="transparent" />
    </linearGradient>
  </defs>
<path :d="path" stroke-width="3" fill="transparent"  stroke="url(#gradient)" />
</svg>
</div>
</template>

<script>
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
            delta: 0
        }
    },
    computed: {
        path() {
            let d = `M ${this.points[0][0]} ${this.points[0][1] + this.delta}`;
            for (let i = 1; i < this.points.length; i++) {
                d += ` Q  ${this.points[i][0]} ${this.points[i][1] + this.delta} ${

this.points[i][2]

} ${this.points[i][3] + this.delta}`;
            }
            return d;
        }
    }
}
</script>

<style lang="scss" scoped>
#curve {
    position: absolute;
    top: 0px;
    left: 0px;
}
</style>
