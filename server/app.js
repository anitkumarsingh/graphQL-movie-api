const express = require('express');
const dotenv = require('dotenv');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema');

dotenv.config({path:'./config/.env'});
const connection = require('./config/index');

connection();

const PORT = process.env.PORT || 5000

const app = express();

app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
}))

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV}`)
})