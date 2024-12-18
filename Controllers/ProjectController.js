const { json } = require('express');
const projects = require('../Models/ProjectSchema')

// add logic
exports.addProjectAPI = async (req, res) => {
    console.log("Inside Add ProjectAPI ");

    const { title, language, github, website, overview } = req.body
    const projectImg = req.file.filename
    const userId = req.payload//from jwt middleware
    // console.log(req.file);
    // console.log(title,language,github,website,overview,userId);
    try {
        const project = await projects.findOne({ github })
        if (project) {
            res.status(401).json("Project Already Existing")
        } else {
            const newProject = new projects({ title, language, github, website, overview, projectImg, userId })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch (err) {
        res.status(406).json(err)
    }



}

// get logic 
exports.getHomeProjectAPI = async (req, res) => {
    try {
        const response = await projects.find().limit(3)
        res.status(200).json(response)
    } catch (err) {
        res.status(406).json(err)
    }
}

// All User
exports.getAllUserProjectAPI = async (req, res) => {

    const searchKey = req.query.search
    console.log(searchKey);

    const query = {
        title: {
            $regex: searchKey,
            $options: "i"
        }
    }

    try {
        const response = await projects.find(query)
        res.status(200).json(response)
    } catch (err) {
        res.status(406).json(err)
    }
}

// A User
exports.getAUserProjectAPI = async (req, res) => {
    const userId = req.payload
    try {
        const response = await projects.find({ userId })
        res.status(200).json(response)
    } catch (err) {
        res.status(406).json(err)
    }
}

// Edit
exports.editProjectAPI = async (req, res) => {
    console.log("Inside Edit ProjectAPI ");

    const { title, language, github, website, overview, projectImg } = req.body
    const updateImg = req.file ? req.file.filename : projectImg
    const userId = req.payload//from jwt middleware
    const { projectId } = req.params
    // console.log(req.file);
    // console.log(title,language,github,website,overview,userId);
    try {
        const project = await projects.findByIdAndUpdate(
            { _id: projectId },
            {
                title: title,
                language: language,
                github: github,
                website: website,
                overview: overview,
                projectImg: updateImg
            }
        )
        await project.save()
        res.status(200).json(project)

    }
    catch (err) {
        res.status(406).json(err)
    }



}

// Delete
exports.deleteProjectAPI = async (req, res) => {
    console.log("Inside the delete API");
    const { projectId } = req.params

    try {
        const project = await projects.findByIdAndDelete({ _id: projectId })
        res.status(200).json(project)
    } catch (error) {
        res.status(406).json(error)
    }

}