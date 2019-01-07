/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2017 Adobe
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.
**************************************************************************/

/**
 * This should only be used when running in local mode with react-hot-loader. It enables common situations where
 * you want to compare:
 *
 * `element.type === ImportedComponent`
 *
 * Because each component in react-hot-loader has a wrapper around it to inject local state upon each HMR event, the
 * condition will fail. This shim essentially turns the previous expression into:
 *
 * `element.type === (<ImportedComponent />).type`
 *
 * which works with react-hot-loader.
 */
module.exports = (babel) => {
  const t = babel.types;
  return {
    visitor: {
      BinaryExpression(path) {
        if (
          (path.node.operator === '===')
          && (t.isMemberExpression(path.node.left))
          && (t.isIdentifier(path.node.left.property))
          && (path.node.left.property.name === 'type')
          && (t.isIdentifier(path.node.right))
        ) {
          const className = t.stringLiteral(path.node.right.name).value;
          const newExpr = t.memberExpression(
            t.jSXElement(t.jSXOpeningElement(t.jSXIdentifier(className), [], true), null, [], true),
            t.identifier('type') // eslint-disable-line comma-dangle
          );
          const rightPath = path.get('right');
          rightPath.replaceWith(newExpr);
        }
      },
    },
  };
};
