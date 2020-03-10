const assert = require('assert');
const proxyquire = require('proxyquire');
const {
    MongoLibMock,
    indexStub,
    createStub
} = require('../utils/mocks/mongoLib');

const {
    productsMock,
    filteredProductsMock
} = require('../utils/mocks/products');

describe("services - products", () => {
    const ProductsService = proxyquire("../services/products", {
        "../lib/mongo": MongoLibMock
    });

    const productsService = new ProductsService();

    describe('when index method is called',  async () => {
        it("should call the index MongoLib method", async () => {
            await productsService.getProducts({});
            assert.strictEqual(indexStub.called, true);
        });

        it("should return an array of products", async () => {
            const result = await productsService.getProducts({});
            const expected = productsMock;
            assert.deepEqual(result, expected);
        });
    });

    describe('when getProducts method is called with tags', async () => {
        
        it("should all the index MongoLib method with tags args", async () => {
            await productsService.getProducts({ tags: ["expensive"] });
            const tagQuery = { tags: { "$in": ["expensive"]} };
            assert.strictEqual(indexStub.calledWith("products", tagQuery), true);
        });

        it("should return an array of products filtered by the tag", async () => {
            const result = await productsService.getProducts({ tags: ["expensive"] });
            const expected = filteredProductsMock("expensive");
            
            assert.deepEqual(result, expected);
        });
    })
    
    
});