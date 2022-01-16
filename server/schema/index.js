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

const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields:{
    addDirector:{
    type:directorType,
    args:{
        name:{type:GraphQLString},
        age:{type:GraphQLInt}
        },
    resolve(parent,args){
       let director = new Director({
         name:args.name,
         age:args.age
       })
       return director.save();
     }
    },
    addMovie:{
      type:moviesType,
      args:{
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        directorId:{type:GraphQLInt}
      },
      resolve(parent,args){
        let movie = new Movie({
          name:args.name,
          genre:args.genre,
          directorId:args.directorId
        })
        return movie.save();
      }
    }
  }
})
module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
  })