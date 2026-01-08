import type {StateCreator} from 'zustand'
import type { Recipe } from '../types'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice'

export type FavoriteSliceType = {
    favorites: Recipe[]
    modal: boolean
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice : StateCreator<FavoriteSliceType & NotificationSliceType, [], [], FavoriteSliceType> = (set, get,api) => ({
    favorites: [],
    modal: false,
    handleClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)){
            console.log('Sí existe...')
            //Lo elimina
            set({
                favorites: [...get().favorites.filter( favorite => favorite.idDrink !== recipe.idDrink)],
                modal: false
            })
            createNotificationSlice(set,get,api).showNotification({
                text: 'Se eliminó correctamente de favoritos',
                error: false,
            })
        }else{
            console.log('No existe...')
            //Lo agrega
            //Metodo 1
            set({
                favorites: [...get().favorites, recipe],
                modal: false
            })
            //Metodo 2
            // set((state) => ({
            //   favorites: [...state.favorites, recipe],
            // }));

            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agregó a favoritos',
                error: true,
                
            })

            localStorage.setItem('favorites', JSON.stringify(get().favorites))

        }
    },
    favoriteExists: (id) => {
        return get().favorites.some( favorite => favorite.idDrink === id )
    },

    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})


//A esto se le conoce como  Slice Pattern