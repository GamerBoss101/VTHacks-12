import localtunnel from 'localtunnel';

(async () => {
  const tunnel = await localtunnel({ port: 11424 });

  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  console.log(tunnel.url);

  tunnel.on('close', () => {
    // tunnels are closed
    console.log('Tunnel closed');
  });
})();