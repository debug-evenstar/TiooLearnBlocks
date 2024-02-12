import { FC, useEffect, useState } from "react";
import { LayoutComponentProps } from "./handler";
import {
  ComponentPositionInterface,
  ComponentSizeInterface,
} from "components/interface";

const LayoutComponent: FC<LayoutComponentProps> = ({ layout, children }) => {
  const [position, setPosition] = useState<ComponentPositionInterface>();
  const [size, setSize] = useState<ComponentSizeInterface>();
  const [positionStyles, setPositionStyles] = useState<{
    [key: string]: string;
  }>({});
  const [sizeStyles, setSizeStyles] = useState<{ [key: string]: string }>({});

  const layoutStyles = () => ({ ...positionStyles, ...sizeStyles });
  useEffect(() => {
    if (layout?.position) {
      setPosition(layout.position);
      setPositionStyles(() => ({
        top: `${layout.position?.yAxis.offsetPercent}%`,
        left: `${layout.position?.xAxis.offsetPercent}%`,
      }));
    }

    if (layout?.size) {
      setSize(layout.size);
      setSizeStyles(() => ({
        width: `${layout.size?.widthPercent}%`,
        height: `${layout.size?.heightPercent}%`,
      }));
    }
  }, [layout]);

  return (
    <div style={layoutStyles()} className="relative">
      {children}
    </div>
  );
};

export default LayoutComponent;
