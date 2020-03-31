# codeTyke

A multiple-choice application where children can learn how to code.

Built on a backend with `express`/`sequelize`/`mySQL`/`Heroku` .

## Setup

To use this as boilerplate, you'll need to take the following steps:

- Create a new, empty repo on Github and clone it to your local machine
- Run the following commands:

Now that you've got the code, follow these steps to get acclimated:

- Update project name and description in `package.json`
- `npm install`
- Create mySQL database, using ClearDB MySQL in Heroku.

```
save all secrets in a .env document and .gitignore

```

## Terminal Commands

- `npm run start`
- `npm install express sequelize sequelize-cli --save`
- `npx sequelize-cli init`
- `npm install dotenv --save`
- `npx sequelize-cli model:generate --name Model --attributes one:string,two:string`
- `npx sequelize-cli seed:generate --name modelName-seed`
