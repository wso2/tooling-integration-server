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
define(['lodash', 'log', 'event_channel', 'app/ballerina/ast/reply-statement', 'd3utils'], function (_, log, EventChannel, ReplyStatement, D3Utils) {

    var ReplyStatementView = function (model, container, viewOptions) {
        if (!_.isNil(model) && model instanceof ReplyStatement && !_.isNil(container)) {
            this._model = model;
            this._container = container;
            this._viewOptions = viewOptions;
        } else {
            log.error("Invalid args received for creating a reply statement view. Model: " + model
                + ". Container: " + container);
        }
    };

    ReplyStatementView.prototype = Object.create(EventChannel.prototype);
    ReplyStatementView.prototype.constructor = ReplyStatementView;

    ReplyStatementView.prototype.setModel = function (model) {
        if (!_.isNil(model)) {
            this._model = model;
        } else {
            log.error("Unknown definition received for reply statement.");
        }
    };

    ReplyStatementView.prototype.setContainer = function (container) {
        if (!_.isNil(container)) {
            this._container = container;
        } else {
            log.error("SVG container for the reply statement is null or empty.");
        }
    };

    ReplyStatementView.prototype.setViewOptions = function (viewOptions) {
        this._viewOptions = viewOptions;
    };

    ReplyStatementView.prototype.getModel = function () {
        return this._model;
    };

    ReplyStatementView.prototype.getContainer = function () {
        return this._container;
    };

    ReplyStatementView.prototype.getViewOptions = function () {
        return this._viewOptions;
    };

    ReplyStatementView.prototype.render = function () {
        //Draw ReplyStatement by utilizing D3
    };

});