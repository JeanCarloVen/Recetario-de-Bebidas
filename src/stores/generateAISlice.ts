import type { StateCreator } from "zustand";
import aiService from "../services/aiService";

export type GenerateAISliceType = {
    recipe: string
    isGenerating: boolean
    generateRecipe: (prompt: string) => Promise<void>
}

export const createGenerateAISlice : StateCreator<GenerateAISliceType> = (set) => ({
    recipe: '',
    isGenerating: false,
    generateRecipe: async (prompt) => {
        set({recipe: '', isGenerating: true})
        const data = await aiService.generateRecipe(prompt)

        //Se continuará ejecutando el for mientras el data siga teniendo información
        for await( const textPart of data){
            set((state => ({
                recipe: state.recipe + textPart
            })))
        }
        set({ isGenerating: false})
    }
})