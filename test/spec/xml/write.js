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
              'name="ServiceTask_1" implementation="EchoConnector" pm:implementationVersion="10" ' +
              'pm:config="{&#34;message&#34;:&#34;hello&#34;}" />';

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
            });

            var expectedXML =
              '<bpmn:task xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'name="Task_1" pm:screenRef="screen-001-000" ' +
              'pm:screenVersion="10" pm:dueIn="3" ' +
              'pm:notifyAfterRouting="true" pm:notifyRequestCreator="false" ' +
              'pm:assignment="user" pm:assignedUsers="1" />';

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
            });

            var expectedXML =
              '<bpmn:task xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'name="Task_1" pm:screenRef="screen-001-000" ' +
              'pm:screenVersion="1" pm:dueIn="3" ' +
              'pm:notifyAfterRouting="true" pm:notifyRequestCreator="false" ' +
              'pm:assignment="group" pm:assignedUsers="10,20" pm:assignedGroups="999" />';

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
                'assignedByExpression': 'Age == 20',
            });

            var expectedXML =
                '<bpmn:task xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
                'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
                'name="Task_1" pm:screenRef="screen-001-000" ' +
                'pm:screenVersion="1" pm:dueIn="3" ' +
                'pm:notifyAfterRouting="true" pm:notifyRequestCreator="false" ' +
                'pm:assignment="group" pm:assignedUsers="10,20" pm:assignedGroups="999" ' +
                'pm:assignedByExpression="Age == 20" />';

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
            });

            var expectedXML =
              '<bpmn:task xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
              'xmlns:pm="http://processmaker.com/BPMN/2.0/Schema.xsd" ' +
              'name="Task_1" pm:screenRef="screen-001-000" ' +
              'pm:screenVersion="1" pm:dueIn="3" ' +
              'pm:notifyAfterRouting="true" pm:notifyRequestCreator="false" ' +
              'pm:assignment="group" pm:assignedUsers="10,20" pm:assignedGroups="999" pm:allowReassignment="true" />';

            // when
            write(fieldElem, function(err, result) {

                // then
                expect(result).to.eql(expectedXML);

                done(err);
            });
        });

    });

});
