import React, { FC, useEffect, useRef, useState } from "react";
import { FlashCardComponentProps } from "./handler";
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


    const imageStyles = [
        "w-full h-auto absolute rounded-lg transform rotate-[3deg]",
        "w-full h-auto absolute rounded-lg transform rotate-[-2deg]",
        "w-full h-auto absolute rounded-lg transform rotate-[1deg]",
        "w-full h-auto absolute rounded-lg transform rotate-[-5deg]",
        "w-full h-auto absolute rounded-lg transform rotate-[3deg]",
        "w-full h-auto absolute rounded-lg transform transition linear duration-[0.8s]"
    ]

    useEffect(() => {
        slide.setFunction("removeCard", removeCard);
    }, []);

    return (
        <>
            <div className="w-10/12 h-[300px] mx-auto relative" ref={imgContainerRef}>
                {cardImages.map((image: ImageData, index: number) => {
                    const randomInt = (Math.floor(Math.random() * 6) + 1) + 1;
                    const sInt = randomInt * ((index + 1) % 2 === 0 ? 1 : -1);
                    const imgClass = `
                    ${
                        index !== cardImages.length - 1
                            ? ("rotate-"+randomInt) //"rotate-[" + sInt + "deg]"
                            : "transition linear duration-[0.8s] "
                    }`;
                    return (
                        <img
                            key={index}
                            src={image.url}
                            alt="images"
                            className={imgClass}
                        />
                    );
                })}
            </div>
        </>
    );
};
// className={`w-full h-auto absolute rounded-lg ${index !== 0 ? "rotate-["+sInt+"deg]" : ""}`}
export default FlashCardsComponent;
