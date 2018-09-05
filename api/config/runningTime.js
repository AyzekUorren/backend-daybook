let startTimestamp;

module.exports.getTimestamp = () => {
    if (!startTimestamp) {
        startTimestamp = new Date();
    }
    return startTimestamp;
};

module.exports.getTimeRun = () => {
  let nowTime = new Date();
  return (nowTime.getTime() - startTimestamp.getTime()) / 1000;
}
