const http = require('http');

let OSRM = {};

OSRM.getRoute = async coordinates => {
  return new Promise((resolve, reject) => {
      const OSRMRootURL = 'http://127.0.01:5000/match/v1/driving/';
      let routingRequest = http.get(OSRMRootURL + coordinates, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received.
        resp.on('end', () => {
          console.log('HO');
          console.log(data);
          resolve(data);
        });
      });

      routingRequest.on('error', (err) => {
        reject('Error: ' + err.message);
      });

  });
}

module.exports = OSRM;
