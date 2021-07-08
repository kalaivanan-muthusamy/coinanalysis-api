function getObjectKeysMaxNum(obj) {
    return Math.max(...Object.keys(obj).map(numString => parseInt(numString)))
}

function sortObjectByValue(obj, order = 'ASC') {
    const a = order === 'ASC' ? -1 : 1;
    return Object.entries(obj)
        .sort((a, b) => a[1] <= b[1] ? -a : a)
        .reduce((acc, pair) => {
            return { ...acc, [pair[0]]: pair[1] }
        }, {})
}

module.exports = {
    getObjectKeysMaxNum,
    sortObjectByValue
}