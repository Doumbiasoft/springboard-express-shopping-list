process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('../app');
let db = require('../database/fakeDb');


describe('API shop list', ()=> {
    beforeEach(function(){ 
        db.length = 0;
        db.push({name: "popsicle", price: 1.45});
        db.push({name: "cheerios", price: 3.40});
        db.push({name: "eggs", price: 2});
    });
    afterEach(function(){ 
        db.length = 0;
    });

    test('Get list of shop', async ()=>{
        const resp = await request(app).get('/api/v1/shop/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(db);
    });
    test('Get an item in the shop card', async ()=>{

        let item = db.find(x => x.name === "popsicle");
        const resp = await request(app).get(`/api/v1/shop/items/${item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(item);

    });

    test('Post an item in the shop card', async ()=>{
        const item = { name: "sugar", price: 1.12}
        const resp = await request(app).post('/api/v1/shop/items').send(item);
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({added:item});
    });

    test('Update an item in the shop card', async ()=>{
        let item = db.find(x => x.name === "popsicle");
        const name = item.name;
        item.name = "popsicle";
        item.price = 2;
        const resp = await request(app).patch(`/api/v1/shop/items/${name}`).send(item);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({updated:item});
    });

    test('Delete an item in the shop card', async ()=>{
        let item = db.find(x => x.name === "popsicle");
        const resp = await request(app).delete(`/api/v1/shop/items/${item.name}`);
        expect(resp.statusCode).toBe(202);
        expect(resp.body).toEqual({message: "Deleted"});
    });

});
