const isRightTriangle = require('./isRightTriangle');

test('3, 4, 5 is triangle', () => {
    expect(isRightTriangle(3, 4, 5)).toBe(true);
});

test('0, 4, 5 is not triangle', () => {
    expect(isRightTriangle(0, 4, 5)).toBe(false);
});

test('-4, 5, 6 is not triangle', () => {
    expect(isRightTriangle(-4, 5, 6)).toBe(false);
});

test('A, 4, 5 is not triangle', () => {
    expect(isRightTriangle('A', 4, 5)).toBe(false);
});

test('10000005, 4, 5 is not triangle', () => {
    expect(isRightTriangle(10000005, 4, 5)).toBe(false);
});

test('6.5, 4, 5 is not triangle', () => {
    expect(isRightTriangle(6.5, 4, 5)).toBe(false);
});




