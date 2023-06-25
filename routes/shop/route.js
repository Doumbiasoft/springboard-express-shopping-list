const express = require('express');
const router = new express.Router();
let db = require('../../database/fakeDb');


router.get('/items',(req, res, next)=>{
    try {
        return res.status(200).send(db);
    } catch (error) {
        return next(error);
    }
});
router.post('/items',(req, res, next)=>{
    try {

        if(!req.body.name && !req.body.price){
            return res.status(400).send({message : `'name' and 'price' are require!`});
        }
        let itemCheck = db.find(x => x.name === req.body.name && x.price === req.body.price);
        if(itemCheck){
            return res.status(400).send({message : `This item '${itemCheck.name}' already exit!`});
        }
        const item = req.body;
        db.push(item);
        return res.status(201).send({added : item});
    } catch (error) {
        return next(error);
    }
});
router.get('/items/:name',(req, res, next)=>{
    try {
        if(!req.params.name){
            return res.status(400).send({message : `the param 'name' is require!`});
        }
        const item = db.find(x => x.name === req.params.name);
       
        if(!item){
            return res.status(404).send({message : `Item not found!`});
        }
        return res.status(200).send(item);
    } catch (error) {
        return next(error);
    }
});
router.patch('/items/:name',(req, res, next)=>{
    try {
        if(!req.params.name){
            return res.status(400).send({message : `the param 'name' is require!`});
        }
        let item = db.find(x => x.name === req.params.name);
        if(!item){
            return res.status(404).send({message : `Item not found!`});
        }
        if(req.body.name){
            item.name = req.body.name;
        }
        if(req.body.price){
            item.price = req.body.price;
        }
       
        return res.status(200).send({updated : item});
    } catch (error) {
        return next(error);
    }
});
router.delete('/items/:name',(req, res, next)=>{
    try {
        let itemIndex = db.findIndex(x => x.name === req.params.name);
        if(itemIndex === -1){
            return res.status(404).send({message : `Item not found!`});
        }
        db.splice(itemIndex, 1);
        return res.status(202).send({message: "Deleted"});
    } catch (error) {
        return next(error);
    }
});

module.exports = router;