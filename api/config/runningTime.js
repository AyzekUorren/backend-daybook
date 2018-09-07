let startTimestamp;

getTimestamp = () => {
    if (!startTimestamp) {
        startTimestamp = new Date();
    }
    return startTimestamp;
};

getTimeRun = () => {
  let nowTime = new Date();
  return (nowTime.getTime() - getTimestamp()) / 1000;
}

module.exports.getTimeRun = (req, res) => {
  let jsonObj = new Object({
    started: getTimestamp(),
    upTime: `${getTimeRun()}sec.`
  });
  res.send(JSON.stringify(jsonObj, null, 4));
  }
