const express = require('express');

const Actions = require('./actionModel');
const Projects = require('./projectModel');

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            return res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ error: 'Problem retrieving actions.' })
        })
})

router.get('/:id', (req, res) => {

        Projects.getProjectActions(req.params.id) 
        .then(actions => {
            if (actions.length === 0) {
                return res.status(404).json({ errror: 'No project with that id.'})
            } else {
                return res.status(200).json(actions)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Problem returning action.'})
        })
})

router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body) 
        .then(updated => {
            if(!updated) {
                return res.status(404).json({ error: 'That action does not exist.' })
            } else if(updated.notes === '' || !updated.notes) {
                return res.status(400).json({ error: 'You need notes!'})
            } else if (updated.description === '' || !updated.description) {
                return res.status(400).json({ error: 'You need a description!'})
            } else if(updated.description.length > 128) {
                return res.status(400).json({ error: 'Description must be 128 characters or less.'})
            }else {
                return res.status(200).json(updated)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Problem updating action.'})
        })
    
})

router.delete('/:id', (req, res) => {
   Actions.remove(req.params.id)
    .then(action => {
        if(!action) {
            return res.status(404).json({ error: 'No action with that id' })
        } else {
            return res.status(200).json(action)
        }
    })
})

module.exports = router;