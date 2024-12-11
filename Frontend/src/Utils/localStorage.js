
//get favorites from local storage
export const getFavoritesFromLocalStorage = () => {
    const favoritesJSON = localStorage.getItem('favorites')
    return favoritesJSON ? JSON.parse(favoritesJSON) : []
}

//add favorites to local storage
export const addFavoritesToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage()
    if (!favorites.some((favProduct) => product._id === favProduct._id)) {
        favorites.push(product)
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}

//remove product from favorites
export const removeFavoritesFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage()
    const updateFavorites = favorites.filter((favProduct) => productId !== favProduct._id)
    localStorage.setItem('favorites', JSON.stringify(updateFavorites))
}