import express from 'express';
import { getData } from './controllers/getDataController.mjs'

const router = express.Router();

router.get('/', async (req, res) => {
    const periodInMinutes = req.query.periodInMinutes != null ? req.query.periodInMinutes : 1;
    const daysOfData = req.query.daysOfData != null ? req.query.daysOfData : 2;

    const items = await getData(periodInMinutes, daysOfData);

    res.render('index', { items: JSON.stringify(items) });
});

export default router;