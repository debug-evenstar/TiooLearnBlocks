import { createRef, FC, useEffect, useRef, useState } from "react";
import MovableResizer from "../../MovableResizer";
import { _getManager } from "apps/Editorial/Base/Manager";

// Use of 10 and 20 constants for allowance in sizing and positioning
const LayoutBox: FC<{
    id: string;
    initialItemSize: { width: number; height: number };
    items: any[];
    updateLayout: Function;
    children?: any;
}> = ({ id, initialItemSize, items, updateLayout, children }) => {
    const [initialized, setInitialized] = useState<boolean>(false);
    const [layoutData, setLayoutData] = useState<any>(null);
    const handleLayoutUpdate = () => {};
    const manager = _getManager();
    const [itemConfig, setItemConfig] = useState<any>(null);
    const itemPropRef = useRef<any>(itemConfig);
    const layoutRef = useRef<any>(layoutData);

    const computeInitialPosition = () => {
        if (!initialized) {
            const canvasSize = manager.canvasManager.canvas.getCanvasSize();
            const initialLayoutWidth = 0.8 * canvasSize.width;
            const remainingXSpace = canvasSize.width - initialLayoutWidth;
            const initialXOffset = remainingXSpace / 2;
            const initialYOffset = canvasSize.height - 160;
            const calcLayout = {
                size: { width: initialLayoutWidth, height: 120 },
                position: { x: initialXOffset, y: initialYOffset },
                spacing: { x: 20, y: 10 },
            };
            setLayoutData(calcLayout);
            initialItemSize && setItemSizes({ ...initialItemSize });
            setTimeout(() => organizeLayoutItems(calcLayout, true), 300);
            setInitialized(true);
        }
    };

    const handleMove = ({ position: { x, y } }: any) => {
        const calcLayout = { ...layoutData, position: { x, y } };
        setLayoutData(calcLayout);
        organizeLayoutItems(calcLayout);
    };

    const handleResize = ({ width, height, position, axis }: any) => {
        const itemWidth = items[0].width;
        if (width >= itemWidth + layoutData.spacing.x * 2) {
            const calcLayout = {
                ...layoutData,
                size: { width, height },
                position: position ?? layoutData.position,
            };
            setLayoutData(calcLayout);
            organizeLayoutItems(calcLayout, false, axis);
        }
    };
    const setItemSizes = ({ width, height }: any) => {
        updateLayout(items.map(() => ({ width, height })));
    };

    const recalculateLayoutWidth = (layout: any, itemWidth: number) => {
        const canvasSize = manager.canvasManager.canvas.getCanvasSize();
        const updatedWidth =
            layout.size.width + layout.spacing.x + itemWidth + 10;
        let positionX = layout.position.x;
        if (layout.position.x + updatedWidth > canvasSize.width - 20) {
            positionX = canvasSize.width - updatedWidth - 20;
        }
        const updatedLayout = {
            ...layout,
            size: { ...layout.size, width: updatedWidth },
            position: { ...layout.position, x: positionX },
        };
        setLayoutData(updatedLayout);
        return updatedLayout;
    };

    const recalculateLayoutHeight = (layout: any, offset: number) => {
        const canvasSize = manager.canvasManager.canvas.getCanvasSize();
        const updatedHeight = offset; // Recognize top spacing
        let positionY = layout.position.y;
        let modifiedPostion = false;
        if (layout.position.y + updatedHeight > canvasSize.height - 20) {
            positionY = canvasSize.height - updatedHeight - 20;
            modifiedPostion = true;
        }
        const updatedLayout = {
            ...layout,
            size: { ...layout.size, height: updatedHeight },
            position: { ...layout.position, y: positionY },
        };
        setLayoutData(updatedLayout);
        return modifiedPostion ? updatedLayout : false;
    };

    const wrapItems = (
        layout: any,
        layouts: any[],
        itemSize: any,
        level: number = 1
    ): any => {
        const unwrapX = Math.floor(
            layout.size.width / (layout.spacing.x + itemSize.width + 10)
        );
        if (layouts.length && unwrapX < layouts.length) {
            const toWrap: any[] = layouts.slice(unwrapX);
            const wrapped = toWrap.map((item, index) => {
                const position = {
                    position: {
                        x:
                            layout.position.x +
                            itemSize.width * index +
                            layout.spacing.x * (index + 1),
                        y:
                            layout.position.y +
                            level * (itemSize.height + layout.spacing.y) +
                            layout.spacing.y, // Acual spacing on y axis
                    },
                };
                return position;
            });
            const calc = recalculateLayoutHeight(
                layout,
                (level + 1) * (itemSize.height + 20)
            );
            if (calc) {
                return wrapItems(calc, layouts, itemSize, level);
            }
            return layouts
                .slice(0, unwrapX)
                .concat(wrapItems(layout, wrapped, itemSize, level + 1));
        } else {
            return layouts;
        }
    };

    const unwrapItems = (layout: any, layouts: any[], itemSize: any) => {
        const unwrapX = Math.floor(
            layout.size.width / (layout.spacing.x + itemSize.width + 10)
        );
        const totalRows = Math.ceil(layouts.length / unwrapX);
        const unwrapY = Math.floor(
            layout.size.height / (layout.spacing.y + itemSize.height + 5)
        );
        if (layouts.length && unwrapY < totalRows) {
            const updatedLayout = recalculateLayoutWidth(
                layout,
                itemSize.width
            );
            return updatedLayout;
        }
        return false;
    };

    const organizeLayoutItems = (
        layout: any,
        initial: boolean = false,
        axis: string = "x"
    ) => {
        let layoutX = layout.position.x;
        let layoutY = layout.position.y;
        // Use first item to get size
        const itemSize = {
            width: initial ? initialItemSize.width : itemPropRef.current.width,
            height: initial
                ? initialItemSize.height
                : itemPropRef.current.height,
        };
        // const spacingX =
        //     (layoutWidth - items.length * itemSize.width) / (items.length + 1);
        const spacingX = layout.spacing.x;
        let layouts = items.map((item, index) => {
            const position = {
                position: {
                    x:
                        layoutX +
                        itemSize.width * index +
                        spacingX * (index + 1),
                    y: layoutY + 10,
                },
            };
            return position;
        });
        if (initial) {
            layouts = wrapItems(layout, layouts, itemSize);
        } else {
            if (axis == "y" && unwrapItems(layout, layouts, itemSize)) {
                layout = unwrapItems(layout, layouts, itemSize);
            }
            layouts = wrapItems(layout, layouts, itemSize);
        }
        if (layouts) {
            updateLayout(layouts);
        }
    };

    const verifyMinimumWidth = (itemSize: any) => {
        if (layoutRef.current.size.width < itemSize.width) {
            setLayoutData({
                ...layoutData,
                size: { ...layoutRef.current.size, width: itemSize.width },
            });
        }
    };

    useEffect(() => {
        computeInitialPosition();
    }, []);

    useEffect(() => {
        layoutRef.current = layoutData;
    }, [layoutData]);

    useEffect(() => {
        itemPropRef.current = { ...itemConfig, ...items[0] };
    }, [items]);

    useEffect(() => {
        manager.event.listen(`layout.${id}`, (data: any) => {
            if (data.spacing) {
                let spacing = data.spacing;
                setLayoutData({
                    ...layoutRef.current,
                    ...{
                        spacing: {
                            x: spacing.x ? parseInt(spacing.x) : layoutRef.current.spacing.x,
                            y: spacing.y ? parseInt(spacing.y) : layoutRef.current.spacing.y,
                        },
                    },
                });
            }
            if (data.width || data.height) {
                let width = data.width ? parseFloat(data.width) : null;
                let height = data.height ? parseFloat(data.height) : null;
                const updated = {
                    ...(width ? { width } : {}),
                    ...(height ? { height } : {}),
                };
                verifyMinimumWidth(updated);
                setItemSizes(updated);
                itemPropRef.current = { ...itemConfig, ...updated };
            }
            setTimeout(() => {
                organizeLayoutItems(layoutRef.current);
            }, 500);
        });
    }, [manager]);
    return (
        <>
            {layoutData && (
                <MovableResizer
                    draggableAxis="both"
                    onMove={handleMove}
                    onDrag={handleMove}
                    size={{
                        width: layoutData.size.width,
                        height: layoutData.size.height,
                    }}
                    onResize={handleResize}
                    position={{
                        x: layoutData.position.x,
                        y: layoutData.position.y,
                    }}
                    {...(items.length
                        ? {
                              minimumSize: {
                                  width:
                                      items[0].width + layoutData.spacing.x * 2,
                                  height:
                                      items[0].height +
                                      layoutData.spacing.y * 2,
                              },
                          }
                        : {})}
                >
                    <div className="w-full h-full border-[1px] border-[#d9d9d9] border-dotted">
                        {children ? children : <></>}
                    </div>
                </MovableResizer>
            )}
        </>
    );
};

export default LayoutBox;
