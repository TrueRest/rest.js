'use strict';

describe('Test the rest', function () {
  var rest = window.rest;
  var dummyObject = function(value){
    this.sayHi = function(){
      return value.name;
    };
  };

  it('should check register and getAccepts', function () {
    rest.register('case1', dummyObject);
    rest.register('case2', dummyObject);
    rest.register(null);
    rest.register(undefined);
    rest.register({});

    var response = rest.getAccepts();

    expect(response.length).toBe(2);
    expect(response[0]).toBe('case1');
    expect(response[1]).toBe('case2');

    rest.register('case3', dummyObject);

    response = rest.getAccepts();
    expect(response.length).toBe(3);
    expect(response[0]).toBe('case1');
    expect(response[1]).toBe('case2');
    expect(response[2]).toBe('case3');
  });


  it('should check convertResource', function () {
    var data = {
      'name' : 'Joe',
      'age' : 22
    };
    var case1Object = rest.convertResource('case1', data);

    expect(case1Object.sayHi()).toBe('Joe');

  });

});
