let c = 0;
let lock = Promise.resolve();

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

function sync() {
  const nextLock = lock.then(() => increment());
  lock = nextLock;
  return nextLock;
}

async function boot() {
  const p = [];

  for (let i = 0; i < 15; i++) {
    p.push(sync());
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
