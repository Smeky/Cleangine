import { getModuleExports } from '../../utils/module/getModuleExports'


export default getModuleExports(
    import.meta.glob(['./*.js', '!./index.js'], { eager: true })
)
