import React, { useRef, useState } from "react";
import SlideManager from "../components/SlideManager";

const RenderComponent = () => {
  interface managerFunctions {
    navigator: Function;
  }
  const slideManagerRef = useRef<managerFunctions>(null);
  const slides = [
    [
      {
        component: "Text",
        content: "<**Introduction**>",
      },
      {
        component: "Text",
        content:
          "In the exciting world of <~grammar~>, we come across different types of nouns. Today, we will explore two important kinds of nouns: <(<**CONCRETE**>)> nouns and <(<**ABSTRACT**>)> nouns. ",
        tips: [
          "Grammar is a set of rules that helps us understand and use words correctly when we speak and write.",
        ],
      },
      {
        component: "Text",
        content:
          "We can communicate and express our thoughts more effectively if we know the differences between these two types. Let us explore the world of nouns now!",
      },
      {
        component: "Image",
        url: "https://res.cloudinary.com/dic7regoe/image/upload/v1691358759/praxeum/image_25_xshh7o.png",
      },
    ],
    [
      {
        component: "Text",
        content:
          "Nouns are naming words. A noun is a word that names a person, animal, place, thing, event, feeling or idea. ",
      },
      {
        component: "Text",
        content: "There are two important types of nouns, namely ",
      },
      {
        component: "Text",
        content: "<?> noun and <?> noun",
      },
      {
        component: "ButtonGroup",
        answers: ["Concrete", "Abstract"],
      },
    ],
    [
      {
        component : "Text",
        content : "More exercises amigo! I’m sure you want to become very good at nouns, yeah? 😁😉 So let’s get your English straight as we fill in the blanks with the perfect noun! <(Tip: the answer is either a concrete or an abstract noun.)>"
      },
      {
        component: "Slider",
        slides: [
          {
            component: "Text",
            content: "1. My <?> is a leading doctor in the town.",
          },
          {
            component: "Text",
            content: "2. Trees bring forth new <?> during spring.",
          },
          {
            component: "Text",
            content: "3. Big cats include <?> and tigers",
          },
          {
            component: "Text",
            content: "4. The king was known for his <?>",
          },
          {
            component: "Text",
            content: "5. <?> is loved by all people",
          },
          {
            component: "Text",
            content: "6. I've got <?> like a river.",
          },
        ],
      },
      {
        component: "ButtonGroup",
        options: [
          [ "Music", "Father" ],
          [ "Songs", "Leaves" ],
          [ "Lions", "Rats" ],
          [ "Authority", "Rats" ],
          [ "Cleanliness", "Stealing" ],
          [ "Chairs", "Joy" ],
        ],
        answers : [
          "Father", "Leaves", "Lions", "Authority", "Cleanliness", "Joy"
        ]
      },
    ],
    [
      {
        component : "Text",
        content : "Now that we have learnt what concrete and abstract nouns are, let's show off 😁 🤗 by identifying if the nouns shown in these images are either concrete or abstract nouns. 🚀"
      },
      {
        component : "FlashCards",
        cards : [
          {
            url : "https://i.ibb.co/5jKXLTk/Frame-1000004281-1.png"
          },
          {
            url : "https://i.ibb.co/fNrj85L/Frame-1000004281.png"
          },
          {
            url : "https://i.ibb.co/vqKpXWd/Frame-1000004281-2.png"
          },
          {
            url : "https://i.ibb.co/5jKXLTk/Frame-1000004281-1.png"
          },
          {
            url : "https://i.ibb.co/fNrj85L/Frame-1000004281.png"
          },
          {
            url : "https://i.ibb.co/vqKpXWd/Frame-1000004281-2.png"
          }
        ]
      },
      {
        component: "ButtonGroup",
        options: [
          [ "Concrete", "Abstract" ],
        ],
        answers : [
          "Concrete", "Concrete", "Abstract", "Abstract", "Concrete", "Abstract"
        ]
      },
    ],
  ];
  const slide2 = [
    // [
    //   {
    //     component : "Text",
    //     content : "Now that we have learnt what concrete and abstract nouns are, let's show off 😁 🤗 by identifying if the nouns shown in these images are either concrete or abstract nouns. 🚀"
    //   },
    //   {
    //     component: "Video",
    //     url : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    //   },
    // ],
    // [
    //   {
    //     component : "Text",
    //     content : "Now that we have learnt what concrete and abstract nouns are, let's show off 😁 🤗 by identifying if the nouns shown in these images are either concrete or abstract nouns. 🚀"
    //   },
    //   {
    //     component : "FlashCards",
    //     cards : [
    //       {
    //         url : "https://i.ibb.co/5jKXLTk/Frame-1000004281-1.png"
    //       },
    //       {
    //         url : "https://i.ibb.co/fNrj85L/Frame-1000004281.png"
    //       },
    //       {
    //         url : "https://i.ibb.co/vqKpXWd/Frame-1000004281-2.png"
    //       },
    //       {
    //         url : "https://i.ibb.co/5jKXLTk/Frame-1000004281-1.png"
    //       },
    //       {
    //         url : "https://i.ibb.co/fNrj85L/Frame-1000004281.png"
    //       },
    //       {
    //         url : "https://i.ibb.co/vqKpXWd/Frame-1000004281-2.png"
    //       }
    //     ]
    //   },
    // ],
    [
      {
        component : "Text",
        content : "Now that we have learnt what concrete and abstract nouns are, let's show off 😁 🤗 by identifying if the nouns shown in these images are either concrete or abstract nouns. 🚀"
      },
      {
        component : "FlashCards",
        cards : [
          {
            content : "Hello"
          },
          {
            content : "World"
          },
          {
            content : "Lets"
          },
          {
            content : "Get"
          },
          {
            content : "Engaged"
          },
          {
            content : "Here"
          }
        ]
      },
      {
        component: "ButtonGroup",
        options: [
          [ "Concrete", "Abstract" ],
        ],
        answers : [
          "Concrete", "Concrete", "Abstract", "Abstract", "Concrete", "Abstract"
        ]
      },
    ]
  ]
  const slide3 = [
    [
      {
        component : "Text",
        content : "Now that we have learnt what concrete and abstract nouns are, let's show off 😁 🤗 by identifying if the nouns shown in these images are either concrete or abstract nouns. 🚀"
      },
      {
        component : "Options",
        options : [
          "Non-living things can talk",
          "Non-living things do not have life",
          "Non-living things can’t breathe",
          "Non-living things can grow",
          "Non-living things do not require nutrition"
        ],
        answers : [
          "Non-living things do not have life",
          "Non-living things can’t breathe",
          "Non-living things do not require nutrition"
        ]
      }
      // {
      //   component: "WordMatch",
      //   options : ["Concrete Nouns", "Abstract Nouns", "Nouns"],
      //   answers : [
      //     "They are things we can see, touch, hear, taste, or smell.",
      //     "They are things we think about or feel, but cannot touch physically",
      //     "A word that names a person, animal, place, thing, feeling, idea, etc"
      //   ]
      // },
    ]
  ]
  const [canProceed, setCanProceed] = useState<boolean>(false);
  const handleContinue = () => {
    slideManagerRef?.current?.navigator(1)
    setCanProceed(false);
  }

  const containerStyle = {
    background:
      "url('https://res.cloudinary.com/dic7regoe/image/upload/v1691354626/praxeum/Frame_1000004416_iflseu.png')",
    backgroundSize: "100% 100%",
    width: "800px",
    maxHeight: "550px",
    margin: "0 auto",
    padding: "10px 30px",
    color: "white",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  };
  return (
    <>
      <div className="w-full h-screen text-center grid place-content-center">
        <div style={containerStyle}>
          <SlideManager
            lessonSlides={slide2}
            ref={slideManagerRef}
            canProceed={(val: boolean) => setCanProceed(val)}
          />
        </div>
        {
          canProceed && <button
            className="mx-auto mt-[20px] py-[10px] w-[150px] text-white rounded-[15px] bg-sky-500 hover:bg-sky-700"
            onClick={() => handleContinue()}
          >
            Continue
          </button>
        }
      </div>
    </>
  );
};

export default RenderComponent;
