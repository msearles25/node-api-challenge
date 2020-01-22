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
    Projects.get(req.params.id) 
        .then(project => {
            if(!project) {
                return res.status(404).json({ error: 'No project with that id.'})
            } else if(projectInfo.notes === '' || !projectInfo.notes) {
                return res.status(400).json({ error: 'You need notes!'})
            } else if (projectInfo.description === '' || !projectInfo.description) {
                return res.status(400).json({ error: 'You need a description!'})
            } else if(projectInfo.description.length > 128) {
                return res.status(400).json({ error: 'Too long, less than 128 characters.'})
            } else {
                Actions.insert(projectInfo)
                .then(action => {
                    return res.status(201).json(action)
                    
                })
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

    if(!id) {
        return res.status(404).json({ error: 'No project with that ID.' })
   }

    Projects.remove(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Problem deleting project.' })
        })
})

module.exports = router;