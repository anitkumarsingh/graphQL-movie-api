const graphql = require('graphql');
const Movie = require('../models/movie');
const Director = require('../models/director');

const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const movies = [
  {name:'Joker',genre:'Drama',id:'1',directorId:'1'},
  {name:'Joker2',genre:'La la land',id:'2',directorId:'2'},
  {name:'Joker3',genre:'Drama 3',id:'3',directorId:'1'},
  {name:'Joke4',genre:'Drama 4',id:'4',directorId:'3'},
]

const directors =[
  {name:'John Doe 1',age:43,id:'1'},
  {name:'John Doe 2',age:23,id:'2'},
  {name:'John Doe 3',age:44,id:'3'},
  {name:'John Doe 4',age:77,id:'4'}
]
const moviesType = new GraphQLObjectType({
  name:'movies',
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    director:{
      type:directorType,
      resolve(parent,args){
        let director = Director.findById(parent.directorId)
        return director;
      }
    }
  })
})

const directorType = new GraphQLObjectType({
  name:'director',
  fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    age:{type:GraphQLInt},
    movies:{
      type:new GraphQLList(moviesType),
      resolve(parent,args){
        let movie = Movie.find({directorId:parent.id})
        return movie;
      }
    }
  })
})
const RootQuery = new GraphQLObjectType({
  name:'RootQuery',
  fields:()=>({
   movie:{
     type:moviesType,
     args:{id:{type:GraphQLID}},
     resolve(parent,args){
       return Movie.findById(args.id)
     }
   },
   director:{
     type:directorType,
     args:{id:{type:GraphQLID}},
     resolve(parent,args){
       return Director.findById(args.id)
     }
   },
   movies:{
     type:new GraphQLList(moviesType),
     resolve(){
       return Movie.find({});
     }
   },
   directors:{
     type:new GraphQLList(directorType),
     resolve(){
       return Director.find({});
     }
   }
  })
})

module.exports = new GraphQLSchema({
    query:RootQuery
  })