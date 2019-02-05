import Vuex from 'vuex'

import Vue from 'vue'

Vue.use(Vuex)


export default new Vuex.Store({
        state: {
            lettersOffset: {},
            scrollAmount: 0,
            currentLetterIndex: 0,
            alphabet: '#abcdefghijklmnopqrstuvwxyz',
            albums: []
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
            addLetter(state, letter) {
                if(!state.lettersOffset[letter]) {
                    state.lettersOffset[letter] = 0
                }
            },
            updateLetterOffset(state, args) {
                state.lettersOffset[args.letter] = args.offsetTop
                state.currentLetterIndex = Object.values(state.lettersOffset).findIndex((element)=>{
                    return element >= 0
                })
            },
            scroll(state, amount) {
                state.scrollAmount += amount
            },
            FETCH_USERS(state, albums) {
                state.albums = albums.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            }
        },
        actions: {
            fetchAlbums(context)  {         
                fetch("http://api.napster.com/v2.2/genres/g.146/albums/top?apikey=ZmE2NmVjYjMtMThhYi00ZjZiLWFlOWMtYjQ5MGVjYzk4ZWZk")
                .then((response) => {
                    response.json()
                    .then((data)=>{
                        context.commit("FETCH_USERS", data.albums);
                        // console.log(Object.keys(context.state.lettersOffset)[context.state.currentLetterIndex])
                        //INIT BUILD LETTERSOFFSER
                    })
                    
                    
                    // self.filterUsers(); 
                })
                .catch((error => {
                    console.log(error.statusText)
                }))
            }
        }
    })