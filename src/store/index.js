import Vuex from 'vuex'

import Vue from 'vue'

Vue.use(Vuex)


export default new Vuex.Store({
        state: {
            lettersOffset: {},
            scrollAmount: 0,
            currentLetterIndex: 0,
            alphabet: '#abcdefghijklmnopqrstuvwxyz',
            albums: [],
            albumsLength: 0
        },
        getters: {
            currentLetterAlphabetIndex(state) {
                return state.alphabet.indexOf(Object.keys(state.lettersOffset)[state.currentLetterIndex])
            },
            currentLetter(state) {
                return Object.keys(state.lettersOffset)[state.currentLetterIndex]
            },
            scrollAmount (state) {
                return state.scrollAmount
            }
        },
        mutations: {
            updateLetterOffset(state, args) {
                state.lettersOffset[args.letter] = args.offsetTop
                state.currentLetterIndex = Object.values(state.lettersOffset).findIndex((element)=>{
                    return element >= 0
                })
            },
            scroll(state, amount) {
                state.scrollAmount += amount
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
                fetch("http://api.napster.com/v2.2/genres/g.146/albums/top?apikey=ZmE2NmVjYjMtMThhYi00ZjZiLWFlOWMtYjQ5MGVjYzk4ZWZk")
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