export declare const dummyData: {
    ChapterId: number;
    ClassId: number;
    GroupId: number;
    LessonSlides: ({
        LessonId: number;
        createdAt: string;
        id: number;
        slide_data: ({
            tips: string[];
            component: string;
            content: string;
            answers?: undefined;
            feedbacks?: undefined;
            options?: undefined;
            alternatives?: undefined;
            url?: undefined;
        } | {
            answers: string[];
            component: string;
            feedbacks: string[];
            options: never[];
            tips?: undefined;
            content?: undefined;
            alternatives?: undefined;
            url?: undefined;
        } | {
            alternatives: never[];
            component: string;
            url: string;
            tips?: undefined;
            content?: undefined;
            answers?: undefined;
            feedbacks?: undefined;
            options?: undefined;
        })[];
        slide_index: number;
        updatedAt: string;
    } | {
        LessonId: number;
        createdAt: string;
        id: number;
        slide_data: ({
            content: string;
            component: string;
            alternatives?: undefined;
            url?: undefined;
            answers?: undefined;
            feedbacks?: undefined;
            options?: undefined;
        } | {
            alternatives: never[];
            component: string;
            url: string;
            content?: undefined;
            answers?: undefined;
            feedbacks?: undefined;
            options?: undefined;
        } | {
            answers: string[];
            component: string;
            feedbacks: string[][];
            options: string[][];
            content?: undefined;
            alternatives?: undefined;
            url?: undefined;
        })[];
        slide_index: number;
        updatedAt: string;
    } | {
        LessonId: number;
        createdAt: string;
        id: number;
        slide_data: ({
            tips: string[];
            content: string;
            component: string;
            alternatives?: undefined;
            url?: undefined;
            answers?: undefined;
            feedbacks?: undefined;
            options?: undefined;
        } | {
            alternatives: never[];
            component: string;
            url: string;
            tips?: undefined;
            content?: undefined;
            answers?: undefined;
            feedbacks?: undefined;
            options?: undefined;
        } | {
            answers: string[];
            component: string;
            feedbacks: never[];
            options: string[][];
            tips?: undefined;
            content?: undefined;
            alternatives?: undefined;
            url?: undefined;
        })[];
        slide_index: number;
        updatedAt: string;
    })[];
    Subject: {
        id: number;
        naming: string;
        description: string;
        ages: null;
        library: null;
    };
    SubjectId: number;
    additional_instruction: null;
    admin_status: string;
    age: null;
    createdAt: string;
    curriculum: null;
    description: string;
    duration: string;
    end_date: string;
    files: string[];
    id: number;
    library: null;
    objective: null;
    published: number;
    start_date: string;
    status: string;
    term: number;
    topic: string;
    updatedAt: string;
    week: string;
};
