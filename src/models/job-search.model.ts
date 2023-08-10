export interface JobDetails {
    jobId?: number;
    employerId?: number;
    employerName?: string;
    employerProfileId?: number | undefined;
    employerProfileName?: string | undefined;
    jobTitle?: string;
    locationName?: string;
    minimumSalary?: number;
    maximumSalary?: number;
    currency?: string;
    expirationDate?: Date;
    date?: Date;
    jobDescription?: string;
    applications?: number;
    jobUrl?: string;
    isSelected?: boolean;
    jobRating?: number;
    jobLiked?: boolean;
    
}
export interface JobSearch {
    employerID?: number;
    employerName?: string;
    empolyerProfileID?: number;
    keywords?: string;
    jobTitle?: string;
    locationName?: string;
    distanceFromLocation?: number;
    permanent?: boolean;
    contract?: boolean;
    temp?: boolean;
    date?: Date;
    partTime?: boolean;
    fullTime?: boolean;
    minimumSalary?: number;
    maximumSalary?: number;
    postedByRecruitmentAgency?: boolean;
    postedByDirectEmployer?: boolean;
    graduate?: boolean;
    resultsToTake?: any;
    resultsToSkip?: any;
}