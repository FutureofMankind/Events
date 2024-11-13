import randomСondition from '../randomСondition';

const lastCell = 1;
const boardSize = 2;
const testArr = [];
const cellsTrue = [0, 2, 3];

for (let i = 0; i < 30; i += 1) {
  const random = randomСondition(lastCell, boardSize);
  const received = cellsTrue.includes(random);
  testArr.push([received, true]);
}

test.each(testArr)(
  ('random function test in the amount of 30 values'),
  (received, expected) => {
    expect(received).toBe(expected);
  },
);
