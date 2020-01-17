const express = require('express');

const Actions = require('./actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    const { project_id } = req.body;

    Actions.get()
        .then(actions => {
            return res.status(200).json(actions)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ error: 'Problem retrieving actions.' })
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