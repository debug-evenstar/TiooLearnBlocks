import React, { FC, useEffect, useRef, useState } from "react";
import { FlashCardComponentProps, rotationClasses } from "./handler";
import { ImageData } from "../Image/handler";

const FlashCardsComponent: FC<FlashCardComponentProps> = ({ data, slide }) => {
    const [cardImages, setCardImages] = useState<any[]>(
        data.cards.map(
            (item, index) => data.cards[data.cards.length - 1 - index]
        )
    );

    const imgContainerRef = useRef<any>(null);

    const handleCardTransition = () => {
        const imageCards = imgContainerRef.current.querySelectorAll("img");
        const cardToSlide = imageCards[imageCards.length - 1];
        cardToSlide.style.transform = "translate(80%,-60%) rotate(110deg)";
        cardToSlide.style.opacity = 0;
    }

    const removeCard = () => {
        handleCardTransition();
        const newCards = cardImages;
        newCards.pop();
        setTimeout(()=>{
            setCardImages(() => [...newCards]);
        },1200);
    };
    


    useEffect(() => {
        slide.setFunction("removeCard", removeCard);
    }, []);


    return (
        <>
            <div className="w-10/12 h-[300px] mx-auto relative" ref={imgContainerRef}>
                    {cardImages.map((image: ImageData, index: number) => {
                        const randomInt = (Math.floor(Math.random() * 6) + 1) + 1;
                        console.log(randomInt);
                        const sInt = randomInt * ((index + 1) % 2 === 0 ? 1 : -1);
                        return (
                            <img
                                key={index}
                                src={image.url}
                                alt="images"
                                className={index == cardImages.length - 1 
                                    ? "w-full h-auto absolute rounded-lg transform transition linear duration-[0.8s]"
                                    : rotationClasses[sInt.toString()]
                                }
                            />
                        );
                    })}
            </div>
        </>
    );
};
// className={`w-full h-auto absolute rounded-lg ${index !== 0 ? "rotate-["+sInt+"deg]" : ""}`}
export default FlashCardsComponent;
