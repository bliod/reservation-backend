//define function to get dates week number
Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = (today - onejan + 86400000) / 86400000;
    return Math.ceil(dayOfYear / 7);
};

const checkIsSameWeek = (isUserExist, date) => {
    console.log('on')
    const reservations = isUserExist[0].reservations;
    const weeks = reservations.map((el) => el.getWeek());
    let reqWeek = new Date(date).getWeek();
    return weeks.some((el) => el === reqWeek);
}

module.exports = checkIsSameWeek;
