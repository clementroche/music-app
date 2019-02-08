import Vuex from 'vuex'

import Vue from 'vue'

Vue.use(Vuex)


export default new Vuex.Store({
        state: {
            originLetterOffset: {},
            lettersOffset: {},
            lettersOffsetValues: [],
            scrollAmount: 0,
            currentLetterIndex: 0,
            alphabet: '#abcdefghijklmnopqrstuvwxyz',
            albums: [],
            albumsLength: 0,
            maxScroll: 0
        },
        getters: {
            // currentLetterAlphabetIndex(state) {
            //     return state.alphabet.indexOf(Object.keys(state.lettersOffset)[state.currentLetterIndex])
            // },
            // currentLetter(state) {
            //     return Object.keys(state.lettersOffset)[state.currentLetterIndex]
            // },
            scrollAmount (state) {
                return state.scrollAmount
            },
            albums(state) {
                return state.albums
            },
            currentLetterIndex(state) {
                return state.lettersOffsetValues.findIndex((element)=>{
                    return element >= 0
                })
            },
            currentLetter(state) {
                return Object.keys(state.lettersOffset)[state.lettersOffsetValues.findIndex((element)=>{
                    return element >= 0
                })]
            },
            currentLetterAlphabetIndex(state) {
                return state.alphabet.indexOf(Object.keys(state.lettersOffset)[state.lettersOffsetValues.findIndex((element)=>{
                    return element >= 0
                })])
            }
        },
        mutations: {
            updateLetterOffset(state, args) {
                state.lettersOffset[args.letter] = args.offsetTop
                state.lettersOffsetValues = Object.values(state.lettersOffset)
            },
            initLetterOffset(state,args) {
                state.originLetterOffset[args.letter] = args.offsetTop
            },
            scroll(state, amount) {
                state.scrollAmount = amount
            },
            changeLetter(state,value) {
                let char = state.alphabet.charAt(value)
                if(!!state.lettersOffset[char]) {
                    state.scrollAmount = Math.max(-state.originLetterOffset[char],state.maxScroll)
                }
            },
            updateMaxScroll(state,value) {
                state.maxScroll = value
            },
            FETCH_ALBUMS(state, albums) {
                let orderedAlbums = {}
                state.albumsLength = albums.length-1
                albums.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                }).forEach((album,index)=>{
                    album.index = index
                    let char = album.name.charAt(0).toLowerCase()
                    if(!state.alphabet.includes(char)) {
                        char = '#'
                    }
                    if(!orderedAlbums[char]) {
                        orderedAlbums[char] = []
                    }
    
                    orderedAlbums[char].push(album)
                    
                })
                state.albums = orderedAlbums
            }
        },
        actions: {
            fetchAlbums(context)  {         
                fetch("https://api.napster.com/v2.2/genres/g.146/albums/top?apikey=ZmE2NmVjYjMtMThhYi00ZjZiLWFlOWMtYjQ5MGVjYzk4ZWZk")
                .then((response) => {
                    response.json()
                    .then((data)=>{
                        context.commit("FETCH_ALBUMS", data.albums);
                    })
                })
                .catch((error => {
                    console.log(error.statusText)
                }))
            }
        }
    })