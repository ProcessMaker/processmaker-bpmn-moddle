'use strict';


describe('descriptor', function() {

  var processmakerDescriptor = require('../../resources/processmaker');


  it('should provide the processmaker model', function() {

    // then
    expect(processmakerDescriptor).to.exist;

    expect(processmakerDescriptor.uri).to.eql('http://processmaker.com/BPMN/2.0/Schema.xsd');
    expect(processmakerDescriptor.prefix).to.eql('pm');
  });

});
