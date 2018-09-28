'use strict';


describe('descriptor', function() {

  var processmakerDescriptor = require('../../resources/processmaker');


  it('should provide the processmaker model', function() {

    // then
    expect(processmakerDescriptor).to.exist;

    expect(processmakerDescriptor.uri).to.eql('https://bpm4.processmaker.local/definitions/ProcessMaker.xsd');
    expect(processmakerDescriptor.prefix).to.eql('pm');
  });

});
