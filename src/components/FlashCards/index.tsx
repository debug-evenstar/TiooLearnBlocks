import React, { FC, useEffect, useRef, useState } from "react";
import {
    FlashCardComponentProps,
    rotationClassesImages,
    rotationClassesWords,
} from "./handler";
import MedalImage from "../../img/medal.svg"
import Clap from "../../img/clap.svg"
import Rewind from "../../img/undo.svg"

const FlashCardsComponent: FC<FlashCardComponentProps> = ({ data, slide }) => {
    const [finished, setFinished] = useState(false);
    const [cardData, setCardData] = useState<any[]>(
        data.cards.map(
            (item, index) => data.cards[data.cards.length - 1 - index]
        )
    );

    const imgContainerRef = useRef<any>(null);

    const handleCardTransition = () => {
        const imageCards = imgContainerRef.current.querySelectorAll("img, div");
        const cardToSlide = imageCards[imageCards.length - 1];
        cardToSlide.style.transform = "translate(80%,-60%) rotate(110deg)";
        cardToSlide.style.opacity = 0;
    };

    const refreshButtons = () => {
        try{
            if (slide.functions?.initButtonStatuses) {
                slide.functions.initButtonStatuses();
            }
        }catch(e){}
    }

    const removeCard = () => {
        handleCardTransition();
        const newCards = cardData;
        newCards.pop();
        setTimeout(() => {
            setCardData(() => [...newCards]);
            if(newCards.length === 0){
                imgContainerRef.current.style.display = "none";
                slide.functions?.hideButtonGroup();
                setFinished(true)
            }
            refreshButtons();
        }, 1200);

    };

    const rewindCards = () => {
        imgContainerRef.current.style.display = "block";
        setCardData(data.cards.map(
            (item, index) => data.cards[data.cards.length - 1 - index]
        ));
        slide.functions?.restartButtonGroup();
        setFinished(false);
        slide.functions?.showText();
    }

    useEffect(() => {
        slide.setFunction("removeCard", removeCard);
        if(slide.functions?.restartButtonGroup){
            rewindCards();
        }
    },[data, slide]);

    return (
        <>
            <div
                className="w-9/12 h-[350px] mx-auto mt-[15px] mb-[5px] relative flex justify-center"
                ref={imgContainerRef}
            >
                {cardData.map((item: any, index: number) => {
                    const randomInt = Math.floor(Math.random() * 6) + 1 + 1;
                    const sInt = randomInt * ((index + 1) % 2 === 0 ? 1 : -1);
                    return item.url ? (
                        <img
                            key={index}
                            src={item.url}
                            alt="images"
                            className={
                                index === cardData.length - 1
                                    ? "w-auto max-w-[100%] h-auto max-h-[100%] absolute rounded-lg transform transition linear duration-[0.8s]"
                                    : rotationClassesImages[sInt.toString()]
                            }
                        />
                    ) : (
                        <div
                            key={index}
                            className={
                                index === cardData.length - 1
                                    ? "w-full h-full px-[20px] py-[20px] flex justify-center items-center absolute rounded-lg transform bg-white text-black border border-gray-200 transition linear duration-[0.8s]"
                                    : rotationClassesWords[sInt.toString()]
                            }
                        >
                            {item.content}
                        </div>
                    );
                })}
            </div>

            {finished && (<div className="w-full h-[400px] flex flex-col justify-center items-center relative">
                <img
                    className="w-20 my-[15px]"
                    src={MedalImage}
                    alt=""
                />
                <div className="flex items-center">
                    <p className="text-font text-center">You’ve done well. Keep it up!</p>
                    <img
                        src={Clap}
                        alt=""
                    />
                </div>
                <div 
                    className="flex flex-col justify-center items-center absolute bottom-[10px] cursor-pointer hidden"
                    onClick={() => rewindCards()}
                >
                    <img
                        className=""
                        src={Rewind}
                        alt=""
                    />
                    <p className="text-font text-center">Rewind</p>
                </div>
            </div>)}
        </>
    );
};
// className={`w-full h-auto absolute rounded-lg ${index !== 0 ? "rotate-["+sInt+"deg]" : ""}`}
export default FlashCardsComponent;
