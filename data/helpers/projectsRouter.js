const express = require('express');

const Projects = require('./projectModel');

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

    if(!project) {
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
            res.status(200).json(project)
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Problem creating project.'})
        })
})

module.exports = router;