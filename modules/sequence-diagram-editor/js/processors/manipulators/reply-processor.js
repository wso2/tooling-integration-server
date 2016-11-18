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

define(['d3', 'tree_node', 'app/ballerina/utils/module', 'app/ballerina/models/message-point', 'app/ballerina/models/message-link'],
    function (d3, TreeNode, utils, MessagePoint, MessageLink) {

    var ReplyProcessor = {
        id: "replyProcessor",
        title: "Reply",
        icon: "images/tool-icons/log.svg",
        colour : "#ffffff",
        type : "Action",
        editable : true,
        deletable: true,
        dragCursorOffset : { left: 24, top: -5 },
        createCloneCallback : function(view){
            function cloneCallBack() {
                var div = view.createContainerForDraggable();
                d3.xml("images/tool-icons/log_drag.svg").mimeType("image/svg+xml").get(function(error, xml) {
                    if (error) throw error;
                    var svg = xml.getElementsByTagName("svg")[0];
                    d3.select(svg).attr("width", "48px").attr("height", "108px");
                    div.node().appendChild(svg);
                });
                return div.node();
            }
            return cloneCallBack;
        },


        //
        init : function(model, processor){
            var destination = model.diagramSourceElements().models[0];
            this.addInitArrow_(processor,destination);
        },

        addInitArrow_:function(source,destination){
            var centerR = utils.createPoint(200, 50);
            var centerS = utils.createPoint(380, 50);
            var sourcePoint = new MessagePoint({
                model: {type: "messagePoint"},
                x: centerS.x(),
                y: centerS.y(),
                direction: "outbound"
            });
            var destinationPoint = new MessagePoint({
                model: {type: "messagePoint"},
                x: centerR.x(),
                y: centerR.y(),
                direction: "inbound"
            });
            var messageLink = new MessageLink({
                source: sourcePoint,
                destination: destinationPoint,
                priority: sourcePoint
            });
            var messageOptionsInbound = {'class': 'messagePoint', 'direction': 'inbound'};
            var messageOptionsOutbound = {'class': 'messagePoint', 'direction': 'outbound'};
            destination.addChild(destinationPoint, messageOptionsInbound);
            source.inputConnector(sourcePoint);
        },

        propertyPaneSchema: [
            {
                key: "messageRef",
                text: "Reply Message"
            }
        ],
        parameters: [
            {
                key: "messageRef",
                value: "response"
            }
        ],
        utils : {
            getMyPropertyPaneSchema : function () {
                return Processors.manipulators.replyProcessor.propertyPaneSchema;
            },
            getMyParameters: function (model) {
                return model.attributes.parameters;
            },
            saveMyProperties: function (model, inputs) {

                model.attributes.parameters = [
                    {
                        key: "messageRef",
                        value: inputs.messageRef.value
                    }
                ];
            },
            getMySubTree: function (model) {
                var parameters = model.attributes.parameters;
                var log_configStart = "log(level=\"" + parameters[1].value + "\"," + "status=\"" + parameters[0].value + "\"";
                return new TreeNode("LogMediator", "LogMediator", log_configStart, ");");
            },
            outputs: false,
            getInputParams: function (model) {
                var inputParams = [];
                inputParams[0] = model.attributes.parameters[0];

                return inputParams;
            }
        }
    };

    return ReplyProcessor;
});