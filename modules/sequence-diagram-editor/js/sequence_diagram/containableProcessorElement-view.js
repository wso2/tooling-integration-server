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

/**
 * SequenceD-Views Module extension.
 *
 * Definition of Backbone Views required for Sequence Diagrams.
 */
var SequenceD = (function (sequenced) {
    var views = sequenced.Views = sequenced.Views || {};

    var ContainableProcessorElement = Diagrams.Views.ShapeView.extend(
        /** @lends ContainableProcessorElement.prototype */
        {
            /**
             * @augments ShapeView
             * @constructs
             * @class LifeLineView Represents the view for lifeline components in Sequence Diagrams.
             * @param {Object} options Rendering options for the view
             */
            initialize: function (options) {
                Diagrams.Views.ShapeView.prototype.initialize.call(this, options);
            },

            verticalDrag: function () {
                return false;
            },

            render: function (paperID, centerPoint) {
                Diagrams.Views.ShapeView.prototype.render.call(this, paperID);

                var unitProcessorElement = this.drawUnitProcessor(centerPoint, this);
                this.d3el = unitProcessorElement;
                this.el = unitProcessorElement.node();
                return unitProcessorElement;
            },

            drawUnitProcessor: function (center, view) {
                var title = view.modelAttr('title');
                var prefs = view.options;
                var model = view.model;
                var d3Ref = this.getD3Ref();
                var group = d3Ref.draw.group()
                    .classed(prefs.class, true);
                var viewObj = this;
                var path = undefined;
                var height = prefs.rect.height;
                var width = prefs.rect.width;
                var modelHeight = model.getHeight();

                var rect = d3Ref.draw.rectWithTitle(
                    center,
                    60,
                    prefs.rect.height,
                    150,
                    model.getHeight(),
                    0,
                    0,
                    d3Ref,
                    this.modelAttr('viewAttributes').colour,
                    this.modelAttr('title')
                );
                console.log("started");
                var height = (model.getHeight() - prefs.rect.height);

                rect.middleRect.on('mouseover', function () {
                    defaultView.model.selectedNode = viewObj.model;
                    d3.select(this).style("fill", "green").style("fill-opacity", 0.1);
                }).on('mouseout', function () {
                    defaultView.model.destinationLifeLine = defaultView.model.selectedNode;
                    defaultView.model.selectedNode = null;
                    d3.select(this).style("fill-opacity", 0.01);
                }).on('mouseup', function (data) {

                });
                console.log(middleRect);

                rect.group.on('mouseover', function () {
                    d3.event.preventDefault();
                    d3.event.stopPropagation();
                    defaultView.model.selectedNode = viewObj.model;
                }).on('mouseout', function () {
                    defaultView.model.destinationLifeLine = defaultView.model.selectedNode;
                    defaultView.model.selectedNode = null;
                }).on('mouseup', function (data) {
                });

                group.middleRect = rect.middleRect;
                group.rect = rect.containerRect;
                group.titleRect = rect.titleRect;
                group.text = rect.text;

                var centerPoint = center;
                var xValue = centerPoint.x();
                var yValue = centerPoint.y();

                var totalHeight = 60;
                var totalWidth = 150;
                this.model.setHeight(30);

                var initWidth =rect.containerRect.attr("width");

                yValue += 60;
                for (var id in this.modelAttr("children").models) {
                    var processor = this.modelAttr("children").models[id];
                    //TODO : Please remove this if else with a proper implementation
                    if(processor.type == "messagePoint"){
                        yValue = yValue-20;
                    }
                    var processorCenterPoint = createPoint(xValue, yValue);
                    var processorView = new SequenceD.Views.ProcessorViewFactory(processorCenterPoint, processor);
                    processorView.render("#" + defaultView.options.diagram.wrapperId, processorCenterPoint, processor, this.options);
                    processor.setY(yValue);
                    totalHeight = totalHeight + this.model.getHeight() + processor.getHeight();
                    yValue += processor.getHeight()+ 30;

                    if (this.model.widestChild == null || this.model.widestChild.getWidth() < processor.getWidth()) {
                        this.model.widestChild = processor;
                    }
                }

                if (this.model.widestChild != null) {
                    totalWidth = this.model.widestChild.getWidth() + 30;
                }

                var deviation = (totalWidth - initWidth)/2;
                var newX = parseInt(rect.containerRect.attr("x")) - deviation;

                rect.containerRect.attr("height", totalHeight);
                rect.containerRect.attr("width", totalWidth);
                rect.containerRect.attr("x", newX);
                rect.titleRect.attr("x", parseInt(rect.titleRect.attr("x")) - deviation);
                rect.text.attr("x", parseInt(rect.text.attr("x")) - deviation);
                this.model.setHeight(totalHeight);
                this.model.get("parent").setHeight(this.model.get("parent").getHeight() + totalHeight - modelHeight);
                this.model.setWidth(totalWidth);
                this.model.setX(newX);
                rect.middleRect.attr("height", totalHeight);
                rect.middleRect.attr("width", totalWidth);
                rect.middleRect.attr("x", parseInt(rect.middleRect.attr("x")) - deviation);

                if (viewObj.model.get("title") === "Try" || viewObj.model.get("title") === "If") {
                    var optionsMenuGroup = group.append("g").attr("class", "option-menu option-menu-hide");
                    var optionMenuStartX = center.x() + 80;
                    var optionMenuStartY = center.y() - prefs.rect.height/2;

                    var optionMenuWrapper = d3Ref.draw.rect(optionMenuStartX + 8,
                        optionMenuStartY,
                        30,
                        58,
                        0,
                        0,
                        optionsMenuGroup, "#f9f7f4").
                    attr("style", "stroke: #908D82; stroke-width: 0.5; opacity:0.5; cursor: pointer").
                    on("mouseover", function () {
                        d3.select(this).attr("style", "stroke: #908D82; stroke-width: 0.5; opacity: .1; cursor: pointer");
                    }).
                    on("mouseout", function () {
                        d3.select(this).attr("style", "stroke: #908D82; stroke-width: 0.5; opacity: 0.5; cursor: pointer");
                    });

                    var deleteOption = d3Ref.draw.rect(optionMenuStartX + 11,
                        optionMenuStartY + 3,
                        24,
                        24,
                        0,
                        0,
                        optionsMenuGroup, "url(#delIcon)").
                    attr("style", "opacity:0.2; cursor: pointer; stroke: #ede9dc").
                    on("mouseover", function () {
                        d3.select(this).attr("style", "stroke: #908D82; stroke-width: 0.5; opacity: 1; cursor: pointer");
                        optionMenuWrapper.attr("style", "stroke: #908D82; stroke-width: 0.5; opacity: .7");
                    }).
                    on("mouseout", function () {
                        d3.select(this).attr("style", "stroke: #f9f7f4; stroke-width: 0.5; opacity: 0.5; cursor: pointer");
                        optionMenuWrapper.attr("style", "stroke: #908D82; stroke-width: 0.5; opacity: 0.5; cursor: pointer");
                    });

                    var editOption = d3Ref.draw.rect(optionMenuStartX + 11,
                        optionMenuStartY + 31,
                        24,
                        24,
                        0,
                        0,
                        optionsMenuGroup, "url(#editIcon)").
                    attr("style", "opacity:0.2; cursor: pointer; stroke: #ede9dc").
                    on("mouseover", function () {
                        d3.select(this).attr("style", "stroke: #908D82; stroke-width: 0.5; opacity: 1; cursor: pointer");
                        optionMenuWrapper.attr("style", "stroke: #908D82; stroke-width: 0.5; opacity: .7; cursor: pointer");
                    }).
                    on("mouseout", function () {
                        d3.select(this).attr("style", "stroke: #f9f7f4; stroke-width: 0.5; opacity: 0.5; cursor: pointer");
                        optionMenuWrapper.attr("style", "stroke: #908D82; stroke-width: 0.5; opacity: 0.5; cursor: pointer");
                    });

                    // On click of the mediator show/hide the delete icon
                    rect.group.on("click", function () {
                        defaultView.model.selectedNode = viewObj.model;

                        if (optionsMenuGroup.classed("option-menu-hide")) {
                            optionsMenuGroup.classed("option-menu-hide", false);
                            optionsMenuGroup.classed("option-menu-show", true);

                            if (diagram.selectedOptionsGroup && (diagram.selectedOptionsGroup !== optionsMenuGroup)) {
                                diagram.selectedOptionsGroup.classed("option-menu-hide", true);
                                diagram.selectedOptionsGroup.classed("option-menu-show", false);
                            }
                            if (diagram.propertyWindow) {
                                diagram.propertyWindow = false;
                                defaultView.enableDragZoomOptions();
                                $('#property-pane-svg').empty();
                            }
                            diagram.selectedOptionsGroup = optionsMenuGroup;

                        } else {
                            optionsMenuGroup.classed("option-menu-hide", true);
                            optionsMenuGroup.classed("option-menu-show", false);
                            if (diagram.propertyWindow) {
                                diagram.propertyWindow = false;
                                defaultView.enableDragZoomOptions();
                                defaultView.render();
                            }
                            diagram.selectedOptionsGroup = null;
                        }
                        d3.event.preventDefault();
                        d3.event.stopPropagation();
                    });

                    editOption.on("click", function () {
                        if (diagram.propertyWindow) {
                            diagram.propertyWindow = false;
                            defaultView.enableDragZoomOptions();
                            defaultView.render();

                        } else {
                            var options = {
                                x: parseFloat(this.getAttribute("x")) + 6,
                                y: parseFloat(this.getAttribute("y")) + 21
                            };

                            defaultView.selectedNode = viewObj.model.attributes.parent;
                            defaultView.drawPropertiesPane(d3Ref, options,
                                viewObj.model.get('parent').attributes.parameters,
                                viewObj.model.attributes.parent.get("utils").getMyPropertyPaneSchema());


                        }
                        d3.event.preventDefault();
                        d3.event.stopPropagation();
                    });

                    deleteOption.on("click", function () {
                        //Get the parent of the model and delete it from the parent
                        var parentModel = viewObj.model.get("parent").get("parent");
                        var parentModelChildren = parentModel.get("children").models;
                        for (var itr = 0; itr < parentModelChildren.length; itr ++) {
                            if (parentModelChildren[itr].cid === viewObj.model.get("parent").cid) {
                                //reset parent height
                                parentModel.setHeight(parentModel.getHeight() - parentModelChildren[itr].getHeight)
                                var parentElement = parentModel
                                //Find the most recent Lifeline parent and adjust height
                                while(!(parentElement instanceof SequenceD.Models.LifeLine)){
                                    parentElement = parentElement.get("parent")
                                }
                                parentElement.setHeight(parentElement.getHeight - parentModelChildren[itr].getHeight)
                                parentModelChildren.splice(itr, 1);
                                defaultView.render();
                                break;
                            }
                        }
                    });
                }

                return group;
            }

        });

    views.ContainableProcessorElement = ContainableProcessorElement;

    return sequenced;

}(SequenceD || {}));