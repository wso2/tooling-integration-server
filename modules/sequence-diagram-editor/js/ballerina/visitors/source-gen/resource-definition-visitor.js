/**
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
define(['lodash', 'log', 'event_channel', './abstract-source-gen-visitor', './statement-visitor-factory'],
    function (_, log, EventChannel, AbstractSourceGenVisitor, StatementVisitorFactory) {

    /**
     * @param parent
     * @constructor
     */
    var ResourceDefinitionVisitor = function (parent) {
        AbstractSourceGenVisitor.call(this, parent);
    };

    ResourceDefinitionVisitor.prototype = Object.create(AbstractSourceGenVisitor.prototype);
    ResourceDefinitionVisitor.prototype.constructor = ResourceDefinitionVisitor;

    ResourceDefinitionVisitor.prototype.canVisitResourceDefinition = function (resourceDefinition) {
        return true;
    };

    ResourceDefinitionVisitor.prototype.beginVisitResourceDefinition = function (resourceDefinition) {
        /**
         * set the configuration start for the resource definition language construct
         * If we need to add additional parameters which are dynamically added to the configuration start
         * that particular source generation has to be constructed here
         */
        var constructedSourceSegment = 'resource ' + resourceDefinition.getResourceName() + '(';

        // Append the resource arguments
        var arguments = resourceDefinition.getResourceArguments();
        for (var id = 0; id < arguments.length; id ++) {
            constructedSourceSegment += arguments[id].getType() + ' ' + arguments[id].getIdentifier();
            if (id !== arguments.length - 1) {
                constructedSourceSegment += ','
            } else {
                constructedSourceSegment += ') {'
            }
        }
        this.appendSource(constructedSourceSegment);
        log.info('Begin Visit ResourceDefinition');
    };

    ResourceDefinitionVisitor.prototype.visitResourceDefinition = function (resourceDefinition) {
        log.info('Visit ResourceDefinition');
    };

    ResourceDefinitionVisitor.prototype.endVisitResourceDefinition = function (resourceDefinition) {
        this.appendSource("}\n");
        this.getParent().appendSource(this.getGeneratedSource());
        log.info('End Visit ResourceDefinition');
    };

    ResourceDefinitionVisitor.prototype.visitStatement = function (statement) {
        var statementVisitorFactory = new StatementVisitorFactory();
        var statementVisitor = statementVisitorFactory.getStatementVisitor(statement, this);
        statement.accept(statementVisitor);
    };
    return ResourceDefinitionVisitor;
});