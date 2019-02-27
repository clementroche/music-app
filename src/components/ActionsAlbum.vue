<template>
<div id="actions-album">
    <div class="container">
        <btn-actions-album :index="1" :wording="'playlist'">
            <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 51 55" style="enable-background:new 0 0 51 55;" xml:space="preserve">
                <path class="st0" d="M50.7,0.2C50.5,0,50.2-0.1,49.9,0L19.2,4.1c-1.2-2-3.5-3.5-6-3.5c-3.9,0-7.1,3.3-7.1,7.2s3.2,7.2,7.1,7.2
                    c1.9,0,3.6-0.7,4.8-1.9v27.2c-1.8-2.2-4.7-3.7-8-3.7c-5.5,0-10,4.1-10,9.1S4.5,55,10,55s10-4.1,10-9.1V12l29-3.8v22.9
                    c-1.8-2.2-4.7-3.7-8-3.7c-5.5,0-10,4.1-10,9.1s4.5,9.1,10,9.1s10-4.1,10-9.1V1.1C51,0.6,50.9,0.3,50.7,0.2z M17.2,8.2h-3.6v3.7
                    c0,0.2-0.2,0.4-0.4,0.4s-0.4-0.2-0.4-0.4V8.2H9.1C8.9,8.2,8.7,8,8.7,7.8c0-0.2,0.2-0.4,0.4-0.4h3.6V3.6c0-0.2,0.2-0.4,0.4-0.4
                    s0.4,0.2,0.4,0.4v3.7h3.6c0.2,0,0.4,0.2,0.4,0.4C17.6,8,17.4,8.2,17.2,8.2z"/>
                </svg>
        </btn-actions-album>
        <btn-actions-album :index="2" :wording="'crush'">
            <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 58 44" style="enable-background:new 0 0 58 44;" xml:space="preserve">
                <g>
                    <g id="Page-1">
                        <g id="Icons" transform="translate(-839 -353)">
                            <g id="_x37_--Lovestruck--_x28_Solid_x29_" transform="translate(839 353)">
                                <path id="Fill-170" class="st0" d="M57.3,39.6l-2.6-5.8c-0.1-0.3-0.4-0.5-0.8-0.6c-0.4,0-0.7,0.1-0.9,0.4l-1.4,1.8l-6.1-4.1
                                    c1.5-1.6,2.8-3,3.5-3.7c4-4.5,5.1-10.6,2.9-15.4C50.2,8.2,46.6,6,42.2,6c-4.1,0-7.3,1.7-9.2,4.7C31.1,7.7,28,6,23.9,6
                                    c-3.8,0-7,1.7-8.9,4.7l-3-1.8l-1.1-5.3c-0.1-0.3-0.2-0.5-0.4-0.6L6,0.2C5.6-0.1,4.9,0,4.6,0.5C4.5,0.7,4.5,1,4.5,1.2l1,4.7
                                    l-4.7,1C0.3,7-0.1,7.6,0.1,8.1c0.1,0.3,0.2,0.5,0.4,0.6l4.3,2.8c0.2,0.1,0.5,0.2,0.8,0.1l5.3-1.1l3.2,1.9
                                    c-2,4.8-0.8,10.7,3.1,15.1c2.6,2.9,15.1,16,15.3,16.1c0.4,0.4,1,0.4,1.4,0c0,0,0,0,0,0c0.1-0.1,5.9-6.1,10.4-10.9l6.3,4.2
                                    l-1,1.3c-0.3,0.4-0.3,1.1,0.2,1.4c0.1,0.1,0.3,0.2,0.4,0.2l6.2,1.1c0.5,0.1,1.1-0.3,1.2-0.8C57.4,40,57.4,39.8,57.3,39.6"/>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </btn-actions-album>
        <btn-actions-album :index="3" :wording="'more'" class="scale">
            <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 58 44" style="enable-background:new 0 0 58 44;" xml:space="preserve">
                <g>
                    <circle class="st0" cx="18.2" cy="21.6" r="4.5"/>
                    <circle class="st0" cx="28.9" cy="21.6" r="4.5"/>
                    <circle class="st0" cx="39.8" cy="21.6" r="4.5"/>
                </g>
            </svg>
        </btn-actions-album>
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
            svg {
                fill: #bfbfbf;
                height: 100%;
                margin: auto;
            }
    }
}
</style>
