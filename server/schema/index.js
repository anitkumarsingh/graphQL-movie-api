const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;

const movies = [
  {name:'Joker',genre:'Drama',id:'1'},
  {name:'Joker2',genre:'La la land',id:'2'},
  {name:'Joker3',genre:'Drama 3',id:'3'},
  {name:'Joke4',genre:'Drama 4',id:'4'},
]

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
   movie:{
     type:moviesType,
     args:{id:{type:GraphQLString}},
     resolve(parent,args){
       // get data from database
       return _.find(movies,{id:args.id})
     }
   }
  })
})

module.exports = new GraphQLSchema({
    query:RootQuery
  })