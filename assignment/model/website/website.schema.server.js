module.exports = function (mongoose) {
    console.log("In SERVER website.schema.server.js");
    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: {type: String, required: true},
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.website"});

    return WebsiteSchema;
};