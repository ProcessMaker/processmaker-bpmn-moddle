'use strict';


var readFile = require('../../helper').readFile,
    createModdle = require('../../helper').createModdle;


describe('read', function() {

  describe('load processmaker extensions', function() {

    var moddle;

    beforeEach(function() {
      moddle = createModdle();
    });

    it('Processmaker task form', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/processmaker-task-form.part.bpmn');

      // when
      moddle.fromXML(xml, 'bpmn:Task', function(err, task) {

        // then
        expect(task).to.jsonEqual({
          $type: 'bpmn:Task',
          'completionQuantity': 1,
          'id': 'approve',
          'isForCompensation': false,
          'name': 'Request approval',
          'formRef': '420f95eb-76d8-459d-b56a-ea605bea4e3f',
          'startQuantity': 1
        });
        done(err);
      });
    });

  });

});
