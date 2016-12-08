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
define(['lodash', 'log', './ast-visitor', '../ast/module'], function (_, log, ASTVisitor, AST) {

    var StatementVisitor = function () {
        ASTVisitor.call(this);
    };

    StatementVisitor.prototype = Object.create(ASTVisitor.prototype);
    StatementVisitor.prototype.constructor = StatementVisitor;

    /**
     * @param node {ASTNode}
     */
    StatementVisitor.prototype.canVisit = function (node) {
        if (node instanceof AST.IfStatement) {
            return this.canVisitIfStatement(node);
        } else if (node instanceof AST.TryCatchStatement) {
            return this.canVisitStatement(node);
        } else if (node instanceof AST.TryStatement) {
            return this.canVisitTryStatement(node);
        } else if (node instanceof AST.CatchStatement) {
            return this.canVisitCatchStatement(node);
        }
    };

    /**
     * @param node {ASTNode}
     */
    StatementVisitor.prototype.beginVisit = function (node) {
        if (node instanceof AST.IfStatement) {
            return this.beginVisitIfStatement(node);
        } else if (node instanceof AST.TryCatchStatement) {
            return this.beginVisitStatement(node);
        } else if (node instanceof AST.TryStatement) {
            return this.beginVisitTryStatement(node);
        } else if (node instanceof AST.CatchStatement) {
            return this.beginVisitCatchStatement(node);
        }
    };

    /**
     * @param node {ASTNode}
     */
    StatementVisitor.prototype.visit = function (node) {
        if (node instanceof AST.IfStatement) {
            return this.visitIfStatement(node);
        } else if (node instanceof AST.TryCatchStatement) {
            return this.visitStatement(node);
        } else if (node instanceof AST.TryStatement) {
            return this.visitTryStatement(node);
        } else if (node instanceof AST.CatchStatement) {
            return this.visitCatchStatement(node);
        }
    };

    /**
     * @param node {ASTNode}
     */
    StatementVisitor.prototype.endVisit = function (node) {
        if (node instanceof AST.IfStatement) {
            return this.endVisitIfStatement(node);
        } else if (node instanceof AST.TryCatchStatement) {
            return this.endVisitStatement(node);
        } else if (node instanceof AST.TryStatement) {
            return this.endVisitTryStatement(node);
        } else if (node instanceof AST.CatchStatement) {
            return this.endVisitCatchStatement(node);
        }
    };

    StatementVisitor.prototype.canVisitIfStatement = function (statement) {
        return false;
    };
    StatementVisitor.prototype.beginVisitIfStatement = function (statement) {
    };
    StatementVisitor.prototype.visitIfStatement = function (statement) {
    };
    StatementVisitor.prototype.endVisitIfStatement = function (statement) {
    };

    StatementVisitor.prototype.canVisitTryCatchStatement = function (statement) {
        return false;
    };
    StatementVisitor.prototype.beginVisitTryCatchStatement = function (statement) {
    };
    StatementVisitor.prototype.visitTryCatchStatement = function (statement) {
    };
    StatementVisitor.prototype.endVisitTryCatchStatement = function (statement) {
    };

    StatementVisitor.prototype.canVisitTryStatement = function (statement) {
        return false;
    };
    StatementVisitor.prototype.beginVisitTryStatement = function (statement) {
    };
    StatementVisitor.prototype.visitTryStatement = function (statement) {
    };
    StatementVisitor.prototype.endVisitTryStatement = function (statement) {
    };

    StatementVisitor.prototype.canVisitCatchStatement = function (statement) {
        return false;
    };
    StatementVisitor.prototype.beginVisitCatchStatement = function (statement) {
    };
    StatementVisitor.prototype.visitCatchStatement = function (statement) {
    };
    StatementVisitor.prototype.endVisitCatchStatement = function (statement) {
    };

    StatementVisitor.prototype.canVisitStatement = function (statement) {
        return false;
    };
    StatementVisitor.prototype.beginVisitStatement = function (statement) {
    };
    StatementVisitor.prototype.visitStatement = function (statement) {
    };
    StatementVisitor.prototype.endVisitStatement = function (statement) {
    };

    return StatementVisitor;
});