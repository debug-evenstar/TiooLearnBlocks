"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = function(to, from, except, desc) {
    if (from && typeof from === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/index.ts
var src_exports = {};
module.exports = __toCommonJS(src_exports);
// src/components/ButtonGroup/index.tsx
var import_react = require("react");
// src/components/Button/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ButtonComponent = function(param) {
    var title = param.title, onClick = param.onClick, index = param.index, disabled = param.disabled;
    var generateStyle = function() {
        return {
            color: "black",
            fontSize: "15px",
            padding: "5px 0px",
            borderRadius: "24px",
            border: " 1px dashed var(--primary, #4F46E5)",
            background: "#E6E6FA",
            boxShadow: "0.5px 0.5px 4px 0.5px rgba(0, 0, 0, 0.31)"
        };
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
            onClick: onClick ? onClick : void 0,
            style: generateStyle(),
            children: title
        })
    });
};
var Button_default = ButtonComponent;
// src/components/ButtonGroup/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var ButtonGroupComponent = function(param) {
    var data = param.data, manager = param.manager, slide = param.slide;
    var _ref = _sliced_to_array((0, import_react.useState)([]), 2), buttonLabels = _ref[0], setButtonLabels = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react.useState)(0), 2), activeOptionGroupIndex = _ref1[0], setActiveOptionGroupIndex = _ref1[1];
    var selectAnswer = function(index, item) {
        slide.selectAnswer(index, item, function() {
            if (data.options) {
                if (data.options.length > activeOptionGroupIndex + 1) {
                    setButtonLabels(data.options[activeOptionGroupIndex + 1]);
                    setActiveOptionGroupIndex(activeOptionGroupIndex + 1);
                }
            }
        });
    };
    (0, import_react.useEffect)(function() {
        slide.setAnswers(data.answers);
        slide.setOptions(data.options);
        if (data.options) {
            setButtonLabels(data.options[0]);
        } else {
            setButtonLabels(data.answers);
        }
    }, [
        data
    ]);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, {
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
            className: "grid grid-cols-2 gap-6 w-5/12 mx-auto mt-[30px]",
            children: !!buttonLabels.length && buttonLabels.map(function(item, index) {
                return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button_default, {
                    onClick: function() {
                        return selectAnswer(index, item);
                    },
                    title: item,
                    index: index
                }, index);
            })
        })
    });
};
var ButtonGroup_default = ButtonGroupComponent;
// src/components/FlashCards/index.tsx
var import_react2 = require("react");
// src/components/FlashCards/handler.tsx
var rotationClassesImages = {
    "1": "w-full h-auto absolute rounded-lg transform rotate-[1deg]",
    "2": "w-full h-auto absolute rounded-lg transform rotate-[2deg]",
    "3": "w-full h-auto absolute rounded-lg transform rotate-[3deg]",
    "4": "w-full h-auto absolute rounded-lg transform rotate-[4deg]",
    "5": "w-full h-auto absolute rounded-lg transform rotate-[5deg]",
    "6": "w-full h-auto absolute rounded-lg transform rotate-[6deg]",
    "7": "w-full h-auto absolute rounded-lg transform rotate-[7deg]",
    "-1": "w-full h-auto absolute rounded-lg transform rotate-[-1deg]",
    "-2": "w-full h-auto absolute rounded-lg transform rotate-[-2deg]",
    "-3": "w-full h-auto absolute rounded-lg transform rotate-[-3deg]",
    "-4": "w-full h-auto absolute rounded-lg transform rotate-[-4deg]",
    "-5": "w-full h-auto absolute rounded-lg transform rotate-[-5deg]",
    "-6": "w-full h-auto absolute rounded-lg transform rotate-[-6deg]",
    "-7": "w-full h-auto absolute rounded-lg transform rotate-[-7deg]"
};
var rotationClassesWords = {
    "1": "w-full h-full px-[20px] py-[20px] bg-slate-300 text-black absolute flex justify-center items-center rounded-lg transform rotate-[1deg]",
    "2": "w-full h-full px-[20px] py-[20px] bg-stone-300 text-black absolute flex justify-center items-center rounded-lg transform rotate-[2deg]",
    "3": "w-full h-full px-[20px] py-[20px] bg-gray-300 text-black absolute flex justify-center items-center rounded-lg transform rotate-[3deg]",
    "4": "w-full h-full px-[20px] py-[20px] bg-red-100 text-black absolute flex justify-center items-center rounded-lg transform rotate-[4deg]",
    "5": "w-full h-full px-[20px] py-[20px] bg-orange-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[5deg]",
    "6": "w-full h-full px-[20px] py-[20px] bg-amber-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[6deg]",
    "7": "w-full h-full px-[20px] py-[20px] bg-yellow-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[7deg]",
    "-1": "w-full h-full px-[20px] py-[20px] bg-lime-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-1deg]",
    "-2": "w-full h-full px-[20px] py-[20px] bg-green-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-2deg]",
    "-3": "w-full h-full px-[20px] py-[20px] bg-teal-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-3deg]",
    "-4": "w-full h-full px-[20px] py-[20px] bg-cyan-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-4deg]",
    "-5": "w-full h-full px-[20px] py-[20px] bg-sky-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-5deg]",
    "-6": "w-full h-full px-[20px] py-[20px] bg-indigo-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-6deg]",
    "-7": "w-full h-full px-[20px] py-[20px] bg-purple-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-7deg]"
};
// src/components/FlashCards/index.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var FlashCardsComponent = function(param) {
    var data = param.data, slide = param.slide;
    var _ref = _sliced_to_array((0, import_react2.useState)(data.cards.map(function(item, index) {
        return data.cards[data.cards.length - 1 - index];
    })), 2), cardData = _ref[0], setCardData = _ref[1];
    var imgContainerRef = (0, import_react2.useRef)(null);
    var handleCardTransition = function() {
        var imageCards = imgContainerRef.current.querySelectorAll("img, div");
        var cardToSlide = imageCards[imageCards.length - 1];
        cardToSlide.style.transform = "translate(80%,-60%) rotate(110deg)";
        cardToSlide.style.opacity = 0;
    };
    var removeCard = function() {
        handleCardTransition();
        var newCards = cardData;
        newCards.pop();
        setTimeout(function() {
            setCardData(function() {
                return _to_consumable_array(newCards);
            });
        }, 1200);
    };
    (0, import_react2.useEffect)(function() {
        slide.setFunction("removeCard", removeCard);
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, {
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {
            className: "w-10/12 h-[300px] mx-auto relative",
            ref: imgContainerRef,
            children: cardData.map(function(item, index) {
                var randomInt = Math.floor(Math.random() * 6) + 1 + 1;
                var sInt = randomInt * ((index + 1) % 2 === 0 ? 1 : -1);
                return item.url ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", {
                    src: item.url,
                    alt: "images",
                    className: index == cardData.length - 1 ? "w-full h-auto absolute rounded-lg transform transition linear duration-[0.8s]" : rotationClassesImages[sInt.toString()]
                }, index) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", {
                    className: index == cardData.length - 1 ? "w-full h-full px-[20px] py-[20px] flex justify-center items-center absolute rounded-lg transform bg-white text-black border border-gray-200 transition linear duration-[0.8s]" : rotationClassesWords[sInt.toString()],
                    children: item.content
                }, index);
            })
        })
    });
};
var FlashCards_default = FlashCardsComponent;
// src/components/Image/index.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var ImageComponent = function(param) {
    var data = param.data, slide = param.slide;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, {
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("img", {
            src: data.url,
            alt: "images",
            className: "w-8/12 mx-auto rounded-lg"
        })
    });
};
var Image_default = ImageComponent;
// src/components/Options/index.tsx
var import_react3 = require("react");
// src/components/Options/handler.tsx
var optionAlphabets = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L"
];
var optionStyles = {
    wrong: "w-full px-[20px] py-[15px] my-[15px] bg-[#F17B0C] rounded-[6px] text-left cursor-pointer",
    inactive: "w-full px-[20px] py-[15px] my-[15px] bg-white rounded-[6px] text-left cursor-pointer",
    correct: "w-full px-[20px] py-[15px] my-[15px] bg-[#86A94B] rounded-[6px] text-left cursor-pointer",
    answered: "w-full px-[20px] py-[15px] my-[15px] bg-[#AEC0C9] rounded-[6px] text-left cursor-pointer"
};
// src/components/Options/index.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var OptionsComponent = function(param) {
    var data = param.data, slide = param.slide;
    var _ref = _sliced_to_array((0, import_react3.useState)([]), 2), options = _ref[0], setOptions = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react3.useState)([]), 2), answers = _ref1[0], setAnswers = _ref1[1];
    var _ref2 = _sliced_to_array((0, import_react3.useState)(-1), 2), selectedOption = _ref2[0], setSelectedOption = _ref2[1];
    var _ref3 = _sliced_to_array((0, import_react3.useState)([]), 2), answeredList = _ref3[0], setAnsweredList = _ref3[1];
    var selectOption = function(index) {
        setSelectedOption(function() {
            return index;
        });
        if (answers.includes(options[index])) {
            alert("correct");
            setAnsweredList(function(previous) {
                return _to_consumable_array(previous).concat([
                    index
                ]);
            });
        } else {
            alert("wrong");
        }
    };
    var loadOptionStyle = function(index) {
        return selectedOption === index ? answers.includes(options[index]) ? optionStyles.correct : optionStyles.wrong : answeredList.includes(index) ? optionStyles.answered : optionStyles.inactive;
    };
    (0, import_react3.useEffect)(function() {
        setOptions(function() {
            return data.options;
        });
        setAnswers(function() {
            return data.answers;
        });
    }, [
        data.answers,
        data.options
    ]);
    (0, import_react3.useEffect)(function() {
        if (answeredList.length && answeredList.length === answers.length) {
            var _slide_functions;
            (_slide_functions = slide.functions) === null || _slide_functions === void 0 ? void 0 : _slide_functions.allowProceed();
        }
    });
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, {
        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", {
            children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", {
                    className: "text-center text-[14px]",
                    children: "SELECT MULTIPLE ANSWERS"
                }),
                options.map(function(option, index) {
                    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", {
                        className: loadOptionStyle(index),
                        onClick: function() {
                            return selectOption(index);
                        },
                        children: [
                            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", {
                                className: "text-[#87909E]",
                                children: [
                                    optionAlphabets[index],
                                    "."
                                ]
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", {
                                className: selectedOption === index ? "text-white ml-[10px]" : "text-[#030036] ml-[10px]",
                                children: option
                            })
                        ]
                    }, index);
                })
            ]
        })
    });
};
var Options_default = OptionsComponent;
// src/components/SlideManager/index.tsx
var import_react10 = require("react");
// src/components/Slider/index.tsx
var import_react4 = require("react");
// src/img/chevron-right.svg
var chevron_right_default = "./chevron-right-EPBCYDED.svg";
// src/img/chevron-left.svg
var chevron_left_default = "./chevron-left-3D3XO2D7.svg";
// src/components/Slider/index.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var SliderComponent = function(param) {
    var data = param.data, slide = param.slide;
    var _ref = _sliced_to_array((0, import_react4.useState)(data.slides[0]), 2), activeSection = _ref[0], setActiveSection = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react4.useState)(0), 2), activeSectionIndex = _ref1[0], setActiveSectionIndex = _ref1[1];
    var moveSlide = function(direction) {
        if (activeSectionIndex + direction >= 0 && activeSectionIndex + direction < data.slides.length) {
            setActiveSection(function() {
                return data.slides[activeSectionIndex + direction];
            });
            setActiveSectionIndex(function() {
                return activeSectionIndex + direction;
            });
        }
    };
    slide.setFunction("moveSlide", moveSlide);
    var componentLoader = function(component) {
        var Component = loadComponent(component);
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Component, {
            data: component,
            slide: slide
        });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, {
        children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", {
            className: "w-full flex flex-row justify-center",
            children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", {
                className: "w-3/5 py-6 flex flex-row justify-between items-center",
                children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("img", {
                        src: chevron_right_default,
                        onClick: function() {},
                        alt: "images",
                        className: "cursor-pointer h-[40px] ".concat(data.slides.indexOf(activeSection) === 0 ? "hidden" : "")
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", {
                        className: "py-8 px-4 mx-[40px] bg-[#F6ECEC] text-black grow rounded-lg",
                        children: componentLoader(data.slides[activeSectionIndex])
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("img", {
                        alt: "images",
                        onClick: function() {},
                        src: chevron_left_default,
                        className: "cursor-pointer h-[40px] ".concat(data.slides.indexOf(activeSection) === data.slides.length - 1 ? "hidden" : "")
                    })
                ]
            })
        })
    });
};
var Slider_default = SliderComponent;
// src/components/Text/index.tsx
var import_react7 = require("react");
// src/components/Text/handler.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var formatIdentifiers = {
    bold: [
        "<**",
        "**>"
    ],
    italic: [
        "<!!",
        "!!>"
    ],
    keyword: [
        "<(",
        ")>"
    ]
};
var formatMappings = {
    bold: function(text) {
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("strong", {
            children: [
                " ",
                text,
                " "
            ]
        });
    },
    italic: function(text) {
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("i", {
            children: [
                " ",
                text,
                " "
            ]
        });
    },
    keyword: function(text) {
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", {
            className: "text-green-500",
            children: [
                " ",
                text,
                " "
            ]
        });
    }
};
var format = function(key, text) {
    return formatMappings[key](text);
};
var collectFormattingIndices = function(list) {
    var index = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var identifiers = Object.values(formatIdentifiers);
    var keys = Object.keys(formatIdentifiers);
    var pair = identifiers[index];
    var indices = {};
    var track = false;
    for(var i = 0; i < list.length; i++){
        var text = list[i];
        if (text.includes(pair[0])) {
            track = true;
            list[i] = list[i].replace(pair[0], "");
        }
        if (track) {
            var key = keys[index];
            if (indices[key]) {
                indices[key].push(i);
            } else {
                indices[key] = [
                    i
                ];
            }
        }
        if (text.includes(pair[1])) {
            track = false;
            list[i] = list[i].replace(pair[1], "");
        }
    }
    if (identifiers.length > index + 1) {
        var next = collectFormattingIndices(list, index + 1);
        return {
            list: next.list,
            indices: _object_spread({}, indices, next.indices)
        };
    }
    return {
        list: list,
        indices: indices
    };
};
var handleFormatting = function(content) {
    var _loop = function(key) {
        var indicesToFormat = collect.indices[key];
        indicesToFormat.forEach(function(index) {
            collect.list[index] = format(key, collect.list[index]);
        });
    };
    var list = content.split(" ");
    var collect = collectFormattingIndices(list);
    for(var key in collect.indices)_loop(key);
    return collect.list;
};
var processTextContent = function(content) {
    return handleFormatting(content);
};
// src/utilities/string.tsx
var randomString = function(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    var counter = 0;
    while(counter < length){
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};
// src/components/extensions/ToolTip/render.tsx
var import_react5 = require("react");
// src/components/extensions/extMedia/dropdown-svgrepo-com.svg
var dropdown_svgrepo_com_default = "./dropdown-svgrepo-com-KOMVNEDJ.svg";
// src/components/extensions/ToolTip/render.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var ToolTipComponent = function(param) {
    var label = param.label, content = param.content;
    var _ref = _sliced_to_array((0, import_react5.useState)(false), 2), toolTip = _ref[0], setTooltip = _ref[1];
    var showTip = function() {
        setTooltip(!toolTip);
    };
    var ref = (0, import_react5.useRef)(null);
    (0, import_react5.useEffect)(function() {
        var handleClickOutside = function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setTooltip(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function() {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
    var RenderTip = function(param) {
        var item = param.item;
        return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", {
            className: "absolute h-[400px] flex items-end -top-[410px] -left-[100px] lg:-left-[132px] w-64 lg:w-[350px]",
            children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", {
                className: "bg-[#4F46E5] text-center text-white px-2 py-2 rounded-lg",
                children: [
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", {
                        children: [
                            " ",
                            item
                        ]
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("img", {
                        src: dropdown_svgrepo_com_default,
                        alt: "pointer",
                        className: "w-16 absolute -bottom-[35px] left-[35%]"
                    })
                ]
            })
        });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, {
        children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", {
            className: "relative cursor-pointer underline inline text-center",
            onClick: function() {
                return showTip();
            },
            ref: ref,
            children: [
                toolTip && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(RenderTip, {
                    item: content
                }),
                /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", {
                    children: label
                })
            ]
        })
    });
};
var render_default = ToolTipComponent;
// src/components/extensions/ToolTip/index.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var ToolTipTypes = function ToolTipTypes() {
    _class_call_check(this, ToolTipTypes);
};
ToolTipTypes.TEXT = "Text";
var ToolTipsHandler = /*#__PURE__*/ function() {
    function ToolTipsHandler(type, data, tips) {
        _class_call_check(this, ToolTipsHandler);
        this.type = type;
        this.tips = tips;
        this.data = data;
        this.ids = [];
        this.processDataTips();
    }
    _create_class(ToolTipsHandler, [
        {
            key: "getIdentifiers",
            value: function getIdentifiers() {
                return [
                    "<~",
                    "~>"
                ];
            }
        },
        {
            key: "generateToolTip",
            value: function generateToolTip(content) {}
        },
        {
            key: "formatToolTip",
            value: function formatToolTip(text, tipContent) {
                var id = randomString(15);
                return {
                    id: id,
                    element: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(render_default, {
                        label: text,
                        content: tipContent
                    })
                };
            }
        },
        {
            key: "processDataTips",
            value: function processDataTips() {
                var _this = this;
                var identifiers = this.getIdentifiers();
                var start = identifiers[0], end = identifiers[1];
                var textContent = this.data;
                var tipIndex = 0;
                textContent.forEach(function(item, index) {
                    if (typeof item == "string") {
                        if (item.includes(start)) {
                            var extracted = item.replace(start, "").replace(end, "");
                            var formattedTip = _this.formatToolTip(extracted, _this.tips[tipIndex]);
                            textContent[index] = formattedTip.element;
                            tipIndex++;
                        }
                    }
                });
                return textContent;
            }
        }
    ]);
    return ToolTipsHandler;
}();
var ToolTips = function(type, data, tips) {
    return new ToolTipsHandler(type, data, tips);
};
// src/components/extensions/TextFields/render.tsx
var import_react6 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
var TextFieldComponent = function(param) {
    var id = param.id, manager = param.manager;
    var _ref = _sliced_to_array((0, import_react6.useState)(""), 2), value = _ref[0], setValue = _ref[1];
    var handleChange = function(e) {
        setValue(e.target.value);
        manager.setFieldValue(id, e.target.value);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_jsx_runtime10.Fragment, {
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("input", {
            type: "text",
            name: "value",
            id: id,
            className: "bg-white h-[22px] border border-[#4F46E5] px-3 mx-2 input-style w-20 rounded-[20px] ",
            onChange: handleChange,
            disabled: true
        })
    });
};
var render_default2 = TextFieldComponent;
// src/components/extensions/TextFields/index.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var TextFieldsHandler = /*#__PURE__*/ function() {
    function TextFieldsHandler(data) {
        _class_call_check(this, TextFieldsHandler);
        this.data = data;
        this.fieldIds = [];
        this.fieldData = {};
        this.processTextFields();
    }
    _create_class(TextFieldsHandler, [
        {
            key: "getIdentifier",
            value: function getIdentifier() {
                return "<?>";
            }
        },
        {
            key: "generateToolTip",
            value: function generateToolTip(content) {}
        },
        {
            key: "setFieldValue",
            value: function setFieldValue(id, value) {
                var newValue = {};
                var _this_fieldData_id;
                newValue[id] = _object_spread_props(_object_spread({}, (_this_fieldData_id = this.fieldData[id]) !== null && _this_fieldData_id !== void 0 ? _this_fieldData_id : {}), {
                    value: value
                });
                this.fieldData = _object_spread({}, this.fieldData, newValue);
            }
        },
        {
            key: "fieldReplacementFill",
            value: function fieldReplacementFill(index, value, data) {
                var fieldIndex = Object.values(this.fieldData)[index].index;
                data[fieldIndex] = /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", {
                    className: "text-green-500 font-semibold text-[17px]",
                    children: value
                });
                return _to_consumable_array(data);
            }
        },
        {
            key: "formatTextField",
            value: function formatTextField() {
                var id = randomString(15);
                return {
                    id: id,
                    element: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(render_default2, {
                        id: id,
                        manager: this
                    })
                };
            }
        },
        {
            key: "processTextFields",
            value: function processTextFields() {
                var _this = this;
                var identifier = this.getIdentifier();
                var textContent = this.data;
                textContent.forEach(function(item, index) {
                    if (typeof item == "string") {
                        if (item === identifier) {
                            var field = _this.formatTextField();
                            _this.fieldIds.push(field.id);
                            textContent[index] = field.element;
                            _this.fieldData[field.id] = {
                                index: index
                            };
                        }
                    }
                });
                this.data = textContent;
                return textContent;
            }
        }
    ]);
    return TextFieldsHandler;
}();
var TextFields = function(data) {
    return new TextFieldsHandler(data);
};
// src/components/Text/index.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var TextComponent = function(param) {
    var styles = param.styles, data = param.data, slide = param.slide;
    var _ref = _sliced_to_array((0, import_react7.useState)(processTextContent(data.content)), 2), processed = _ref[0], setProcessed = _ref[1];
    if (processed.includes("<?>")) {
        var textFields = TextFields(processed);
        slide.addFields(textFields);
        slide.setFunction("selectAnswer", function(index, value) {
            var updateProcessed = textFields.fieldReplacementFill(index, value, processed);
            setProcessed(function() {
                return updateProcessed;
            });
        });
    }
    if (data.tips) {
        ToolTips(ToolTipTypes.TEXT, processed, data.tips);
    }
    (0, import_react7.useEffect)(function() {
        setProcessed(processTextContent(data.content));
    }, [
        data
    ]);
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_jsx_runtime12.Fragment, {
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", {
            children: processed.map(function(item, index) {
                return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", {
                    children: typeof item == "string" ? " ".concat(item, " ") : item
                }, index);
            })
        })
    });
};
var Text_default = TextComponent;
// src/components/Video/index.tsx
var import_react8 = require("react");
var import_jsx_runtime13 = require("react/jsx-runtime");
var VideoComponent = function(param) {
    var data = param.data, slide = param.slide;
    var videoRef = (0, import_react8.useRef)(null);
    var endVideo = function() {
        var _slide_functions, _slide;
        (_slide = slide) === null || _slide === void 0 ? void 0 : (_slide_functions = _slide.functions) === null || _slide_functions === void 0 ? void 0 : _slide_functions.allowProceed();
    };
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_jsx_runtime13.Fragment, {
        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", {
            className: "w-full",
            children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("video", {
                className: "w-full",
                controls: true,
                autoPlay: true,
                ref: videoRef,
                onEnded: function() {
                    return endVideo();
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("source", {
                    src: data.url,
                    type: "video/mp4"
                })
            })
        })
    });
};
var Video_default = VideoComponent;
// src/components/WordMatch/index.tsx
var import_react9 = require("react");
// src/utilities/array.tsx
var hasIdenticalIndex = function(a, b) {
    var identical = false;
    a.forEach(function(item, index) {
        if (item === b[index]) {
            identical = true;
        }
    });
    return identical;
};
// src/components/WordMatch/handler.tsx
var optionStyles2 = {
    active: "w-[100%] h-[100%] py-[20px] px-[15px] bg-[#86A94B] text-white polygon-clip text-left",
    inactive: "w-[100%] h-[100%] py-[20px] px-[15px] bg-white text-[#87909E] polygon-clip text-left",
    answered: "w-[100%] h-[100%] py-[20px] px-[15px] bg-[#66803C] polygon-clip text-left"
};
var anwserStyles = {
    inactive: "w-[60%] border-[2px] rounded-[6px] border-[#86A94B] bg-white text-[#87909E] py-[10px] px-[15px] cursor-pointer",
    answered: "w-[60%] border-[2px] rounded-[6px] border-[#86A94B] bg-[#66803C] py-[10px] px-[15px] cursor-pointer"
};
var shuffleAnswers = function(answers) {
    var shuffled = _to_consumable_array(answers);
    while(hasIdenticalIndex(shuffled, answers)){
        for(var i = shuffled.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
    }
    return shuffled;
};
// src/components/WordMatch/index.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var WordMatchComponent = function(param) {
    var data = param.data, slide = param.slide;
    var _ref = _sliced_to_array((0, import_react9.useState)(-1), 2), activeOptionIndex = _ref[0], setActiveOptionIndex = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react9.useState)([]), 2), optionsList = _ref1[0], setOptionsList = _ref1[1];
    var _ref2 = _sliced_to_array((0, import_react9.useState)([]), 2), answersList = _ref2[0], setAnswersList = _ref2[1];
    var _ref3 = _sliced_to_array((0, import_react9.useState)([]), 2), answeredList = _ref3[0], setAnsweredList = _ref3[1];
    var selectOption = function(index) {
        if (!answeredList.includes(index)) {
            setActiveOptionIndex(function() {
                return index;
            });
        }
    };
    var matchOption = function(index) {
        var correctAnswer = data.answers[activeOptionIndex];
        var selectedAnswer = answersList[index];
        if (selectedAnswer === correctAnswer) {
            alert("Correct");
            setAnsweredList(function(previous) {
                return _to_consumable_array(previous).concat([
                    answeredList.length
                ]);
            });
            var sorted = optionsList;
            var tempTop = optionsList[answeredList.length];
            sorted[answeredList.length] = optionsList[activeOptionIndex];
            sorted[activeOptionIndex] = tempTop;
            setOptionsList(function() {
                return _to_consumable_array(sorted);
            });
            var newAnswers = answersList;
            newAnswers[index] = answersList[answeredList.length];
            newAnswers[answeredList.length] = correctAnswer;
            setAnswersList(function() {
                return _to_consumable_array(newAnswers);
            });
        } else {
            alert("Wrong");
        }
    };
    var loadStyles = function(index) {
        return answeredList.includes(index) ? optionStyles2["answered"] : activeOptionIndex === index ? optionStyles2["active"] : optionStyles2["inactive"];
    };
    (0, import_react9.useEffect)(function() {
        setOptionsList(function() {
            return data.options;
        });
        setAnswersList(function() {
            return shuffleAnswers(data.answers);
        });
    }, [
        data
    ]);
    (0, import_react9.useEffect)(function() {
        if (answeredList.length !== 0 && answeredList.length === answersList.length) {
            var _slide_functions;
            (_slide_functions = slide.functions) === null || _slide_functions === void 0 ? void 0 : _slide_functions.allowProceed();
        }
    }, [
        answeredList,
        answersList,
        slide
    ]);
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, {
        children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", {
            children: optionsList.length && optionsList.map(function(option, index) {
                return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", {
                    className: "w-[90%] my-[20px] mx-auto flex justify-center",
                    children: [
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", {
                            className: "w-[40%] py-[2px] px-[3px] mr-[20px] h-auto bg-[#86A94B] polygon-clip flex justify-center items-center cursor-pointer",
                            onClick: function() {
                                return selectOption(index);
                            },
                            children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", {
                                className: loadStyles(index),
                                children: optionsList[index]
                            })
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", {
                            className: answeredList.includes(index) ? anwserStyles.answered : anwserStyles.inactive,
                            onClick: function() {
                                return matchOption(index);
                            },
                            children: answersList[index]
                        })
                    ]
                }, index);
            })
        })
    });
};
var WordMatch_default = WordMatchComponent;
// src/components/SlideManager/handler.tsx
var LessonSlide = /*#__PURE__*/ function() {
    function LessonSlide() {
        _class_call_check(this, LessonSlide);
        this.progress = 0;
    }
    _create_class(LessonSlide, [
        {
            key: "setOptions",
            value: function setOptions(options) {
                this.options = options;
            }
        },
        {
            key: "setAnswers",
            value: function setAnswers(answers) {
                this.answers = answers;
            }
        },
        {
            key: "setStatus",
            value: function setStatus(status) {
                this.status = status;
            }
        },
        {
            key: "addFields",
            value: function addFields(textFieldInstance) {
                if (this.textFields) {
                    this.textFields.push(textFieldInstance);
                } else {
                    this.textFields = [
                        textFieldInstance
                    ];
                }
            }
        },
        {
            key: "selectAnswer",
            value: function selectAnswer(index, value, callback) {
                if (this.options) {
                    this.selectOptionAnswer(index, value, callback);
                    return;
                }
                if (this.answers) {
                    if (/*index > this.progress  ||*/ this.answers[index] !== value) {
                        alert("Wrong Answer");
                        this.triggerFeedback();
                    } else {
                        var _this_functions;
                        (_this_functions = this.functions) === null || _this_functions === void 0 ? void 0 : _this_functions.selectAnswer(index, value);
                        alert("Correct");
                        this.triggerFeedback();
                        this.progress++;
                        if (this.progress === this.answers.length) {
                            var _this_functions1, _this_functions2;
                            this.complete = true;
                            (_this_functions1 = this.functions) === null || _this_functions1 === void 0 ? void 0 : _this_functions1.allowProceed();
                            if ((_this_functions2 = this.functions) === null || _this_functions2 === void 0 ? void 0 : _this_functions2.moveSlide) {
                                var _this_functions3;
                                (_this_functions3 = this.functions) === null || _this_functions3 === void 0 ? void 0 : _this_functions3.moveSlide(1);
                            }
                        }
                    }
                }
            }
        },
        {
            key: "selectOptionAnswer",
            value: function selectOptionAnswer(index, value, callback) {
                var _this = this;
                if (this.answers) {
                    var answer = this.answers[this.progress];
                    if (answer === value) {
                        this.progress++;
                        alert("Correct");
                        if (this.progress === this.answers.length) {
                            var _this_functions;
                            this.complete = true;
                            (_this_functions = this.functions) === null || _this_functions === void 0 ? void 0 : _this_functions.allowProceed();
                        }
                        setTimeout(function() {
                            _this.callComponentFunctions(value);
                            callback();
                        }, 400);
                        this.triggerFeedback();
                    } else {
                        alert("Wrong");
                    }
                }
            }
        },
        {
            key: "callComponentFunctions",
            value: function callComponentFunctions(value) {
                var _this_functions, _this_functions1, _this_functions2;
                if ((_this_functions = this.functions) === null || _this_functions === void 0 ? void 0 : _this_functions.selectAnswer) {
                    var _this_functions3;
                    (_this_functions3 = this.functions) === null || _this_functions3 === void 0 ? void 0 : _this_functions3.selectAnswer(0, value);
                }
                if ((_this_functions1 = this.functions) === null || _this_functions1 === void 0 ? void 0 : _this_functions1.moveSlide) {
                    var _this_functions4;
                    (_this_functions4 = this.functions) === null || _this_functions4 === void 0 ? void 0 : _this_functions4.moveSlide(1);
                }
                if ((_this_functions2 = this.functions) === null || _this_functions2 === void 0 ? void 0 : _this_functions2.removeCard) {
                    var _this_functions5;
                    (_this_functions5 = this.functions) === null || _this_functions5 === void 0 ? void 0 : _this_functions5.removeCard();
                }
            }
        },
        {
            key: "setFunction",
            value: function setFunction(functionName, handler) {
                if (this.functions) {
                    this.functions[functionName] = handler;
                } else {
                    this.functions = {};
                    this.functions[functionName] = handler;
                }
            }
        },
        {
            key: "triggerFeedback",
            value: function triggerFeedback() {}
        },
        {
            key: "eventManager",
            value: function eventManager() {
                return {
                    on: function(eventName, callback) {
                        window.addEventListener(eventName, function(data) {
                            callback(data.detail);
                        });
                    },
                    action: function(eventName, data) {
                        var event = new CustomEvent(eventName, {
                            detail: data
                        });
                        window.dispatchEvent(event);
                    }
                };
            }
        }
    ]);
    return LessonSlide;
}();
var LessonSlideScope = function() {
    return new LessonSlide();
};
var keyToComponentMapper = {
    "Text": Text_default,
    "ButtonGroup": ButtonGroup_default,
    "Image": Image_default,
    "Slider": Slider_default,
    "FlashCards": FlashCards_default,
    "Video": Video_default,
    "WordMatch": WordMatch_default,
    "Options": Options_default
};
var loadComponent = function(componentData) {
    return keyToComponentMapper[componentData.component];
};
// src/components/SlideManager/index.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
var SlideManager = (0, import_react10.forwardRef)(function(param, ref) {
    var lessonSlides = param.lessonSlides, canProceed = param.canProceed;
    var SlideScope = LessonSlideScope();
    var _ref = _sliced_to_array((0, import_react10.useState)(lessonSlides[0]), 2), activeSlide = _ref[0], setActiveSlide = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react10.useState)(0), 2), activeSlideIndex = _ref1[0], setActiveSlideIndex = _ref1[1];
    var navigateSlide = function(direction) {
        if (lessonSlides.length > activeSlideIndex + direction && activeSlideIndex + direction >= 0) {
            setActiveSlide(function() {
                return lessonSlides[activeSlideIndex + direction];
            });
            setActiveSlideIndex(function() {
                return activeSlideIndex + direction;
            });
        }
    };
    (0, import_react10.useImperativeHandle)(ref, function() {
        return {
            navigator: function navigator(direction) {
                navigateSlide(direction);
                SlideScope.progress = 0;
            }
        };
    });
    SlideScope.setFunction("navigateSlide", navigateSlide);
    SlideScope.setFunction("allowProceed", function() {
        return canProceed(true);
    });
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", {
        className: "mx-auto w-10/12 grid gap-y-5 my-5",
        children: activeSlide.map(function(component, index) {
            var Component = loadComponent(component);
            return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Component, {
                data: component,
                slide: SlideScope
            }, index);
        })
    });
});
