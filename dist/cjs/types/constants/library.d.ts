export declare const textbook: {
    id: number;
    name: string;
    description: string;
    cover_photo: string;
    published: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    subject_id: number;
    classes: {
        id: number;
        name: string;
        type: string;
    }[];
    lessonCount: number;
};
export declare const getSubject: (id: number) => {
    id: number;
    name: string;
    description: string;
    cover: string;
    default: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    school_management_id: null;
}[];
export declare const getTextbookChapters: () => {
    id: number;
    name: string;
    index: number;
    description: string;
    textbook_id: number;
}[];
export declare const getChapterLessons: (id: number) => {
    status: string;
    id: number;
    topic: string;
    duration: string;
    curriculum: string;
    description: string;
    objective: string;
    additional_instruction: string;
    week: string;
    start_date: null;
    end_date: null;
    published: number;
    term: number;
    chapter: number;
    preview: string[];
    files: never[];
    generated: string;
    session_id: number;
    age: null;
    library: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    group_id: null;
    class_id: number;
    chapter_id: number;
    textbook_lessons: {
        created_at: string;
        updated_at: string;
        lesson_id: number;
        textbook_id: number;
    };
}[];
