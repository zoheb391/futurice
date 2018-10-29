exports.get = key => {
    if (process.env[key] === undefined) {
        console.log('Env "' + key + '" not defined')
    }
    return process.env[key]
}
