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
define(['event_channel'], function(EventChannel){

    var ASTNode = function(value, type, cStart, cEnd) {
        this.object = undefined;
        this.children = [];
        this.value = value;
        this.type = type;
        this.configStart = cStart;
        this.configEnd = cEnd;
    };

    ASTNode.prototype = Object.create(EventChannel.prototype);
    ASTNode.prototype.constructor = ASTNode;

    ASTNode.prototype.getChildren = function () {
        return this.children;
    };

    ASTNode.prototype.getValue = function () {
        return this.value;
    };

    return ASTNode;

});