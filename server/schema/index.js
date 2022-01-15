const graphql = require('graphql');

const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;

const moviesType = new GraphQLObjectType({
  name:'movies',
  fields:()=>({
    id:{type:GraphQLString},
    name:{type:GraphQLString},
    genre:{type:GraphQLString}
  })
})

const RootQuery = new GraphQLObjectType({
  name:'RootQuery',
  fields:()=>({
   movies:{
     type:moviesType,
     args:{id:{type:GraphQLString}},
     resolve(parent,args){
       // get data from database
     }
   }
  })
})

module.exports = new GraphQLSchema({
    query:RootQuery
  })