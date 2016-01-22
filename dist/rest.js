/**
* Just initialize the variables
*
* @class init
*/

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

'use strict';

(function(){
  /**
   *
   * @description
   * Determines if a reference is a `Function`.
   *
   * @private
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is a `Function`.
   */
  function isFunction(value) {
    return typeof value === 'function';
  }


  /**
   * @description
   * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
   * considered to be objects. Note that JavaScript arrays are objects.
   *
   * @private
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is an `Object` but not `null`.
   */

  function isObject(value) {
    // http://jsperf.com/isobject4
    return value !== null && typeof value === 'object';
  }


  /**
   * @ngdoc function
   * @name angular.isArray
   * @module ng
   * @kind function
   *
   * @description
   * Determines if a reference is an `Array`.
   *
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is an `Array`.
   */
  var isArray = Array.isArray;

  /**
   * @description
   * Determines if a value is a date.
   *
   * @private
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is a `Date`.
   */
  function isDate(value) {
    return toString.call(value) === '[object Date]';
  }

  /**
   * Determines if a value is a regular expression object.
   *
   * @private
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is a `RegExp`.
   */
  function isRegExp(value) {
    return toString.call(value) === '[object RegExp]';
  }

  /**
   * Determines if a value is a regular expression object.
   *
   * @private
   * @param {array} array Array to slice.
   * @param {Integer} start Where will start.
   * @returns {Array} newArray Cutted array .
   */

  function slice(array, start){
    var newArray = [];
    for (var i = start; i < array.length; i++) {
      newArray.push(array[i]);
    }

    return newArray;
  }

  /**
   * Set or clear the hashkey for an object.
   * @param obj object
   * @param h the hashkey (!truthy to delete the hashkey)
   */
  function setHashKey(obj, h) {
    if (h) {
      obj.$$hashKey = h;
    } else {
      delete obj.$$hashKey;
    }
  }

  function baseExtend(dst, objs, deep) {
    var h = dst.$$hashKey;

    for (var i = 0, ii = objs.length; i < ii; ++i) {
      var obj = objs[i];
      if (!isObject(obj) && !isFunction(obj)){
        continue;
      }
      var keys = Object.keys(obj);
      for (var j = 0, jj = keys.length; j < jj; j++) {
        var key = keys[j];
        var src = obj[key];

        if (deep && isObject(src)) {
          if (isDate(src)) {
            dst[key] = new Date(src.valueOf());
          } else if (isRegExp(src)) {
            dst[key] = new RegExp(src);
          } else {
            if (!isObject(dst[key])){
              dst[key] = isArray(src) ? [] : {};
            }
            window.rest.extend(dst[key], [src], true);
          }
        } else {
          dst[key] = src;
        }
      }
    }

    setHashKey(dst, h);
    return dst;
  }

  /**
   *
   * @description
   * Extends the destination object `dst` by copying own enumerable properties from the `src` object(s)
   * to `dst`. You can specify multiple `src` objects. If you want to preserve original objects, you can do so
   * by passing an empty object as the target: `var object = angular.extend({}, object1, object2)`.
   *
   * **Note:** Keep in mind that `angular.extend` does not support recursive merge (deep copy). Use
   * {@link angular.merge} for this.
   *
   * @param {Object} dst Destination object.
   * @param {...Object} src Source object(s).
   * @returns {Object} Reference to `dst`.
   */
  window.rest.extend = function(dst) {
    return baseExtend(dst, slice(arguments, 1), false);
  };

  /**
  * @description
  * Deeply extends the destination object `dst` by copying own enumerable properties from the `src` object(s)
  * to `dst`. You can specify multiple `src` objects. If you want to preserve original objects, you can do so
  * by passing an empty object as the target: `var object = angular.merge({}, object1, object2)`.
  *
  * Unlike {@link angular.extend extend()}, `merge()` recursively descends into object properties of source
  * objects, performing a deep copy.
  *
  * @param {Object} dst Destination object.
  * @param {...Object} src Source object(s).
  * @returns {Object} Reference to `dst`.
  */
  window.rest.merge = function(dst) {
    return baseExtend(dst, slice(arguments, 1), true);
  };
})();
