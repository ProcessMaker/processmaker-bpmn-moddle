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

        it('Start event assignment', validateExport('test/fixtures/xml/processmaker-startEvent-assignment.bpmn'));

        it('Intermediate Catch Message Event', validateExport('test/fixtures/xml/processmaker-intermediate-catch-event.bpmn'));

        it('Call Activity', validateExport('test/fixtures/xml/processmaker-call-activity.bpmn'));

        it('Task pm:allowInterstitial & pm:interstitialScreenRef', validateExport('test/fixtures/xml/processmaker-task-interstitial.bpmn'));

        it('Start Event pm:allowInterstitial & pm:interstitialScreenRef', validateExport('test/fixtures/xml/processmaker-startEvent-interstitial.bpmn'));

        it('CallActivity user assignment', validateExport('test/fixtures/xml/processmaker-user-assignment-call-activity.bpmn'));

        it('CallActivity group assignment', validateExport('test/fixtures/xml/processmaker-group-assignment-call-activity.bpmn'));

        it('Sequence Flow pm:config', validateExport('test/fixtures/xml/processmaker-sequence-flow.bpmn'));

        it('Signal', validateExport('test/fixtures/xml/processmaker-signal.bpmn'));
    });

});
