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
            maxScroll: 0,
            player: {
                current: {
                    name: null,
                    artistName: null,
                    links: {
                        images:{
                            href: null
                        }
                    }
                },
                scroll:0,
                currentTracks: [],
                playingTrack: 1,
                isPlaying: false,
                currentTime: 0,
                currentTimeFromSlider: 0,
                maxScroll: 0,
                covers: [
                    {url: ''},
                    {url: ''}
                ]
            }
        },
        getters: {
            player (state) {
                return state.player
            },
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
            },
            currentAlbum(state) {
                return state.player.current
            },
            currentTracks(state) {
                return state.player.currentTracks
            },
            playingTrack(state) {
                return state.player.playingTrack
            },
            playingTrackURL(state) {
                if(!!state.player.currentTracks[state.player.playingTrack]) {
                    return state.player.currentTracks[state.player.playingTrack].prewiewURL
                } else {
                    return undefined
                }
            },
            isPlaying(state) {
                return state.player.isPlaying
            },
            currentTime(state) {
                return state.player.currentTime
            },
            currentTimeFromSlider(state) {
                return state.player.currentTimeFromSlider
            },
            playerScroll(state) {
                return state.player.scroll
            },
            playerMaxScroll(state) {
                return state.player.maxScroll
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
            playerScroll(state,amount) {
                state.player.scroll = amount
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
            setPlayingTrack(state, index) {
                state.player.playingTrack = index
            },
            toggleIsPlaying(state) {
                state.player.isPlaying = !state.player.isPlaying
            },
            setIsPlaying(state,value) {
                state.player.isPlaying = value
            },
            setCurrentTime(state, time) {
                state.player.currentTime = time
            },
            setCurrentTimeFromSlider(state, time) {
                state.player.currentTimeFromSlider = time
            },
            updateTrack(state,value) {
                if(state.player.playingTrack + value > state.player.currentTracks.length-1) {
                    state.player.playingTrack = 1
                } else if(state.player.playingTrack + value <= 0){
                    // state.player.playingTrack = state.player.currentTracks.length-1
                    state.player.playingTrack=1
                } else {
                    state.player.playingTrack += value
                }
            },
            setPlayerMaxScroll(state,max) {
                state.player.maxScroll = max
            },
            setCovers(state,covers) {
                state.player.covers = covers
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
            },
            FETCH_ALBUM_DATA(state,album) {
                state.player.current = album
            },
            FETCH_ALBUM_TRACKS(state, tracks) {
                state.player.currentTracks = tracks
            }
        },
        actions: {
            fetchAlbums(context) {         
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
            },
            fetchAlbumData(context,id) {
                fetch(`https://api.napster.com/v2.2/albums/${id}?apikey=ZmE2NmVjYjMtMThhYi00ZjZiLWFlOWMtYjQ5MGVjYzk4ZWZk`)
                .then((response) => {
                    response.json()
                    .then((data)=>{
                        // console.log(data.albums[0])
                        context.commit('FETCH_ALBUM_DATA', data.albums[0])
                    })
                })
                .catch((error) => {
                    console.log(error.statusText)
                })
            },
            fetchAlbumTracks(context,id) {
                fetch(`https://api.napster.com/v2.2/albums/${id}/tracks?apikey=ZmE2NmVjYjMtMThhYi00ZjZiLWFlOWMtYjQ5MGVjYzk4ZWZk`)
                    .then((response) => {
                        response.json()
                        .then((data)=>{
                            // console.log(data.tracks)
                            context.commit('FETCH_ALBUM_TRACKS', data.tracks)
                        })
                    })
                    .catch((error) => {
                        console.log(error.statusText)
                    })
            }
        }
    })