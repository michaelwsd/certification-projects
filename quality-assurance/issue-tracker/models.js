const mongoose =  require('mongoose');
const { Schema } = mongoose;

const IssueSchema = new Schema({
    assigned_to: String,
    status_text: String,
    open: Boolean,
    project_id: {type: String, required: true},
    issue_title: {type: String, required: true},
    issue_text: {type: String, required: true},
    created_by: {type: String, required: true},
    created_on: Date,
    updated_on: Date
  }, {versionKey: false});

const Issue = mongoose.model("Issue", IssueSchema);

const ProjectSchema = new Schema({
    name: {type: String, required: true}
  }, {versionKey: false});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = {Issue, Project};