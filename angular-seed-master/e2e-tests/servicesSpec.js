'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('myApp'));

  // Test service availability
  it('check the existence of Event factory', inject(function(Event) {
      expect(Event).toBeDefined();
    }));
});