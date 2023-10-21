import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RenderComponent from "pages/renderComp";
import { Editorial } from "components";
import { LessonPage } from "pages";

function App() {
  // const datas = {
  //   topic: "Change of things",
  //   term: "1",
  //   lessons: [
  //     {
  //       id: 1,
  //       topic: "The Environment",
  //     },
  //     {
  //       id: 2,
  //       topic: "Air in Motion",
  //     },
  //     {
  //       id: 3,
  //       topic: "Basics of Living things",
  //     },
  //     {
  //       id: 4,
  //       topic: "Animals",
  //     },
  //     {
  //       id: 5,
  //       topic: "Soil",
  //     },
  //   ],
  // };
  // const user = {
  //   name: "Acrobatic Binge",
  // };
  // const [saving, setSaving] = useState(false);
  // const [date, setDate] = useState<any>();
  // const fetchLess = async () => {
  //   await axios
  //     .get("https://beta.api.hellotioo.com/open/lesson/473/template")
  //     .then((res: any) => {
  //       if (!res.error) {
  //         setDate(res.data.data);
  //       } else console.log(res);
  //     });
  // };
  // useEffect(() => {
  //   fetchLess();
  // }, []);
  // const changeFile = async (file: any, payload: any, id: any) => {
  //   setSaving(true);
  //   const checkImg = payload.filter(
  //     (where: any) => where.component === "Image"
  //   );
  //   const datas = payload.filter(
  //     (where: any) => where.component !== "Image" && where.component !== "Video"
  //   );
  //   const fd = new FormData();
  //   fd.append(!!checkImg.length ? "image" : "video", file);
  //   await axios
  //     .put(`https://beta.api.hellotioo.com/open/lesson/templateimage/${id}`, fd)
  //     .then((res: any) => {
  //       if (!res.error) {
  //         const url = res.data.data[0];
  //         const comps = {
  //           alternatives: [],
  //           component: !!checkImg.length ? "Image" : "Video",
  //           url: url,
  //         };
  //         const payloads = {
  //           slide_data: [...datas, comps],
  //         };
  //         axios
  //           .put(
  //             `https://api.hellotioo.com/open/lesson/template/${id}`,
  //             payloads
  //           )
  //           .then((res: any) => {
  //             if (!res.error) {
  //               fetchLess();
  //               setSaving(false);
  //             }
  //           });
  //       } else console.log(res);
  //     });
  // };
  // const changeCard = async (
  //   file: any,
  //   payload: any,
  //   id: any,
  //   length: number,
  //   changedIndex: any
  // ) => {
  //   setSaving(true);
  //   const datas = payload.filter(
  //     (where: any) => where.component !== "FlashCards"
  //   );
  //   const cardsImg = payload.filter(
  //     (where: any) => where.component === "FlashCards"
  //   );
  //   const fd = new FormData();
  //   for (let i = 0; i < file.length; i++) {
  //     fd.append(`image`, file[i]);
  //   }
  //   await axios
  //     .put(`https://beta.api.hellotioo.com/open/lesson/templateimage/${id}`, fd)
  //     .then((res: any) => {
  //       if (!res.error) {
  //         const url = res.data.data;
  //         const newArray = Array(cardsImg[0].cards.length).fill("");
  //         changedIndex.forEach((i: number, index: number) => {
  //           if (i >= 0 && i < newArray.length) {
  //             newArray[i] = url[index];
  //           }
  //         });
  //         const updatedArray = cardsImg[0].cards.map((obj: any, i: number) => {
  //           if (changedIndex.includes(i)) {
  //             return { ...obj, url: newArray[i] };
  //           } else {
  //             return obj;
  //           }
  //         });
  //         const comps = {
  //           cards: updatedArray,
  //           component: "FlashCards",
  //         };
  //         const payloads = {
  //           slide_data: [...datas, comps],
  //         };
  //         axios
  //           .put(
  //             `https://beta.api.hellotioo.com/open/lesson/template/${id}`,
  //             payloads
  //           )
  //           .then((res: any) => {
  //             if (!res.error) {
  //               fetchLess();
  //               setSaving(false);
  //             }
  //           });
  //       } else console.log(res);
  //     });
  // };
  // const changeSlide = async (
  //   file: any,
  //   payload: any,
  //   id: any,
  //   length: number,
  //   changedIndex: any
  // ) => {
  //   setSaving(true);
  //   const datas = payload.filter((where: any) => where.component !== "Slider");
  //   const slideImg = payload.filter(
  //     (where: any) => where.component === "Slider"
  //   );
  //   const fd = new FormData();
  //   for (let i = 0; i < file.length; i++) {
  //     fd.append(`image`, file[i]);
  //   }
  //   await axios
  //     .put(`https://beta.api.hellotioo.com/open/lesson/templateimage/${id}`, fd)
  //     .then((res: any) => {
  //       if (!res.error) {
  //         const url = res.data.data;
  //         const newArray = Array(slideImg[0].slides.length).fill([
  //           { url: "", component: "Image", alternative: [] },
  //         ]);
  //         changedIndex.forEach((i: number, index: number) => {
  //           if (i >= 0 && i < newArray.length) {
  //             newArray[i] = {
  //               url: url[index],
  //               component: "Image",
  //               alternative: [],
  //             };
  //           }
  //         });
  //         const updatedArray = slideImg[0].slides.map((obj: any, i: number) => {
  //           if (changedIndex.includes(i)) {
  //             return [newArray[i]];
  //           } else {
  //             return obj;
  //           }
  //         });
  //         const comps = {
  //           slides: updatedArray,
  //           component: "Slider",
  //           theme: slideImg[0].theme,
  //         };
  //         const payloads = {
  //           slide_data: [...datas, comps],
  //         };
  //         axios
  //           .put(
  //             `https://beta.api.hellotioo.com/open/lesson/template/${id}`,
  //             payloads
  //           )
  //           .then((res: any) => {
  //             if (!res.error) {
  //               fetchLess();
  //               setSaving(false);
  //             }
  //           });
  //       } else console.log(res);
  //     });
  // };
  // const createOverlay = async (
  //   file: any,
  //   ext: any,
  //   text: string,
  //   index: number
  // ) => {
  //   const fd = new FormData();
  //     fd.append(`image`, file);
  //   await axios
  //     .put(`https://beta.api.hellotioo.com/open/lesson/templateimage/${index}`, fd)
  //     .then((res: any) => {
  //       if (!res.error) {
  //         const url = res.data.data;
  //         const overly = {
  //           component: "Image",
  //           url: url[0],
  //           extensions: ext,
  //         };
  //         const textData = {
  //           component: "Text",
  //           content: text,
  //           theme: "White",
  //         };
  //         const payload = {
  //           slide_index: index,
  //           slide_data: [overly, textData]
  //         };
  //         axios.post(`https://beta.api.hellotioo.com/open/lesson/${date.id}/slide`, payload)
  //         .then((res: any) => {
  //           if (!res.error) {
  //             fetchLess();
  //             setSaving(false);
  //           }
  //         });
  //       } else {
  //       }
  //     })
  //     .catch((err) => {});
  // };
  const handleBack = () => {
    // navigate('/')
  };

  const slides = [
    [
        {
            "component": "Preface",
            "objectives": [
                "What Concrete nouns are and examples",
                "What Abstract nouns are and the examples of abstract nouns.",
                "Differentiate between concrete nouns and abstract nouns"
            ],
            "theme": "white"
        }
    ],
    [
        {
            "component": "Image",
            "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696533292/Early%20Coding%20Level%201/Computer_programs_hchp8p.png",
            "alternatives": [],
            "theme": "white"
        },
        {
            "component": "Text",
            "content": "Computers are all around us today, helping us in different areas of our lives and work. ",
            "theme": "white",
            "tips": []
        },
        {
            "component": "Text",
            "content": "Computers are very useful when we need to perform <~<(<**repetitive**>)>~> tasks or when we need to do some calculations really fast.",
            "theme": "white",
            "tips": [
                "They can do the same thing repeatedly without getting tired and quickly perform long calculations without mistakes."
            ]
        },
        {
            "component": "Text",
            "content": "Computers do not think, they only do exactly what they are told to do. Telling a computer what to do is called <(<**Programming **>)>or <(<**Coding.**>)>",
            "theme": "white"
        },
        {
            "component": "Slider",
            "slides": [
                [
                    {
                        "component": "Image",
                        "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696413378/Early%20Coding%20Level%201/desktop_computer_wijyu4.png",
                        "alternatives": []
                    }
                ],
                [
                    {
                        "component": "Image",
                        "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696413416/Early%20Coding%20Level%201/Laptop_jwr5c0.png",
                        "alternatives": []
                    }
                ],
                [
                    {
                        "component": "Image",
                        "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696413463/Early%20Coding%20Level%201/Phone_2_vgyleq.png",
                        "alternatives": []
                    }
                ],
                [
                    {
                        "component": "Image",
                        "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696413512/Early%20Coding%20Level%201/Robot_fdegoi.png",
                        "alternatives": []
                    }
                ]
            ],
            "theme": "white"
        }
    ],
    [
        {
            "component": "Text",
            "content": "Although many of us know desktops and laptops to be the most popular types of computers, many other machines and devices we use daily have computers inside them.",
            "theme": "default"
        },
        {
            "component": "Text",
            "content": "Choose the option that corresponds with the images below:",
            "theme": "default"
        },
        {
            "component": "FlashCards",
            "cards": [
                {
                    "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696450306/Early%20Coding%20Level%201/Microwave_drawing_xmmq5p.png",
                    "alternatives": []
                },
                {
                    "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696450400/Early%20Coding%20Level%201/Phone_drawing_esttoa.png",
                    "alternatives": []
                },
                {
                    "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696580153/Early%20Coding%20Level%201/4_in_1_picture_yy6frc.png",
                    "alternatives": []
                },
                {
                    "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696450371/Early%20Coding%20Level%201/Robot_drawing_gdfbwy.png",
                    "alternatives": []
                }
            ],
            "theme": "default"
        },
        {
            "component": "ButtonGroup",
            "options": [
                [
                    "Guitar",
                    "Microwave"
                ],
                [
                    "Mobile phone",
                    "Apple"
                ],
                [
                    "Lift, etc",
                    "Chair,etc"
                ],
                [
                    "Robot",
                    "Human"
                ]
            ],
            "answers": [
                "Microwave",
                "Mobile phone",
                "Lift, etc",
                "Robot"
            ],
            "feedbacks": [
                [
                    "The microwave oven has a computer that controls the time used to warm your food.",
                    "Does that really look like a guitar? 😶‍"
                ],
                [
                    "Games and movies on mobile phones are controlled by computers",
                    "That is not an apple."
                ],
                [
                    "Lifts, televisions, traffic lights and even some cars all have things that are controlled by computers.",
                    "Are you serious?"
                ],
                [
                    "Even robots are computers.",
                    "I’m sure you don’t look like that."
                ]
            ]
        }
    ],
    [
        {
            "component": "Text",
            "content": "Not all machines or electronic devices are computers, but many of them can have computers added to them to make them <(<**programmable**>)> and <?>",
            "theme": "white"
        },
        {
            "component": "Image",
            "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696533310/Early%20Coding%20Level%201/Red_and_green_e9idwz.png",
            "alternatives": [],
            "theme": "white"
        },
        {
            "component": "ButtonGroup",
            "options": [
                [
                    "rigid",
                    "smarter"
                ]
            ],
            "answers": [
                "smarter"
            ],
            "feedbacks": [
                [
                    "Exactly! Just like you. 😁",
                    "Computers don’t make things rigid."
                ]
            ]
        }
    ],
    [
        {
            "component": "Slider",
            "slides": [
                [
                    {
                        "component": "Image",
                        "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696451628/Early%20Coding%20Level%201/Manual_clock_vy7h1v.png",
                        "alternatives": []
                    },
                    {
                        "component": "Text",
                        "content": "A clock tells the time, but cannot be programmed or given instructions."
                    },
                    {
                        "component": "Text",
                        "content": "This makes it <?>"
                    },
                    {
                        "component": "ButtonGroup",
                        "options": [
                            [
                                "smart",
                                "manual"
                            ]
                        ],
                        "answers": [
                            "manual"
                        ],
                        "feedbacks": [
                            [
                                "Good. You are paying attention.",
                                "I don’t think so."
                            ]
                        ]
                    }
                ],
                [
                    {
                        "component": "Image",
                        "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696451675/Early%20Coding%20Level%201/Digital_clock_rhx11l.png",
                        "alternatives": []
                    },
                    {
                        "component": "Text",
                        "content": "An alarm clock also tells the time, but it can be programmed to make a sound at a particular time of the day. This makes it <?>"
                    },
                    {
                        "component": "ButtonGroup",
                        "options": [
                            [
                                "digital",
                                "manual"
                            ]
                        ],
                        "answers": [
                            "digital"
                        ],
                        "feedbacks": [
                            [
                                "Excellent! 👍",
                                "It can’t be manual because it has been programmed."
                            ]
                        ]
                    }
                ]
            ],
            "theme": "white"
        }
    ],
    [
        {
            "component": "Text",
            "content": "IS IT A COMPUTER?",
            "theme": "white",
            "tips": []
        },
        {
            "component": "Text",
            "content": "How do you tell if a machine or device is a computer or not?",
            "theme": "white",
            "tips": []
        },
        {
            "component": "Text",
            "content": "Try to remember this simple rule: it is only a computer if it can be<(<** programmed **>)>or given <~<(<**instructions**>)>~>.",
            "theme": "white",
            "tips": [
                "If it cannot take instructions and carry them out on its own, then it is not a computer."
            ]
        },
        {
            "component": "Text",
            "content": "When you program a machine, you tell it what to do, it can carry out the instructions by itself and give a response when it is done. This response is also called an <(<**output**>)>.",
            "theme": "white"
        },
        {
            "component": "Image",
            "url": " https://c8.alamy.com/comp/2RBRCBX/happy-father-and-son-playing-with-robot-2RBRCBX.jpg",
            "alternatives": [],
            "theme": "white"
        }
    ],
    [
        {
            "component": "Text",
            "content": "Is the image below a computer?",
            "theme": "default"
        },
        {
            "component": "FlashCards",
            "cards": [
                {
                    "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696413581/Early%20Coding%20Level%201/Bicycle_1_w9u35c.png",
                    "alternatives": []
                },
                {
                    "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696413601/Early%20Coding%20Level%201/Car_1_dcqcps.png",
                    "alternatives": []
                },
                {
                    "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696413481/Early%20Coding%20Level%201/Phone_1_nopebw.png",
                    "alternatives": []
                }
            ],
            "theme": "default"
        },
        {
            "component": "ButtonGroup",
            "options": [
                [
                    "Yes",
                    "No"
                ],
                [
                    "Yes",
                    "No"
                ],
                [
                    "Yes",
                    "No"
                ]
            ],
            "answers": [
                "No",
                "No",
                "Yes"
            ],
            "feedbacks": [
                [
                    "Of course a bicycle cannot be given instructions to perform on its own. You have to keep riding it for it to continue working, therefore it is not a computer.",
                    "Are you sure?"
                ],
                [
                    "Most cars would not move unless there is a driver in them making them move, so they are not computers. However, some cars now have computers that make them move without a driver. They are called self-driving cars. These cars have a computer inside them.",
                    "Traditional cars aren’t programmable"
                ],
                [
                    "A phone can be instructed to make calls, play music and videos, take pictures and even calculate numbers. Therefore mobile phones are computers.",
                    "A mobile phone is very programmable"
                ]
            ]
        }
    ],
    [
        {
            "component": "Text",
            "content": "<*-If it cannot take instructions and carry them out on its own, then it is not a computer.-*>",
            "theme": "default"
        },
        {
            "component": "Text",
            "content": "Is it a computer? Explain why",
            "theme": "default"
        },
        {
            "component": "FlashCards",
            "cards": [
                {
                    "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696413627/Early%20Coding%20Level%201/Scissors_1_u3qhwf.png",
                    "alternatives": []
                },
                {
                    "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696413658/Early%20Coding%20Level%201/Traffic_light_1_egq8gi.png",
                    "alternatives": []
                },
                {
                    "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696430469/Early%20Coding%20Level%201/Microwave_oven_saalxp.png",
                    "alternatives": []
                },
                {
                    "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696413978/Early%20Coding%20Level%201/Fan_btdp7h.png",
                    "alternatives": []
                }
            ],
            "theme": "default"
        },
        {
            "component": "ButtonGroup",
            "options": [
                [
                    "Yes",
                    "No"
                ],
                [
                    "Yes",
                    "No"
                ],
                [
                    "Yes",
                    "No"
                ],
                [
                    "Yes",
                    "No"
                ]
            ],
            "answers": [
                "No",
                "Yes",
                "Yes",
                "No"
            ],
            "feedbacks": [
                [
                    "Of course you can’t give instructions to scissors. Except you are Harry Potter",
                    "Really? Scissors?"
                ],
                [
                    "Exactly! Traffic lights can be programmed to change lights at different time intervals and even take pictures.",
                    "You should look at the instruction above again"
                ],
                [
                    "It is very programmable. I’m sure you can think of more ways than one in which it follows instructions.",
                    "The microwaves I know are actually smart."
                ],
                [
                    "For obvious reasons",
                    "Can you really instruct an electric fan? Well you could if you want to but normal ones aren’t instructable."
                ]
            ]
        }
    ],
    [
        {
            "component": "Text",
            "content": "<*-How computers know what to do-*>",
            "theme": "white"
        },
        {
            "component": "Text",
            "content": "Computers do not think and cannot figure things out themselves the way human beings can, they only follow instructions that have been given to them by human beings.",
            "theme": "white"
        },
        {
            "component": "Image",
            "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696533213/Early%20Coding%20Level%201/A_program_sentence_on_green_kv4dby.png",
            "alternatives": [],
            "theme": "white"
        },
        {
            "component": "Text",
            "content": "The instructions in a program need to be written in a step-by-step way so that the computer can follow the steps.",
            "theme": "white"
        }
    ],
    [
        {
            "component": "Text",
            "content": "Computers have a brain called 'memory’ where all programs are stored. When a computer follows the instructions in a program given to it, we say the computer is <~<(<**running**>)>~> the program.",
            "theme": "white",
            "tips": [
                "Computers can only run programs that have been stored in their memory."
            ]
        },
        {
            "component": "Text",
            "content": "The process of adding a program to the memory of a computer is called <(<**installation**>)>.",
            "theme": "white"
        },
        {
            "component": "Image",
            "url": " https://res.cloudinary.com/dbgorivob/image/upload/v1696533360/Early%20Coding%20Level%201/How_programs_work_2_wstlvx.png",
            "alternatives": [],
            "theme": "white"
        }
    ],
    [
        {
            "component": "Text",
            "content": "<*-Example of how a program works-*>",
            "theme": "white"
        },
        {
            "component": "Text",
            "content": "A teacher says:",
            "theme": "white"
        },
        {
            "component": "Text",
            "content": "“Adam, come to the front of the class\"",
            "theme": "white"
        },
        {
            "component": "Text",
            "content": "\"Clap 10 times and then jump\"",
            "theme": "white"
        },
        {
            "component": "Text",
            "content": "“When you're done, go back to your seat.”",
            "theme": "white"
        },
        {
            "component": "Slider",
            "slides": [
                [
                    {
                        "component": "Text",
                        "content": "The <?> is the teacher calling Adam out"
                    },
                    {
                        "component": "ButtonGroup",
                        "options": [
                            [
                                "EVENT",
                                "PROGRAM",
                                "ENDS"
                            ]
                        ],
                        "answers": [
                            "EVENT"
                        ],
                        "feedbacks": [
                            [
                                "I expected you to get it!",
                                "Try again 🛑"
                            ]
                        ]
                    }
                ],
                [
                    {
                        "component": "Text",
                        "content": "The <?>  asks Adam to clap 10 times and jump"
                    },
                    {
                        "component": "ButtonGroup",
                        "options": [
                            [
                                "EVENT",
                                "PROGRAM",
                                "ENDS"
                            ]
                        ],
                        "answers": [
                            "PROGRAM"
                        ],
                        "feedbacks": [
                            [
                                "You are making me proud!",
                                "Try again 🛑"
                            ]
                        ]
                    }
                ],
                [
                    {
                        "component": "Text",
                        "content": "When the program <?> Adam returns to his seat"
                    },
                    {
                        "component": "ButtonGroup",
                        "options": [
                            [
                                "EVENT",
                                "PROGRAM",
                                "ENDS"
                            ]
                        ],
                        "answers": [
                            "ENDS"
                        ],
                        "feedbacks": [
                            [
                                "Easy peezy right? 😁",
                                "Try again 🛑"
                            ]
                        ]
                    }
                ]
            ],
            "theme": "white"
        }
    ],
    [
        {
            "component": "Text",
            "content": "<*-Your First Computer Program-*>",
            "theme": "white"
        },
        {
            "component": "Text",
            "content": "The robot needs to get to the cookie. We would write a program to help the robot reach the box with the cookie.",
            "theme": "white"
        },
        {
            "component": "GridSteps",
            "start": "1x1",
            "end": "4x1",
            "steps": 3,
            "size": "4x4",
            "example": true,
            "answers": [
                "4x1"
            ],
            "theme": "white"
        }
    ],
    [
        {
            "component": "GridSteps",
            "start": "1x1",
            "end": "4x3",
            "steps": 5,
            "size": "4x4",
            "answers": [
                "4x3"
            ],
            "theme": "white",
            "feedbacks": [
                [
                    "Great thinking",
                    "Not correct, try again"
                ]
            ]
        }
    ],
    [
        {
            "component": "GridSteps",
            "start": "3x4",
            "end": "1x2",
            "steps": 4,
            "size": "4x4",
            "answers": [
                "1x2"
            ],
            "theme": "white",
            "feedbacks": [
                [
                    "Computer Games, Mobile phone apps, Traffic Light Controllers, ATM Machines, and Elevators are all examples of computer programs. What other programs can you think of?",
                    "Not correct, try again"
                ]
            ]
        }
    ],
    [
        {
            "component": "Postface",
            "terms": [
                "What Concrete nouns are and examples",
                "What Abstract nouns are and the examples of abstract nouns.",
                "Differentiate between concrete nouns and abstract nouns"
            ],
            "theme": "white"
        }
    ]
];
  
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/"
          element={
            <Editorial
              data={date}
              back={handleBack}
              user= {userData}
              lessonList={datas}
              refetch={fetchLess}
            />
          }
        /> */}
        <Route
          path="/comp"
          element={<LessonPage
              title="Mollllle"
              subject="dsd"
              className="Class 2"
              slides={slides} 
              back={()=>{}}
          />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
