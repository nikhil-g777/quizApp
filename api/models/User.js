/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autosubscribe: ['destroy', 'update'],


  attributes: {

  	name:{
  		type : 'string',
  		required : true
  	},

  	score:{

  		type: 'integer',
  		defaultsTo : 0
  	},

    ready:{
      type:'boolean',
      defaultsTo : false
    },

    correct :{
      type:'integer',
      defaultsTo: 0
    }

  }
};

