// mock/delay.ts
export const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

// in each mock function, first line:
await delay()