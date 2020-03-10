const { productsMock, filteredProductsMock } = require('./products');
const sinon = require('sinon');

const indexStub = sinon.stub();
const tagQuery = {tags: { "$in": ["expensive"] }};

indexStub
    .withArgs("products")
    .resolves(productsMock);

indexStub
    .withArgs("products", tagQuery)
    .resolves(filteredProductsMock("expensive"));

const createStub = sinon
    .stub()
    .resolves("6bedb1267d1ca7f3053e2875");

class MongoLibMock {
    index(collection, query) {
        return indexStub(collection, query);
    }

    create(collection, query) {
        return createStub(collection, data);
    }
}

module.exports = {
    indexStub,
    createStub,
    MongoLibMock
};