import React, { FC, useEffect, useRef, useState } from "react";
import {
    FlashCardComponentProps,
    rotationClassesImages,
    rotationClassesWords,
} from "./handler";

const FlashCardsComponent: FC<FlashCardComponentProps> = ({ data, slide }) => {
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

    const removeCard = () => {
        handleCardTransition();
        const newCards = cardData;
        newCards.pop();
        setTimeout(() => {
            setCardData(() => [...newCards]);
        }, 1200);
    };

    useEffect(() => {
        slide.setFunction("removeCard", removeCard);
    }, []);

    return (
        <>
            <div
                className="w-10/12 h-[300px] mx-auto my-[20px] relative"
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
                                index == cardData.length - 1
                                    ? "w-full h-auto absolute rounded-lg transform transition linear duration-[0.8s]"
                                    : rotationClassesImages[sInt.toString()]
                            }
                        />
                    ) : (
                        <div
                            key={index}
                            className={
                                index == cardData.length - 1
                                    ? "w-full h-full px-[20px] py-[20px] flex justify-center items-center absolute rounded-lg transform bg-white text-black border border-gray-200 transition linear duration-[0.8s]"
                                    : rotationClassesWords[sInt.toString()]
                            }
                        >
                            {item.content}
                        </div>
                    );
                })}
            </div>
        </>
    );
};
// className={`w-full h-auto absolute rounded-lg ${index !== 0 ? "rotate-["+sInt+"deg]" : ""}`}
export default FlashCardsComponent;
