import express from 'express';
import { getData } from '../helpers/particulateDataRetriever.mjs'

const router = express.Router();

router.get('/', async (req, res) => {
    const autoReload = req.query.autoReload === 'true';
    const periodInMinutes = req.query.periodInMinutes != null ? req.query.periodInMinutes : 1;
    const daysOfData = req.query.daysOfData != null ? Number.parseFloat(req.query.daysOfData) : 1;

    res.render('index', {
        autoReload: autoReload,
        periodInMinutes: periodInMinutes,
        daysOfData: daysOfData
    });
});

router.get('/api/particulate', async (req, res) => {
    const periodInMinutes = req.query.periodInMinutes != null ? req.query.periodInMinutes : 1;
    const daysOfData = req.query.daysOfData != null ? Number.parseFloat(req.query.daysOfData) : 1;

    const items = await getData(periodInMinutes, daysOfData);
    res.json(items);
})

export default router;