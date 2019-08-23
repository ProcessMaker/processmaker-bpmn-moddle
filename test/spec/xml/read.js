'use strict';


var readFile = require('../../helper').readFile,
  createModdle = require('../../helper').createModdle;


describe('read', function() {

    describe('load processmaker extensions', function() {

        var moddle;

        beforeEach(function() {
            moddle = createModdle();
        });

        it('Load Message', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-message.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:Message', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:Message',
                    'id': 'order',
                    'name': 'Order',
                    'payload': '{order}'
                });
                done(err);
            });
        });

        it('Load Script Task', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-script-task.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:ScriptTask', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:ScriptTask',
                    'id': 'script',
                    'name': 'Script Task',
                    'scriptRef': 'script-id',
                    'scriptVersion': '10',
                    'config': '{}',
                });
                done(err);
            });
        });

        it('Load Assignment Task', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-assignment-task.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:Task', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:Task',
                    id: 'group_task',
                    name: 'Group Task',
                    assignment: 'group',
                    assignedGroups: '1',
                });
                done(err);
            });
        });

        it('Load Service Task', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-service-task.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:ServiceTask',
                    'id': 'service',
                    'name': 'Service Task',
                    'implementation': 'EchoConnector',
                    'implementationVersion': '10',
                    'config': '{}',
                });
                done(err);
            });
        });
        
        it('Load Call Activity', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-call-activity.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:CallActivity', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:CallActivity',
                    'id': 'call-activity-1',
                    'name': 'Call Activity 1',
                    'calledElement': 'ProcessId-123',
                    'config': '{}',
                    'validations': '[]',
                });
                done(err);
            });
        });

        it('Load Task', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-task-screen.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:Task', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:Task',
                    'completionQuantity': 1,
                    'id': 'approve',
                    'isForCompensation': false,
                    'name': 'Request approval',
                    'screenRef': '420f95eb-76d8-459d-b56a-ea605bea4e3f',
                    'screenVersion': '10',
                    'dueIn': 10,
                    'notifyAfterRouting': true,
                    'notifyRequestCreator': false,
                    'startQuantity': 1,
                    'config': '{}'
                });
                done(err);
            });
        });

        it('Load End Event', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-endEvent-screen.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:EndEvent', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:EndEvent',
                    'id': 'endEvent',
                    'name': 'End Event',
                    'screenRef': '420f95eb-76d8-459d-b56a-ea605bea4e3f',
                    'screenVersion': '10'
                });
                done(err);
            });
        });

        it('Load assignedGroups from Task', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-assignment-groups-task.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:Task', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:Task',
                    id: 'task',
                    name: 'Task',
                    assignment: 'group',
                    assignedGroups: '10,20',
                });
                done(err);
            });
        });

        it('Load expression assignments from Task', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-expression-assignment.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:Task', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:Task',
                    id: 'task',
                    name: 'Task',
                    assignment: 'group',
                    assignmentRules: '[{&#34;type&#34;:&#34;user&#34;,&#34;assignee&#34;:2,&#34;expression&#34;:&#34;Edad &#62; 10&#34;}]'
                });
                done(err);
            });
        });

        it('Load pm:allowReassginment attribute', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-task-reassignment.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:Task', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:Task',
                    id: 'task',
                    name: 'Task',
                    assignment: 'group',
                    assignedGroups: '99',
                    allowReassignment: true,
                });
                done(err);
            });
        });

        it('Load Start Event Assignment', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-assignment-startEvent.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:StartEvent', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:StartEvent',
                    id: 'start',
                    name: 'Start Event',
                    assignment: 'user',
                    assignedUsers: '1',
                    config: "{}",
                    validations: '[]',
                });
                done(err);
            });
        });

        it('Load Start Event Group Assignment', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-assignment-groups-startEvent.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:StartEvent', function(err, task) {
                // then
                expect(task).to.jsonEqual({
                    '$type': 'bpmn:StartEvent',
                    id: 'start',
                    name: 'Start Event',
                    assignment: 'group',
                    assignedGroups: '10,20',
                    config: "{}",
                    validations: '[]',
                });
                done(err);
            });
        });

        it('Load Intermediate Catch Event', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-intermediate-catch-event.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:IntermediateCatchEvent', function(err, element) {
                // then
                expect(element).to.jsonEqual({
                    '$type': 'bpmn:IntermediateCatchEvent',
                    id: 'catch',
                    name: 'Catch',
                    allowedUsers: '1,2',
                    allowedGroups: '10,20',
                    whitelist: '192.168.1.1/24,*.example.com',
                });
                done(err);
            });
        });

        it('Load Message Definition', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-message-definition.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:MessageEventDefinition', function(err, element) {
                // then
                expect(element).to.jsonEqual({
                    '$type': 'bpmn:MessageEventDefinition',
                    id: 'message',
                    variableName: 'order',
                });
                done(err);
            });
        });

        it('Load Sequence Flow with Start Event', function(done) {

            // given
            var xml = readFile('test/fixtures/xml/processmaker-sequence-flow-start-event.part.bpmn');

            // when
            moddle.fromXML(xml, 'bpmn:SequenceFlow', function(err, element) {
                // then
                expect(element).to.jsonEqual({
                    '$type': 'bpmn:SequenceFlow',
                    id: 'sequence_flow',
                    startEvent: 'startId',
                });
                done(err);
            });
        });

    });

});
