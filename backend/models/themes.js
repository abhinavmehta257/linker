const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    appearance: {
        bodyStyle: {
            backgroundColor:{
                type:String
            },
            color:{
                type:String
            }
        },
        cardStyle: {
            backgroundColor:{
                type:String
            },
            color:{
                type:String
            },
            borderRadius:{
                type:String
            },
            borderColor:{
                type:String
            },
            shadow:{
                type:String
            },
            borderWidth:{
                type:String
            }
        }
    }
});

module.exports = mongoose.model('Themes', themeSchema);
