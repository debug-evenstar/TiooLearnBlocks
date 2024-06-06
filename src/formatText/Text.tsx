import { BoldText } from "./formats/BoldText"
import { AddTooltip } from "./formats/WithTooltip"

export const FormatText = (data:string) => {
    const text = BoldText(data);
    
    // const withTooltip = AddTooltip(text)
    return text
}