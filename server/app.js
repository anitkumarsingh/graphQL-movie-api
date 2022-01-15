const express = require('express');
const dotenv = require('dotenv');
const {graphqlHTTP} = require('express-graphql');

dotenv.config({path:'../config/env'});

const PORT = process.env.PORT || 5000

const app = express();

app.use('/graphql',graphqlHTTP({

}))

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV}`)
})