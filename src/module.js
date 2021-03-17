console.log('module.js')

async function start() {
   return await Promise.resolve('async wo')
}

start().then(console.log)