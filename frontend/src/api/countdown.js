export function timeUntilChristmas() {
  let currentDate = new Date();
  let christmas;
  let christmasTrue = false;
  if (currentDate.getDate() > 25 && currentDate.getMonth() === 11) {
    christmas = new Date(currentDate.getFullYear() + 1, 11, 25);
  } else if (currentDate.getDate() === 25 && currentDate.getMonth() === 11) {
    christmasTrue = true;
    christmas = currentDate;
  } else {
    christmas = new Date(currentDate.getFullYear(), 11, 25);
  }

  let totalTime = christmas.getTime() - currentDate.getTime();
  let totalDays = totalTime / 1000 / 60 / 60 / 24
  let hoursLeft = totalDays % 1 * 24
  totalDays -= totalDays % 1
  let minutesLeft = hoursLeft % 1 * 60
  hoursLeft -= hoursLeft % 1
  let secondsLeft = Math.ceil(minutesLeft % 1 * 60)
  minutesLeft -= minutesLeft % 1

  return {
    days: totalDays,
    hours: hoursLeft,
    minutes: minutesLeft,
    seconds: secondsLeft,
    christmas: christmasTrue,
  }
}


