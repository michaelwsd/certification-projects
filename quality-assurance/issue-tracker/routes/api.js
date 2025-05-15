'use strict';

const {Issue, Project} = require("../models")

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async function (req, res){
      let projectName = req.params.project;
      try {
        const project = await Project.findOne({name: projectName});
        if (!project) {
          return res.json([{error: "project not found"}]);
        } else {
          const issues = await Issue.find({
            project_id: project._id,
            ...req.query
          });
          if (!issues) {
            return res.json([{error: "no issues found"}])
          } else {
            return res.json(issues);
          }
        }

      } catch (err) {
        console.log(err);
        res.json({error: "could not get"});
      }
    })
    
    .post(async function (req, res){
      // extract form fields
      let project = req.params.project;
      const {issue_title, issue_text, created_by, assigned_to = "", status_text = ""}  = req.body;

      // ensure required fields 
      if (!issue_text || !issue_title || !created_by) {
        return res.json({ error: 'required field(s) missing' });
      }

      try {
        let projectModel  = await Project.findOne({name: project});
        // create a new project if it doesn't exist
        if (!projectModel) {
          projectModel = new Project({name: project});
          projectModel = await projectModel.save();
        }
        
        const issueModel = new Issue({
          assigned_to: assigned_to,
          status_text: status_text,
          open: true,
          project_id: projectModel._id, // every issue already has built in id
          issue_title: issue_title,
          issue_text: issue_text,
          created_by: created_by,
          created_on: new Date().toISOString(),
          updated_on: new Date().toISOString()
        });

        const issue = await issueModel.save(); // returns a promise that resolves to the saved document
        res.json(issue);

      } catch (err) {
        console.log(err);
        res.json({error: "could not post"});
      }
    })
    
    .put(async function (req, res){
      const projectName = req.params.project;
      const {_id, issue_title, issue_text, created_by, assigned_to, status_text} = req.body;

      if (!_id) return res.json({error: "missing _id"});
      if (!issue_title && !issue_text && !created_by && !assigned_to && !status_text) return res.json({ error: 'no update field(s) sent', '_id': _id });

      try {

        let issue = await Issue.findByIdAndUpdate(_id, {
          ...req.body,
          updated_on: new Date().toISOString()
        })

        if (!issue) return res.json({ error: 'could not update', '_id': _id })
 
        res.json({  result: 'successfully updated', '_id': _id })

      } catch (err) {
        res.json({ error: 'could not update', '_id': _id })
      }
    })
    
    .delete(async function (req, res){
      let project = req.params.project;
      const {_id} = req.body;
      if (!_id) return res.json({error: "missing _id"})
        
      try {
        let issue = await Issue.findOneAndDelete({_id});
        if (!issue) return res.json({ error: 'could not delete', '_id': _id });
        res.json({ result: 'successfully deleted', '_id': _id });
      } catch (err) {
        res.json({ error: 'could not delete', '_id': _id })
      }

    });
    
};
