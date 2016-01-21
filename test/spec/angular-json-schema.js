'use strict';

describe('Test the restFactory', function () {

  var dummyObject = function(value){
    this.sayHi = function(){
      return value.name;
    };
  };

  var obj1 = {
    'case1' : dummyObject,
    'case2' : dummyObject
  };

  var obj2 = {
    'case3' : dummyObject
  };

  it('should check register and getAccepts', function () {
    restFactory.register(obj1);
    restFactory.register(null);
    restFactory.register(undefined);
    restFactory.register({});

    var response = restFactory.getAccepts();

    expect(response.length).toBe(2);
    expect(response[0]).toBe('case1');
    expect(response[1]).toBe('case2');

    restFactory.register(obj2);

    response = restFactory.getAccepts();
    expect(response.length).toBe(3);
    expect(response[0]).toBe('case3');
    expect(response[1]).toBe('case1');
    expect(response[2]).toBe('case2');
  });


  it('should check convertResource', function () {
    var data = {
      'name' : 'Joe',
      'age' : 22
    };
    var case1Object = restFactory.convertResource('case1', data);
    
    expect(case1Object.sayHi()).toBe('Joe');

  });

});
