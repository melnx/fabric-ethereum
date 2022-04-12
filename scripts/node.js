'use strict';

const settings = require('../settings/local');
const Ethereum = require('../services/ethereum');

const HTTPServer = require('@fabric/http/types/server');

async function main (input = {}) {
  const ethereum = new Ethereum(input);
  const http = new HTTPServer(input.http);

  ethereum.on('log', function (msg) {
    console.log('[ETHEREUM]', 'Log:', msg);
  });

  ethereum.on('beat', function (beat) {
    console.log('[ETHEREUM]', 'Beat:', beat);
    console.log('[ETHEREUM]', 'Latest State:', beat['@data'].data.state);
  });

  http.on('log', function (msg) {
    console.log('[HTTP] [LOG]', msg);
  });

  await http.start();
  return ethereum.start();
}

main(settings).catch((exception) => {
  console.error('[ETHEREUM]', 'Main Process Exception:', exception);
}).then((output) => {
  console.log('[ETHEREUM]', 'Process Ready:', output);
});
