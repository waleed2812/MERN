exports.getRandomInt = (limit = 1000, start = 0) =>
  Number.parseInt(Math.random() * Number.parseInt(limit-start)) + Number.parseInt(start);
