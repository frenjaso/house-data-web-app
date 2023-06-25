import express from 'express';
import { getData } from './controllers/getDataController.mjs'

const router = express.Router();

router.get('/', async (req, res) => {
    const items = await getData();

    res.render('index', { items: JSON.stringify(items) });
});

export default router;