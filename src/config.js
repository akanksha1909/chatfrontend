let API_URL = 'http://localhost:5000';
let BASE_URL = window.location.origin;

export default {
    //Base URL for the website
    base_url : BASE_URL,

    //Backend API URL
    api_url : API_URL,



    //Authentication informations
    auth :{
        facebook: {
                app_id      : "361310377692496",
                accountKit  : "7365c57a1d547812ab274a6cf711e7d6"
            },
        twitter : {
                key         : ""
            },
        linkedin: {
                api_key     : "81il1bvtl0avlj"
            },
        google  : {
                client_id   : "592657782922-l9fjth2ouc66i71pupjqbhk9kifje1ar.apps.googleusercontent.com"
            }
    },
    
    //List of feelings available in the app
    feelings : ["Not Related To Category", "Relaxed", "Satisfied", "Joy", "Competitive", "Elevated", "Happy", "Energetic", "Love", "Wow/Overwhelmed", "Enthuses", "Disappointed", "Unsatisfied", "Contempt", "Frustrated", "Sadness", "Disgust", "Fear", "Jealousy", "Anger", "Hate"],

    //List of currencies used in shop
    currency : { "USD" : "&#36;", "INR" : "&#x20B9;","SHEKEL":"&#8362;" },

    //Mystory card animation
    animation : "flipInX",

    //Socket URL
    socketURL : API_URL ,




}