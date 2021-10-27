const files = require.context('./', true, /index\.js$/)
const modules = {}

/********************************自动导包 start********************************/
files.keys().forEach(filePath => {
    if(filePath === './index.js') return
    const key = filePath.replace(/(\.\/|\/index\.js)/g, '')
    modules[key] = files(filePath).default
})
/********************************自动导包 end********************************/
console.log(modules, 'modules');

export default modules