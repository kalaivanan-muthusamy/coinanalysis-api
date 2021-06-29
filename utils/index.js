function getObjectKeysMaxNum(obj) {
    return Math.max(...Object.keys(obj).map(numString => parseInt(numString)))
}

module.exports = {
    getObjectKeysMaxNum
}