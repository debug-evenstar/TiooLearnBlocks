import { ComponentBaseDataInterface } from "components/interface";
import LayoutComponent from "components/LayoutBox";
import { loadComponent } from "components/SlideManager/handler";
import LessonLayout from "layouts/LessonLayout";
import { createRef, FC, useEffect, useState } from "react";

const RenderPreview: FC<{
    slide: any;
    subject?: string;
    title?: string;
    lesson?: any;
    setPreviewSlide?: Function;
    slideScope: any;
    raw?: boolean;
    container?: any;
}> = ({
    slide,
    subject,
    title,
    lesson,
    setPreviewSlide,
    slideScope,
    raw,
    container,
}) => {
    const chapters = [
        {
            ...(lesson?.Chapter ?? {}),
            lessons: [
                {
                    ...lesson,
                    slides: [slide],
                },
            ],
        },
    ];
    const [calculatedArea, setCalculatedArea] = useState<{
        width: number;
        height: number;
    }>({ width: 0, height: 0 });
    const [clientHeight, setClientHeight] = useState<any>(0);
    const contRef: React.RefObject<any> = createRef();

    const RenderComponents = () => (
        <div
            style={{
                width: calculatedArea.width,
            }}
            className={`mx-auto h-full relative ${raw ? "" : "bg-[#fafafa]"}`}
        >
            {slide && slide.map(
                (component: ComponentBaseDataInterface, index: number) => {
                    const Component = loadComponent(component);
                    const viewArea = {
                        width: calculatedArea.width,
                        height: calculatedArea.height,
                    };
                    return component.layout ? (
                        <LayoutComponent key={index} layout={component.layout}>
                            <Component
                                data={component}
                                slide={slideScope}
                                viewArea={viewArea}
                            />
                        </LayoutComponent>
                    ) : (
                        <Component
                            key={index}
                            data={component}
                            slide={slideScope}
                            viewArea={viewArea}
                        />
                    );
                }
            )}
        </div>
    );

    useEffect(() => {
        if (contRef?.current || container?.current) {
            const containerRef = container?.current ?? contRef?.current;
            if (containerRef.clientHeight !== clientHeight) {
                setCalculatedArea({
                    width: containerRef ? containerRef.clientHeight * 1.6 : 0,
                    height: containerRef?.clientHeight ?? 0,
                });
                setClientHeight(containerRef.clientHeight ?? 0);
            }
        }
    }, [contRef?.current, container?.current]);

    if (raw){
        return (<RenderComponents/>);
    }

    return (
        <LessonLayout
            textbook={{}}
            lesson={false}
            closePreview={() => setPreviewSlide && setPreviewSlide(false)}
            sideBar={false}
            chapters={chapters}
        >
            <div ref={contRef} className="w-full h-full relative">
                <RenderComponents/>
            </div>
        </LessonLayout>
    );
};

export default RenderPreview;
