export interface Disaster {
    disaster_id: string;
    description: string;
    main_affected_area: string;
    occurrrence_date: string;
    created_at: string;
    updated_at: string;
}

export const UserStatus = {
    Safe:"SAFE",
    Evacuating: "EVACUATING",
    Affected: "AFFECTED",
}

export interface UserDisaster{
    user_id: string;
    disaster_id: string;
    status: string;
}