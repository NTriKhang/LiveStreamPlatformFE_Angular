import { Video } from "./Video";

export class Room {
    _id?: string;
    roomKey: string;
    status: string;
    streamKey: string;
    video: Video

    constructor(video:Video){
        this.video = video;
    }
}