declare const _default: {
    uploadImageMedia: (imagePayload: FormData) => Promise<any>;
    getOrCreateLessonProgress: (textbook_id: number, lesson_id: number) => Promise<any>;
    updateLessonProgress: (payload: any) => Promise<any>;
    getExamSet: (set_id: number | string) => Promise<any>;
    saveExamSession: (set_id: number | string, payload: any) => Promise<any>;
};
export default _default;
