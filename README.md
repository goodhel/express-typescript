ESLint
```
npx eslint --init

How would you like to use ESLint?
- To check syntax, find problems, and enforce code style.
What type of modules does your project use?
- JavaScript modules (import/export)
Which framework does your project use?
- None of these
Does your project use TypeScript?
- Yes
Where does your code run?
- Node
How would you like to define a style for your project?
- Use a popular style guide
Which style guide do you want to follow?
- Standard
What format do you want your config file to be in?
- JSON
Would you like to install them now with npm?
- Yes
```

Prettier
```
npm install --save-dev --save-exact prettier

run prettier
prettier --config .prettierrc.json --write src/**/*.ts
```

Husky
```
npm i --save-dev husky pretty-quick
```

Jest
```
npm i -D jest @types/jest ts-jest
jest --init
```

Supertest
```
npm i -D supertest @types/supertest
```