> Note: Below answers are put in case we're not using react-compiler for building

# 1. `WalletBalance` interface is lack of `blockchain` property and `formatted` property

# 2. Clunky usage for `getPriority`

- The function is using `any` for type (while this is a simple function), that ruins the meaning of using Typescript.
- The function is unnecessary re-defined every render.
- The function uses string as values for switch-case, which is not good for maintenance later, in case we need to change some string values, we need to go around to find all of those values to change, that would take time and easily make mistake somewhere.

# 3. `sortedBalances` logic is wrong

- In the filter function, it's using an undefined value `lhsPriority`, base on the logic, it should be `balancePriority` to filter balance with supported chains
- It's removing out balances with positive amount, that makes the sorted logic to be nonsense, so instead of `<= 0` we should change it to `> 0`
- Sort logic can be simplified

# 4. `formattedBalance` is unused in this component

- Base on the code, we can understand that the original `balances` from the hook doesn't have `formatted` property, else, we won't need to recalculate it again in this component, so `formattedBalance` is necessary but forgot to be used in current code

# 5. `WalletRow` is using `index` as `key`

- Using `index` as `key` is not an optimized way to render list. Especially in our case where the wallet balance can be changed continously which will affect the order of the list, then, using `index` instead of a unique constant value like `currency` will make the React to re-render the whole list, instead of just rendering changed items.

# 6. `usdValue` can be pre-calculated and memoized like `formatted` property

# => Combine above 6 problems, we can refactor code like this:

https://github.com/JinNguyen96/code-challenge/blob/60a6bb0cf185def3df9a63a5b33e298e6914fea8/src/problem3/refactored.tsx#L1C1-L68C3

With above refactored code:

- We removed redundant code and also update interfaces to make it work
- We don't need long if statement codes for the filter logic but it's still clear enough for us to understand the rule of it thanks to the way we use enum for blockchain name.
- And later, if we want to add new value for supported blockchain or change existing one, we can simply update the enum without worry about missing somewhere.
- Using currency as key will help optimize performance rending list items on balance changing
