import React, { useRef, useState } from "react";
import SlideManager from "../components/SlideManager";

const RenderComponent = () => {
    interface managerFunctions {
        navigator: Function;
    }
    const slideManagerRef = useRef<managerFunctions>(null);
    const slides = [
        // [
        //     {
        //         tips: [],
        //         content: "<*-Rotation of the sun-*>",
        //         component: "Text",
        //     },
        //     {
        //         tips: ["This imaginary line is called the earth's axis."],
        //         content:
        //             "The earth rotates from the West to the East as if it is being turned on an <~imaginary line~> passing through its centre.",
        //         component: "Text",
        //     },
        //     {
        //         content:
        //             "The <?> is not ready",
        //         component: "Text",
        //         answers: [
        //             "Test",
        //         ],
        //     },
        //     {
        //         answers: [
        //             ["Day", "Night"],
        //             ["Night", "Day"],
        //         ],
        //         content:
        //             "This rotation of the earth about its axis causes <?> and <?> .",
        //         component: "Text",
        //     },
        //     {
        //         content:
        //             "The earth makes one complete rotation about its axis in <(<**twenty-four hours**>)>.",
        //         component: "Text",
        //     },
        // ],
        [
            {
                component : "Text",
                content : "The robot needs to get to the cookie. We would write a program to help the robot reach the box with the cookie.",
            },
            {
                component: "GridSteps",
                start : "1X1",
                end : "4X1",
                size : "4X4",
                steps : 5,
                example : true
            },
        ],
        [
            {
                component: "GridSteps",
                start : "1X1",
                end : "4X3",
                size : "4X4",
                steps : 5,
                answers : ["4X3"],
            },
        ],
        [
            {
                component: "GridSteps",
                start : "3X4",
                end : "1X2",
                size : "4X4",
                steps : 4,
                answers : ["4X3"],
            },
        ],
        // [
        //     {
        //         component: "Slider",
        //         slides: [
        //             [
        //                 {
        //                     component: "Image",
        //                     url: "https://i.imgur.com/MFjcrt7.jpeg",
        //                     alternatives: [],
        //                 },
        //                 {
        //                     component: "Text",
        //                     content: "The <?> has how many teeth.",
        //                     answers: [
        //                         "Tiger"
        //                     ]
        //                 },
        //             ],
        //             [
        //                 {
        //                     component: "Image",
        //                     url: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?cs=srgb&dl=pexels-pixabay-206359.jpg&fm=jpg",
        //                     alternatives: [],
        //                 },
        //                 {
        //                     component: "Text",
        //                     content: "I just need some peace of <?>",
        //                 },
        //                 {
        //                     component : "ButtonGroup",
        //                     options : [
        //                         ["sense", "mind"]
        //                     ],
        //                     answers: [
        //                         "mind"
        //                     ]
        //                 }
        //             ]
        //         ],
        //     },
        // ],
        // [
        //     {
        //         tips: [],
        //         content: "<*-Rotation of the sun-*>",
        //         component: "Text",
        //     },
        //     {
        //         tips: ["This imaginary line is called the earth's axis."],
        //         content:
        //             "The earth rotates from the West to the East as if it is being turned on an <~imaginary line~> passing through its centre.",
        //         component: "Text",
        //     },
        //     {
        //         content:
        //             "The <?> is not ready",
        //         component: "Text",
        //         answers: [
        //             "Test",
        //         ],
        //     },
        //     {
        //         answers: [
        //             ["Day", "Night"],
        //             ["Night", "Day"],
        //         ],
        //         content:
        //             "This rotation of the earth about its axis causes <?> and <?> .",
        //         component: "Text",
        //     },
        //     {
        //         content:
        //             "The earth makes one complete rotation about its axis in <(<**twenty-four hours**>)>.",
        //         component: "Text",
        //     },
        // ],
        // [
        //     {
        //         tips: [],
        //         content: "<(<**The Effects of the Revolution of the Earth**>)>",
        //         component: "Text",
        //     },
        //     {
        //         tips: [],
        //         content:
        //             "The <?> of the earth around the <?> makes it possible for some parts of the earth to receive more sunlight than other parts at a given time.",
        //         component: "Text",
        //         answers: ["revolution", "sun"],
        //     },
        //     {
        //         tips: [],
        //         content:
        //             "There are <?> planets in the solar system. The <?> is the third planet.",
        //         component: "Text",
        //         answers: [["nine", "9ine"], "earth"],
        //     },
        //     {
        //         tips: [],
        //         content: "There are two major seasons in Nigeria namely: ",
        //         component: "Text",
        //     },
        //     {
        //         tips: [
        //             "During wet seasons the weather is cooler and windy,there is a lot of rainfall and this is between the months of March and September.",
        //             "During the dry season the weather is very hot and dry and this is between the months of October and February.",
        //         ],
        //         content: "<~wet season~> and the <~dry season~>.",
        //         component: "Text",
        //     },
        //     {
        //         tips: [
        //             "During wet seasons the weather is cooler and windy,there is a lot of rainfall and this is between the months of March and September.",
        //         ],
        //         content:
        //             "There’s a special period during the dry season, when the weather is hot and dry during the day, yet it is very cold at night and in the early mornings,this is called the <~harmattan period~>.",
        //         component: "Text",
        //     },
        // ],
        // [
        //     {
        //         component: "Text",
        //         content: "<**Rotation of the sun**>",
        //         tips: [],
        //     },
        //     {
        //         component: "Text",
        //         content:
        //             "The earth rotates from the West to the East as if it is being turned on an <~imaginary line~> passing through its centre. This rotation of the earth about its axis causes <?> and <?> . The earth makes one complete rotation about its axis in <(<**twenty-four hours**>)>.",
        //         tips: ["This imaginary line is called the earth's axis."],
        //     },
        //     {
        //         component: "ButtonGroup",
        //         options: [],
        //         answers: ["Day", "Night"],
        //         feedbacks: [
        //             [
        //                 "When the earth rotates, since it is spherical, only one half of it faces the sun and it is day time in countries on that part of the earth.",
        //                 "The side which does not receive light from the sun at that time is dark, and it is night time in such places.",
        //             ],
        //         ],
        //     },
        // ],

        // [
        //     {
        //         component: "Video",
        //         url: " https://youtube.com/embed/CeuYx-AbZdo", //"https://www.youtube.com/embed/BriPpne6Yt8",
        //         alternatives: [],
        //     },
        // ],
        // [
        //     {
        //         component: "Video",
        //         url: "//cdn-cf-east.streamable.com/video/mp4/trilgt.mp4?Expires=1693571581819&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=mi-d5O2j7O8BWiEA1ZN7yR223LOaUYm7Oo5yNyPwm75i8aNhibEretYUqZZ6v-t~x3RPmQTiuIh4ayTzQ8qcFadOUoLxItUkcnG49pt0ht9xcJuYAO0sDFaYEASz1gwkpZCsyj7vE6iapoPUEz3rh4BoAL5D7aYbcePVPqw02gRp-hQQs-cSSy7-Fg~95T38fFUFn3Wl8nd46119CJKofd3LinrvvN~AoOZVuQ9NnaO~Ev1O1Vr6giU3w52YyOLOYViIjdJI7nNoKO1iaeXTPUrS3FUG7sCBstsNj5eeRNN-OVbExjtmEggKTdxZBTbXgDiyJKXWfNU8IELTOil0Mg__",
        //         alternatives: [],
        //     },
        // ],
        // [
        //     {
        //         component: "Text",
        //         content: "<**Revolution of the Earth Round the Sun**>",
        //     },
        //     {
        //         component: "Text",
        //         content:
        //             "At the same time as the earth <?> on its axis, it also revolves around the sun. The movement of the earth around the sun is called the <(<**revolution of the earth.**>)>",
        //     },
        //     {
        //         component: "Image",
        //         url: "https://i.imgur.com/MFjcrt7.jpeg",
        //         alternatives: [],
        //     },
        //     {
        //         component: "ButtonGroup",
        //         options: [["rotates", "zig zag"]],
        //         answers: ["rotates"],
        //         feedbacks: [
        //             [
        //                 "Absolutely correct the earth rotates on its axis as it revolves around the sun.",
        //                 "Really,does the earth zig zag about its axis?",
        //             ],
        //         ],
        //     },
        // ],
        // [
        //     {
        //         "component": "Text",
        //         "content": "The earth <?> rounds the sun in about <(<**365 days**>)> or in <(<**one year**>)>. The path of the earth around the sun is not a circle. It is a (geometrical) shape called an <~ellipse.~>",
        //         "tips": [
        //             "While the earth appears to be round,it is irregularly shaped and this is called ellipse."
        //         ]
        //     },
        //     {
        //         "component": "Video",
        //         "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        //         "alternatives": []
        //     },
        //     {
        //         "component": "ButtonGroup",
        //         "options": [
        //             [
        //                 "revolves",
        //                 "rotates"
        //             ]
        //         ],
        //         "answers": [
        //             "revolves"
        //         ],
        //         "feedbacks": [
        //             [
        //                 "Great!",
        //                 "Not true!"
        //             ]
        //         ]
        //     }
        // ],
        // [
        //     {
        //         "component": "Text",
        //         "content": "<**The Effects of the Revolution of the Earth**>",
        //         "tips": []
        //     },
        //     {
        //         "component": "Text",
        //         "content": "The <?> of the earth around the sun makes it possible for some parts of the earth to receive more sunlight than other parts at a given time.",
        //         "tips": []
        //     },
        //     {
        //         "component": "Text",
        //         "content": "There are two major seasons in Nigeria namely: <~wet season~>",
        //         "tips": [
        //             "During wet seasons the weather is cooler and windy,there is a lot of rainfall and this is between the months of March and September."
        //         ]
        //     },
        //     {
        //         "component": "Text",
        //         "content": "and the <~dry season~>.",
        //         "tips": [
        //             "During wet seasons the weather is cooler and windy,there is a lot of rainfall and this is between the months of March and September."
        //         ]
        //     },
        //     {
        //         "component": "Text",
        //         "content": "There’s a special period during the dry season, when the weather is hot and dry during the day, yet it is very cold at night and in the early mornings,this is called the <~harmattan period~><(<**.**>)>",
        //         "tips": [
        //             "During wet seasons the weather is cooler and windy,there is a lot of rainfall and this is between the months of March and September."
        //         ]
        //     },
        //     {
        //         "component": "ButtonGroup",
        //         "options": [
        //             [
        //                 "revolution",
        //                 "rotation"
        //             ]
        //         ],
        //         "answers": [
        //             "revolution"
        //         ],
        //         "feedbacks": [
        //             [
        //                 "Great!",
        //                 "Not true!"
        //             ]
        //         ]
        //     }
        // ],
        // [
        //     {
        //         "component": "Text",
        //         "content": "The earth is divided into <(<**four cardinal points**>)> or <(<**main bearings**>)> on a compass. These are: <(<**East**>)>, <(<**West**>)>, <(<**North**>)> and <(<**South**>)>. The compass is used to find directions based on these points."
        //     },
        //     {
        //         "component": "Text",
        //         "content": "Song on cardinal points"
        //     },
        //     {
        //         "component": "Text",
        //         "content": "🎵 🎶 Sun always rises from the East every morning."
        //     },
        //     {
        //         "component": "Text",
        //         "content": "Sun always sets in the West every evening."
        //     },
        //     {
        //         "component": "Text",
        //         "content": "Sun always moves from East to West 🎵🎶"
        //     },
        //     {
        //         "component": "Image",
        //         "url": "https://i.imgur.com/MFjcrt7.jpeg",
        //         "alternatives": []
        //     }
        // ],
        [
            {
                "component": "Text",
                "content": "Now that we have learnt about rotation and revolution of the earth, and their effects, let's ride by attempting some exercise. Match the correct description to their words."
            },
            {
                "component": "Text",
                "content": "turned on an imaginary line passing through its centre.  "
            },
            {
                "component": "WordMatch",
                "options": [
                    "Revolution",
                    "Rotation",
                    "Ellipse"
                ],
                "answers": [
                    "The movement of the earth around the sun",
                    "The earth’s movement from the West to the East as if it is being",
                    "The earth’s irregular shape"
                ],
                "feedbacks": [
                    [
                        "You got it right! 👍",
                        "Nah! I don't think so🙄"
                    ],
                    [
                        "Bravo! 👏 absolutely correct.",
                        "Nah! I don't think so🙄"
                    ],
                    [
                        "Bravo! 👏 , you're a genius",
                        "Nah! I don't think so🙄"
                    ]
                ]
            }
        ],
        // [
        //     {
        //         "component": "Slider",
        //         "slides": [
        //             {
        //                 "component": "Text",
        //                 "content": "1. The two major seasons in Nigeria are the <?> season."
        //             },
        //             {
        //                 "component": "Text",
        //                 "content": "2. The rotation of the earth about its axis causes <?>"
        //             },
        //             {
        //                 "component": "Text",
        //                 "content": "3. The earth is divided into <?> or <(<**main bearings**>)> on a compass. "
        //             }
        //         ]
        //     },
        //     {
        //         "component": "ButtonGroup",
        //         "options": [
        //             [
        //                 "Wet and Dry",
        //                 "Hot and Cold"
        //             ],
        //             [
        //                 "day and night",
        //                 "rain and sunshine"
        //             ],
        //             [
        //                 "Four cardinal points",
        //                 "Six cardinal points"
        //             ]
        //         ],
        //         "answers": [
        //             "Wet and Dry",
        //             "day and night",
        //             "Four cardinal points"
        //         ],
        //         "feedbacks": [
        //             [
        //                 "Bravo! 👏 absolutely correct.",
        //                 "Have another try."
        //             ],
        //             [
        //                 "",
        //                 "Have another try."
        //             ],
        //             [
        //                 "",
        //                 "Have another try."
        //             ]
        //         ]
        //     }
        // ],
        [
            {
                component: "Text",
                content:
                    "Identify what seasons are represented by these images ",
            },
            {
                component: "FlashCards",
                cards: [
                    {
                        url: "https://i.imgur.com/MFjcrt7.jpeg",
                        alternatives: [],
                    },
                    {
                        url: "https://i.imgur.com/MFjcrt7.jpeg",
                        alternatives: [],
                    },
                    {
                        url: "https://i.imgur.com/MFjcrt7.jpeg",
                        alternatives: [],
                    },
                    {
                        url: "https://i.imgur.com/MFjcrt7.jpeg",
                        alternatives: [],
                    },
                    {
                        url: "https://i.imgur.com/MFjcrt7.jpeg",
                        alternatives: [],
                    },
                ],
            },
            {
                component: "ButtonGroup",
                options: [
                    ["Dry Season", "Wet Season"],
                    ["Dry Season", "Wet Season"],
                    ["Autumn Season", "Winter Season"],
                    ["Autumn Season", "Winter Season"],
                    ["Summer Season", "Autumn Season"],
                ],
                answers: [
                    "Dry Season",
                    "Wet Season",
                    "Winter Season",
                    "Autumn Season",
                    "Summer Season",
                ],
                feedbacks: [["Great!", "Not true!"]],
            },
        ],
        [
            {
                component: "Text",
                content: "Let's practice some more😁.",
            },
            {
                component: "Text",
                content: "What are the four cardinal points on a compass ?",
            },
            {
                component: "Options",
                options: ["East", "West", "North", "Centre", "South"],
                answers: ["East", "West", "North", "South"],
                feedbacks: [
                    [
                        "Bravo! 👏 absolutely correct.",
                        "I don’t think so.Have another try.",
                    ],
                ],
            },
        ],
        [
            {
                component: "Text",
                content: "<**Conclusion**>",
            },
            {
                component: "Text",
                content:
                    "Understanding the study of the universe has been an interesting journey and this has helped you comprehend the interaction between the sun and the earth which leads to rotation and revolution.",
            },
            {
                component: "Text",
                content:
                    "The revolution of the earth around the sun makes it possible for some parts of the earth to receive more sunlight than other parts at a given time while the rotation of the earth about its axis causes day and night. ",
            },
            {
                component: "Image",
                url: "https://i.imgur.com/MFjcrt7.jpeg",
                alternatives: [],
            },
        ],
    ];
    const [canProceed, setCanProceed] = useState<boolean>(false);
    const handleContinue = () => {
        slideManagerRef?.current?.navigator(1);
        setCanProceed(false);
    };
    const handleBack = () => {
        slideManagerRef?.current?.navigator(-1);
        setCanProceed(false);
    };

    const triggerFeedback = (text: string, type: string) => {};

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-[calc(100%_-_300px)]">
                    <SlideManager
                        lessonSlides={slides}
                        ref={slideManagerRef}
                        handleFeedback={triggerFeedback}
                        updateActiveSlide={() => {}}
                        canProceed={(v: boolean) => setCanProceed(v)}
                    />
                    {canProceed && (
                        <button
                            className="mx-auto mt-[20px] py-[10px] w-[150px] text-white rounded-[15px] bg-sky-500 hover:bg-sky-700"
                            onClick={() => handleContinue()}
                        >
                            Continue
                        </button>
                    )}
                        <button
                            className="mx-auto mt-[20px] py-[10px] w-[150px] text-white rounded-[15px] bg-sky-500 hover:bg-sky-700"
                            onClick={() => handleBack()}
                        >
                            Previous
                        </button>
                </div>
            </div>
        </>
    );
};

export default RenderComponent;
