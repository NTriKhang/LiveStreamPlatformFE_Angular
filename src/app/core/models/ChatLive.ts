export class ChatLive {
    _id?: string;
    room_id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    createdAt?: Date;
    content: string;

    /**
     *
     */
    constructor(room_id:string, userId: string, userName: string, userAvatar: string, content: string) {
        this.room_id=room_id;
        this.userId = userId;
        this.userName = userName;
        this.userAvatar = userAvatar
        this.content = content
        this.createdAt = new Date()
    }
}
