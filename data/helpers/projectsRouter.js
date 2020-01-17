const express = require('express');

const Projects = require('./projectModel');
const Actions = require('./actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Error retrieving projects.'})
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    if(!id) {
        res.status(404).json({ error: 'No project with that ID.' })
    }

    Projects.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'There was a problem retrieving the project.'})
        })
})

router.post('/', (req, res) => {
    const project = req.body

    if(!project) {
        res.status(400).json({ error: 'Missing project data!' });
    }
    if(!project.name || !project.description) {
        res.status(400).json({ error: `Your missing a name or description!` })
    }

    Projects.insert(project)
        .then(
            res.status(201).json(project)
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Problem creating project.'})
        })
})

router.post('/:id/actions', (req, res) => {
    const projectInfo = { ...req.body, project_id: req.params.id};
    Actions.insert(projectInfo)
        .then(action => {
            if(!req.params.id) {
                res.status(404).json({ error: 'No project with that id.' })
            } else {
                res.status(201).json(action)
            }
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updated = req.body;
    
    Projects.update(id, updated)
        .then(
            res.status(200).json(updated)
        )
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Problem updating project.'})
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    if(!req.body.id) {
        return res.status(404).json({ error: 'No project with that ID.' })
    }

    Projects.remove(id)
        .then(project => {
           return res.status(200).json(project);
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ error: 'Problem deleting project.' })
        })
})

module.exports = router;