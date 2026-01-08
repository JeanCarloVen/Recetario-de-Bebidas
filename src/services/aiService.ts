import { openrouter } from '../lib/ai'
import {streamText} from 'ai'

export default {
    async generateRecipe(prompt: string){
        const result = streamText({
            model: openrouter('deepseek/deepseek-r1-0528:free'),
            prompt: prompt
        })

        //console.log(result.textStream)

        return result.textStream

    }
}