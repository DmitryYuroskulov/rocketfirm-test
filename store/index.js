export const state = () => ({
    searchQuery: null,
    favorites: [],
    searchHistory: [],
    searchHistoryImages: [],
})

export const mutations = {
    addToFavorites(state, image) {
        state.favorites.unshift(image)
    },
    removeFromFavorites(state, image_index) {
        state.favorites.splice(image_index, 1)
    },
    addSearchQuery(state, query) {
        state.searchHistory.unshift(query)
    },
    updateSearchQuery(state, query) {
        state.searchQuery = query
    },
    addSearchHistoryImages(state, images) {
        state.searchHistoryImages = images.concat(state.searchHistoryImages)
    },
}

export const actions = {
    addToFavorites({ commit }, image) {
        commit('addToFavorites', image)
    },
    removeFromFavorites({ commit, state }, image_id) {
        const findedIndex = state.favorites.findIndex(
            (favoriteImage) => favoriteImage.id === image_id
        )

        if (findedIndex < 0) return
        commit('removeFromFavorites', findedIndex)
    },
    isInFavorites({ state }, image_id) {
        const findedImage = state.favorites.find((favoriteImage) => favoriteImage.id === image_id)
        if (!findedImage) return false
        return true
    },
}

export const getters = {
    favorites: (state) => state.favorites,
    searchHistory: (state) => state.searchHistory,
    searchHistoryImages: (state) => state.searchHistoryImages,
}
