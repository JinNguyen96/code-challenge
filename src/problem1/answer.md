# 3 ways to sum to n

## Iteration loop

```typescript
function sumToN(n: number) {
  let sum = 0;
  for (i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}
```

### Time Complexity: O(n)

> The amount of work for iteration loop is changed base on `n`, the higher value of n, the higher amount of steps
> => time complexity is O(n)

### Space Complexity: O(1)

> This approach uses 3 variables for storing value: `n`, `sum`, `i`. No variable is added on any steps, only change value for `i` and `sum` which is not changing usage memory with the change of `n` => space complexity is O(1)

## Mathematics

```typescript
function sumToN(n: number) {
  const sum = (n * (n + 1)) / 2;
  return sum;
}
```

### Time complexity: O(1)

> this approach only has 1 step no matter what value of `n` is => time complexity is O(1)

### Space compexity: O(1)

> this approach only use `sum` to calculate value from `n`, it doesn't add more variable to calculate, so no additional memory is used with different value of `n` => space complexity is O(1)

## Recursion

```typescript
function sumToN(n: number) {
  if (n === 0) return 0;
  return n + sumToN(n - 1);
}
```

### Time complexity: O(n)

> this approach has `n` times call recusive function, the higher value of `n` is, the more steps it need to calculate the value of `n` => time complexity is O(n)

### Space Complexity: O(n)

> this approach calls the function multiple times, for every step, it add a new frame to the callstack for active function to wait for the result of the next function. The higher value of n, the more frames will be add to the stack, the more memory will be used => space complexity is O(n)
