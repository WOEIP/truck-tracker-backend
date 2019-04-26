const http = require('http');

let OSRM = {};

OSRM.getRoute = function (coordinates) {
  const OSRMRootURL = 'http://127.0.01:5000/match/v1/driving/';

  http.get(OSRMRootURL + coordinates, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received.
    resp.on('end', () => {
      console.log(data);
      return data;
    });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

    return 'Unknown error';
}

module.export = OSRM;
