const test = require('ava').default;

test('Test to pass.', (t) => {
  t.pass();
});

test('Test vaule', async(t) => {
    const a =1;
    t.is(a + 1,2);
});

const sum = (a, b) => a + b;
test('sum', async(t) => {
    t.plan(2);
    t.pass('Plan(2) assertion passed');
    t.is(sum(1, 2), 3);
});