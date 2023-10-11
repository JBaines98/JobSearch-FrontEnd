export interface JobDetails {
    jobDetailId?: number;
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
    jobComment?: string;
    userId?: number;
    userDetails?: UserDetails;
    
}

export interface UserDetails {
    userId?: number;
    userName?: string;
    firstName?: string;
    lastName?: string;
    dateJoined?: string;
    age?: number;
    addressFirstLine?: string;
    addressSecondLine?: string;
    city?: string;
    county?: string;
    postcode?: string;
}

export interface JobSearch {
    jobSearchId?: number;
    searchName?: string;
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
    userId?: number;
    userDetails?: UserDetails;
}