import fetch from 'node-fetch';

export default (req, res) => {
  return new Promise((resolve) => {
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${req.query.lat}+${req.query.long}&key=${process.env.OPEN_CAGE_DATA}`
    )
      .then((res) => res.json())
      .then((data) => {
        res.send(data.results[0].formatted);
        resolve();
      })
      .catch((err) => {
        console.log(err);
        res.status(502).end('Service is down');
        resolve();
      });
  });
};
