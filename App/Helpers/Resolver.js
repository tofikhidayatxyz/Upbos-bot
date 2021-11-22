const { moduleAliases } = require('../../package.json')

const path = require('path')

const useResolver = file => {
  if (file.includes('@')) {
    let filePath = path.join(__dirname, '../../', file)
    for (const index in moduleAliases) {
      if (file.includes(index)) {
        filePath = path.join(__dirname, '../../', moduleAliases[index], file.replace(index, ''))
      }
    }
    return require(filePath)
  } else {
    return require(file)
  }
}

global.use = useResolver
