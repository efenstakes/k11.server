


// generate a random alphanumeric string
module.exports.generate_code = () => {
    return Math.random().toString(36).replace('0.', '') 
}