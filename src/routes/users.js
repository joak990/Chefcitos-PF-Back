const server = require('express');
const router = server.Router();

const createUser = require('../controllers/createUser');
const deleteUser = require('../controllers/deleteUser');
const changeIsDeletedValue = require('../controllers/changeIsDeletedValue');

router.post('/', async (req, res) => {
    try {
        const { name, email, password, type, isDeleted } = req.body;
        const newUser = await createUser({ name, email, password, type, isDeleted })
        res.status(200).send(newUser);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUser(id)
        res.status(200).send(deletedUser);
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { isDeleted } = req.body;
        const changeValue = await changeIsDeletedValue(id, isDeleted);
        res.status(200).send(changeValue);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})
module.exports = router;