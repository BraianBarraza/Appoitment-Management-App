
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'
import {generateClasses} from '@formkit/themes'

export default defaultConfig({
  config: {
    classes: generateClasses({
      global:{
        wrapper:'space-y-2 mb-3',
        message: 'bg-red-500 text-white text-center text-sm font-bold uppercase p-2 my-5',
        label: 'block mb-1 font-bold text-white',
        input: 'w-full p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent',
      },
      submit:{
        input:'$reset bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold w-full p-3 mt-10'
      }
    }),
  },
})
