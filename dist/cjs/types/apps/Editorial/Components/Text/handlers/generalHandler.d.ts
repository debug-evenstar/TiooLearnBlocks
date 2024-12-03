export declare const checkAndReturnOptions: (type: "OBJECTIVE" | "SUBJECTIVE") => {
    answer: boolean;
    content: string;
    feedback: {
        type: string;
        content: string;
    };
}[];
