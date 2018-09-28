'use strict';

var BpmnModdle = require('bpmn-moddle').default;

var processmakerDescriptor = require('../../resources/processmaker');


describe('exports', function() {

  it('should extend bpmn-moddle', function() {

    // given
    var moddle = new BpmnModdle({
      pm: processmakerDescriptor
    });

    // when
    var task = moddle.create('bpmn:Task');

    // then
    expect(task.$instanceOf('pm:Task')).to.be.true;
  });

});