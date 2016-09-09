/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  		number :{

  			type : 'integer',
  			required : true
  	
  		},

  		theQuestion : {

  			type : 'string',
  			required : true
  		},

      options : {
        type : 'array'
      },

  		answer : {

  			type : 'string',
  			required : true
  		}


  }
};

