import { Video } from "./video";

export class Room {
    roomKey: string;
    status: string;
    streamKey: string;
    video: Video

    constructor(video:Video){
        this.video = video;
    }
}