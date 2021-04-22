"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_svg_1 = require("react-native-svg");
var colors_1 = require("../styles/colors");
var fonts_1 = require("../styles/fonts");
function PlantCardPrimary(props) {
    var data = props.data, rest = __rest(props, ["data"]);
    return (react_1["default"].createElement(react_native_gesture_handler_1.RectButton, __assign({ style: styles.container }, rest),
        react_1["default"].createElement(react_native_svg_1.SvgFromUri, { uri: data.photo, width: 70, height: 70 }),
        react_1["default"].createElement(react_native_1.Text, { style: styles.text }, data.name)));
}
exports["default"] = PlantCardPrimary;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors_1["default"].shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10
    },
    text: {
        color: colors_1["default"].green_dark,
        fontFamily: fonts_1["default"].heading,
        marginVertical: 16
    }
});
