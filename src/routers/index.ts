import {Request, Response } from "express";

const exp = require('express')
const router = exp.Router();

router.get('/', async (req: Request, res: Response) => {
    res.send("EndPoint raiz")

})

export default router

