// __mocks__/@expo/vector-icons.js
const React = require("react");
const { View } = require("react-native");

const icon = (props) => React.createElement(View, null);

module.exports = new Proxy(icon, {
  get(target, prop) {
    if (prop === "__esModule") return true;
    if (prop === "default") return icon;
    if (typeof prop === "symbol") return target[prop];
    return icon;
  },
});
