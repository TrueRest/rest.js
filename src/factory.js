/**
*
* @class restFactory
*/
window.rest = (function () {
  'use strict';

  /**
  * Array of modules list of the rest factory accepts.
  *
  * Every Module is a Obect like this:
  * <pre>
  * {
  *   {resourceName} : {Object}
  * }
  * </pre>
  * @property modules
  * @type {Object}
  * @default null
  */
  var modules = {};
  return {
    /**
    * Register a new module object.
    *
    * Every Module is a Obect like this:
    * <pre>
    * {
    *   {resourceName} : {Object}
    * }
    * </pre>
    *
    * @method register
    * @param {Object} resourceHandler A object to be instanced
    */
    'register': function(name, resourceHandler){
      if(!resourceHandler || !name){
        return;
      }
      modules[name] = resourceHandler;
    },

    /**
    * Get a list of string of the accepts modules.
    *
    * @method getAccepts
    * @return {Array} accepts Array of string
    */

    'getAccepts': function(){
      var accepts = [];

      for (var key in modules) {
        accepts.push(key);
      }
      return accepts;
    },

    /**
    * Get a list of string of the accepts modules.
    *
    * @method convertResource
    * @param {String} contentType
    * @param {Resource} Response
    * @return {Object} modeule A instance of module
    */
    'convertResource' : function(contentType, response){
      return new modules[contentType](response);
    }
  };
}());
