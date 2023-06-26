import express from 'express';
import { getData } from './controllers/getDataController.mjs'

const router = express.Router();

router.get('/', async (req, res) => {
    const periodInMinutes = req.query.periodInMinutes != null ? req.query.periodInMinutes : 1;
    const daysOfData = req.query.daysOfData != null ? req.query.daysOfData : 2;
    const autoReload = req.query.autoReload === 'true';

    const items = await getData(periodInMinutes, daysOfData);

    res.render('index', { items: JSON.stringify(items), autoReload: autoReload });
});

export default router;