export class Video {
    id: string
    user_id: string
    title: string
    description?: string;
    view?: number;
    like?: number;
    thumbnail: string;
    status?: string;
    time?: Date;
    videoUrl? : String;
}