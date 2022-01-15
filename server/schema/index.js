const graphql = require('graphql');

const {GraphQLObjectType,GraphQLString} = graphql;

const movies = GraphQLObjectType({
  name:'movies',
  fields:()=>({
    id:{type:GraphQLString},
    name:{type:GraphQLString},
    genre:{type:GraphQLString}
  })
})