
const genCode = (digit = 4) =>{
    return ~~(Math.random()*Math.pow(10, digit))
}

module.exports = genCode