'use strict';

var assign = require('min-dash').assign,
    isFunction = require('min-dash').isFunction;

var Helper = require('../../helper');


describe('write', function() {

  var moddle = Helper.createModdle();


  function write(element, options, callback) {
    if (isFunction(options)) {
      callback = options;
      options = {};
    }

    // skip preamble for tests
    options = assign({ preamble: false }, options);

    moddle.toXML(element, options, callback);
  }


  describe('should export processmaker types', function() {

    it('Form reference', function(done) {

      // given
      var fieldElem = moddle.create('bpmn:Task', {
        name: 'Task_1',
        screenRef: 'form-001-000'
      });

      var expectedXML =
        '<bpmn:task xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
        'name="Task_1" pm:screenRef="form-001-000" />';

      // when
      write(fieldElem, function(err, result) {

        // then
        expect(result).to.eql(expectedXML);

        done(err);
      });
    });


  });

});
