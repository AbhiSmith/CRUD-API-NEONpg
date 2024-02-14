import express from 'express'
import { deleteAll, deleteData, getData, postData, updateData } from '../controllers/page.js';


const router = express.Router()

router.get('/', getData);
router.post('/', postData);
router.delete('/:id', deleteData);
router.put('/:id', updateData)
router.get('/all', deleteAll)

export default router;