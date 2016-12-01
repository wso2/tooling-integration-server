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
define(['lodash', './node'], function(_, ASTNode){

    var WorkerDeclaration = function(connections, variables, statements, replyStatement) {
        this.connectionDeclarations = connections || {};
        this.variableDeclarations = variables || {};
        this.statements = statements || {};
        this.reply = replyStatement;
    };

    WorkerDeclaration.prototype = Object.create(ASTNode.prototype);
    WorkerDeclaration.prototype.constructor = WorkerDeclaration;

    WorkerDeclaration.prototype.setConnections = function(connections){
        if(!_.isNil(connections)){
            this.connectionDeclarations = connections;
        }
    };

    WorkerDeclaration.prototype.getConnections = function(){
        return this.connectionDeclarations;
    };

    WorkerDeclaration.prototype.setVariables = function(variables){
        if(!_.isNil(variables)){
            this.variableDeclarations = variables;
        }
    };

    WorkerDeclaration.prototype.getVariables = function(){
        return this.variableDeclarations;
    };

    WorkerDeclaration.prototype.setStatements = function(statements){
        if(!_.isNil(statements)){
            this.statements = statements;
        }
    };

    WorkerDeclaration.prototype.getStatements = function(){
        return this.statements;
    };

    WorkerDeclaration.prototype.setReply = function(replyStatement){
        if(!_.isNil(replyStatement)){
            this.reply = replyStatement;
        }
    };

    WorkerDeclaration.prototype.getReply = function(){
        return this.reply;
    };

});