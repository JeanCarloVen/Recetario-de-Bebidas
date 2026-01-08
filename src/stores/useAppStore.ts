import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipesSlice, type RecipeSliceType } from './recipeSlice'
import { createFavoritesSlice, type FavoriteSliceType } from './favoritesSlice'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice'
import { createGenerateAISlice, type GenerateAISliceType } from './generateAISlice'

export const useAppStore = create<RecipeSliceType & FavoriteSliceType & NotificationSliceType & GenerateAISliceType>()(devtools( (...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createGenerateAISlice(...a)
})))