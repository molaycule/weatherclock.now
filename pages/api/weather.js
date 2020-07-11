import fetch from 'node-fetch';

export default (req, res) => {
  return new Promise((resolve) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.long}&units=metric&appid=${process.env.OPEN_WEATHER_MAP}`
    )
      .then((res) => res.json())
      .then((data) => {
        res.json(data);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        res.status(502).end('Service is down');
        resolve();
      });
  });
};
