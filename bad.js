let c = 0;

function increment() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const curr = c;

      setTimeout(() => {
        c = curr + 1;
        resolve();
      }, Math.floor(Math.random() * 50));
    }, Math.floor(Math.random() * 20));
  });
}

async function boot() {
  c = 0;

  const p = [];

  for (let i = 0; i < 15; i++) {
    p.push(increment());
  }

  await Promise.all(p);

  return c;
}

function test() {
  boot().then((c) => {
    console.log(`got ${c}`);
  });
}

test();
