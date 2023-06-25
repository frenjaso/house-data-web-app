import express from 'express';
import { getData } from './controllers/getDataController.mjs'

const router = express.Router();

router.get('/', async (req, res) => {

    const items = await getData();
    // console.log(JSON.stringify(data.Items[0]));

    res.render('index', { items: JSON.stringify(items) });
    // res.render('index');
});

export default router;