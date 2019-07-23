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
        options = assign({preamble: false}, options);

        moddle.toXML(element, options, callback);
    }


    describe('should export processmaker extensions', function() {


        it('Write Message', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:Message', {
                'name': 'Message_1',
                'payload': '{purchase}',
            });

            var expectedXML =
              '<bpmn:message xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'name="Message_1" pm:payload="{purchase}" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });

        it('Write Script Task', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:ScriptTask', {
                'name': 'ScriptTask_1',
                'scriptRef': 'screen-001-000',
                'scriptVersion': '10',
            });

            var expectedXML =
              '<bpmn:scriptTask xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'name="ScriptTask_1" pm:scriptRef="screen-001-000" ' +
              'pm:scriptVersion="10" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });

        it('Write Service Task', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:ServiceTask', {
                'name': 'ServiceTask_1',
                'implementation': 'EchoConnector',
                'implementationVersion': '10',
                'config': '{"message":"hello"}',
            });

            var expectedXML =
              '<bpmn:serviceTask xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'name="ServiceTask_1" pm:config="{&#34;message&#34;:&#34;hello&#34;}" ' +
              'implementation="EchoConnector" pm:implementationVersion="10" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });

        it('Write Task', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:Task', {
                'name': 'Task_1',
                'screenRef': 'screen-001-000',
                'screenVersion': '10',
                'dueIn': 3,
                'notifyAfterRouting': true,
                'notifyRequestCreator': false,
                'assignment': 'user',
                'assignedUsers': '1',
                'config': "{}"
            });

            var expectedXML =
              '<bpmn:task xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'name="Task_1" pm:screenRef="screen-001-000" ' +
              'pm:screenVersion="10" pm:dueIn="3" ' +
              'pm:notifyAfterRouting="true" pm:notifyRequestCreator="false" ' +
              'pm:assignment="user" pm:assignedUsers="1" pm:config="{}" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });


        it('Write EndEvent', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:EndEvent', {
                'name': 'EndEvent_1',
                'screenRef': 'screen-001-000',
                'screenVersion': '10',
            });

            var expectedXML =
                '<bpmn:endEvent xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
                'name="EndEvent_1" pm:screenRef="screen-001-000" ' +
                'pm:screenVersion="10" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });

        it('Write Task Group Assignment', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:Task', {
                'name': 'Task_1',
                'screenRef': 'screen-001-000',
                'screenVersion': '1',
                'dueIn': 3,
                'notifyAfterRouting': true,
                'notifyRequestCreator': false,
                'assignment': 'group',
                'assignedUsers': '10,20',
                'assignedGroups': '999',
                'config': '{}',
            });

            var expectedXML =
              '<bpmn:task xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'name="Task_1" pm:screenRef="screen-001-000" ' +
              'pm:screenVersion="1" pm:dueIn="3" ' +
              'pm:notifyAfterRouting="true" pm:notifyRequestCreator="false" ' +
              'pm:assignment="group" pm:assignedUsers="10,20" pm:assignedGroups="999" pm:config="{}" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });


        it('Write Task Expression Assignment', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:Task', {
                'name': 'Task_1',
                'screenRef': 'screen-001-000',
                'screenVersion': '1',
                'dueIn': 3,
                'notifyAfterRouting': true,
                'notifyRequestCreator': false,
                'assignment': 'group',
                'assignedUsers': '10,20',
                'assignedGroups': '999',
                'assignmentRules': '[{&#34;type&#34;:&#34;user&#34;,&#34;assignee&#34;:2,&#34;expression&#34;:&#34;Edad &#62; 10&#34;}]',
                'config': '{}',
            });

            var expectedXML =
                '<bpmn:task xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
                'name="Task_1" pm:screenRef="screen-001-000" ' +
                'pm:screenVersion="1" pm:dueIn="3" ' +
                'pm:notifyAfterRouting="true" pm:notifyRequestCreator="false" ' +
                'pm:assignment="group" pm:assignedUsers="10,20" pm:assignedGroups="999" ' +
                'pm:assignmentRules="[{&#38;#34;type&#38;#34;:&#38;#34;user&#38;#34;,&#38;#34;assignee&#38;#34;:2,&#38;#34;expression&#38;#34;:&#38;#34;Edad &#38;#62; 10&#38;#34;}]" ' +
                'pm:config="{}" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });



        it('Write Task Allow Reassignment', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:Task', {
                'name': 'Task_1',
                'screenRef': 'screen-001-000',
                'screenVersion': '1',
                'dueIn': 3,
                'notifyAfterRouting': true,
                'notifyRequestCreator': false,
                'assignment': 'group',
                'assignedUsers': '10,20',
                'assignedGroups': '999',
                'allowReassignment': true,
                'config': '{}'
            });

            var expectedXML =
              '<bpmn:task xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'name="Task_1" pm:screenRef="screen-001-000" ' +
              'pm:screenVersion="1" pm:dueIn="3" ' +
              'pm:notifyAfterRouting="true" pm:notifyRequestCreator="false" ' +
              'pm:assignment="group" pm:assignedUsers="10,20" pm:assignedGroups="999" pm:allowReassignment="true" pm:config="{}" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });

        it('Write Start Event Assignment', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:StartEvent', {
                'name': 'start',
                'assignment': 'user',
                'assignedUsers': '1,2',
                'config': '{}',
            });

            var expectedXML =
              '<bpmn:startEvent xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'name="start" ' +
              'pm:assignment="user" pm:assignedUsers="1,2" pm:config="{}" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });

        it('Write Start Event Group Assignment', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:StartEvent', {
                'name': 'start',
                'assignment': 'group',
                'assignedGroups': '10,20',
                'config': '{}',
            });

            var expectedXML =
              '<bpmn:startEvent xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'name="start" ' +
              'pm:assignment="group" pm:assignedGroups="10,20" pm:config="{}" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });

        it('Write Intermediate Catch Event', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:IntermediateCatchEvent', {
                id: 'catch',
                name: 'catch',
                allowedUsers: '1,2',
                allowedGroups: '10,20',
                whitelist: '192.168.1.1/24,*.example.com',
            });

            var expectedXML =
              '<bpmn:intermediateCatchEvent xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'id="catch" ' +
              'name="catch" ' +
              'pm:allowedUsers="1,2" pm:allowedGroups="10,20" '+
              'pm:whitelist="192.168.1.1/24,*.example.com" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });

        it('Write Message Definition', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:MessageEventDefinition', {
                id: 'message',
                variableName: 'order',
            });

            var expectedXML =
              '<bpmn:messageEventDefinition xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'id="message" ' +
              'pm:variableName="order" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });

        it('Write Sequence Flow with Start Event', function(done) {

            // given
            var fieldElem = moddle.create('bpmn:SequenceFlow', {
                id: 'sequence_flow',
                startEvent: 'id3',
            });

            var expectedXML =
              '<bpmn:sequenceFlow xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'id="sequence_flow" ' +
              'pm:startEvent="id3" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });

    });

    it('Write Call Activity', function(done) {

        // given
        var fieldElem = moddle.create('bpmn:CallActivity', {
            'name': 'Call Activity 1',
            'calledElement': 'ProcessId-123',
            'config': '{"message":"hello"}',
        });

        var expectedXML =
          '<bpmn:callActivity xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
          'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
          'name="Call Activity 1" ' +
          'calledElement="ProcessId-123" ' +
          'pm:config="{&#34;message&#34;:&#34;hello&#34;}" />';

        // when
        write(fieldElem, function(err, result) {

            // then
            expect(result).to.eql(expectedXML);

            done(err);
        });
    });

});
