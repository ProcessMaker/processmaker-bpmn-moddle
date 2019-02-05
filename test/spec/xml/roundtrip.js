'use strict';

var readFile = require('../../helper').readFile,
  createModdle = require('../../helper').createModdle;



describe('import -> export roundtrip', function() {

    function stripSpaces(xml) {
        return xml.replace(/\n|\r/g, '')
          .replace(/\s{2,}/g, ' ')
          .replace(/\s\/>/g, '/>')
          .replace(/>\s+</g, '><');
    }

    function validateExport(file) {

        return function(done) {

            var xml = stripSpaces(readFile(file));

            var moddle = createModdle();

            moddle.fromXML(xml, 'bpmn:Definitions', function(err, definitions) {
                if (err) {
                    return done(err);
                }

                moddle.toXML(definitions, function(err, savedXML) {

                    if (err) {
                        return done(err);
                    }

                    savedXML = stripSpaces(savedXML);

                    expect(savedXML).to.eql(xml);

                    done();
                });
            });
        };
    }


    describe('should keep extended attributes', function() {

        it('pm:screenRef & pm:screenVersion', validateExport('test/fixtures/xml/processmaker-userTask-screen.bpmn'));

        it('pm:notifyAfterRouting & pm:notifyRequestCreator', validateExport('test/fixtures/xml/processmaker-userTask-notifications.bpmn'));

        it('pm:assignment', validateExport('test/fixtures/xml/processmaker-userTask-assignment.bpmn'));

        it('pm:scriptRef & pm:scriptVersion', validateExport('test/fixtures/xml/processmaker-scriptTask.bpmn'));

        it('EndEvent pm:screenRef & pm:screenVersion', validateExport('test/fixtures/xml/processmaker-endEvent.bpmn'));

        it('Task group assignment', validateExport('test/fixtures/xml/processmaker-group-assignment.bpmn'));

        it('Task expression assignment', validateExport('test/fixtures/xml/processmaker-expression-assignment.bpmn'));

        it('Task group assignment', validateExport('test/fixtures/xml/processmaker-task-reassignment.bpmn'));
    });

});
