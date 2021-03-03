export type ResumeEducationHistoryInstitution = {
    name: string;
    startDate: string;
    endDate: string;
    awards: ResumeEducationHistoryAward[];
}

export type ResumeEducationHistoryAward = {
    studyType: string;
    score: string;
    courses: string[];
    hideScore?: boolean;
}
