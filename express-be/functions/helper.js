


function getNowDate() {
    const now = new Date();
    const timestamp = now.toISOString();
    return timestamp
}


module.exports = { getNowDate }