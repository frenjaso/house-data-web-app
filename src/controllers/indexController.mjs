import express from 'express';
import { getData } from '../helpers/particulateDataRetriever.mjs'

const router = express.Router();

router.get('/', async (req, res) => {
    const autoReload = req.query.autoReload === 'true';

    res.render('index', { autoReload: autoReload });
});

router.get('/api/particulate', async (req, res) => {
    const periodInMinutes = req.query.periodInMinutes != null ? req.query.periodInMinutes : 1;
    const daysOfData = req.query.daysOfData != null ? Number.parseFloat(req.query.daysOfData) : 1;

    const items = await getData(periodInMinutes, daysOfData);
    res.json(items);
})

export default router;