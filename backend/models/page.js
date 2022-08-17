const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    userName:{
        type:String
    },
    appearance:{
        bodyStyle:{
            backgroundColor:{
                type:String,
            },
            color:{
                type:String,
            }
        },
            cardStyle:{
                color:{
                    type:String,
                },
                backgroundColor:{
                    type:String,
                },
                borderColor:{
                    type:String,
                },
                shadow:{
                    type:String,
                },
                borderRadius:{
                    type:String,
                },
                borderWidth:{
                    type:String,
                },
            }
    },
    profile:{
            profileTitle:{
                type:String,
            },
            profileImage:{
                type:String,
            },
            profileBio:{
                type:String,
            }
    },
    links:{
            type:Array,
    },
});

module.exports = mongoose.model('Page', pageSchema);