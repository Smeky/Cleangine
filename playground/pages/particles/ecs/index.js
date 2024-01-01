import { getModuleExports } from 'zenith/utils/module/getModuleExports'

export default getModuleExports(import.meta.glob(['./*.js', '!./index.js'], { eager: true }))
