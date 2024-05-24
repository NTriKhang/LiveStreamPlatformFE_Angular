export const APIEndpoint = {
    user:{
        signUp: "/api/User",
        signIn: "/api/User/auth"
    },
    video:{
        getVideo: "/api/Video/getVideo/",
        getVideos: "/api/Video/",
        generateKey: "/api/Video/generateKey",
        on_stream: "/api/video/on_stream",
        uploadVideo: "/api/video/upload_video"
    },
    room:{
        getRoom: "/api/Room/"
    }
}