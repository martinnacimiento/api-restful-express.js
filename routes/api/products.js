const router = require("express").Router();
const ProductsService = require("../../services/products");

const productService = new ProductsService();

// INDEX
router.get("/", async function(req, res, next) {
    const { tags } = req.query;
    //console.log("req", req);
    
    try {
        throw new Error("Error API");
        const products = await productService.getProducts({ tags });

        res.status(200).json({
            data: products,
            message: "products listed"
        });
    } catch (error) {
        next(error);
    }
});

// SHOW
router.get("/:productId", async function(req, res, next) {
    const { productId } = req.params;
    
    try {
        const product = await productService.getProduct({ productId });

        res.status(200).json({
            data: product,
            message: "product retrieved"
        });
    } catch (error) {
        next(error);
    }
});

// STORE
router.post("/", async function(req, res, next) {
    const { body: product  } = req;
    console.log("req", req.params, req.body);
    
    try {
        const createdProduct = await productService.createProduct({ product });
        
        res.status(201).json({
            data: createdProduct,
            message: "product created"
        });
    } catch (error) {
        next(error);
    }
});

// UPDATE
router.put("/:productId", async function(req, res, next) {
    const { productId } = req.params;
    const { body: product  } = req;
    
    try {
        const updatedProduct = await productService.updateProduct({ productId, product });

        res.status(200).json({
            data: updatedProduct,
            message: "product updated"
        });
    } catch (error) {
        next(error);
    }
});
// DELETE
router.delete("/:productId", async function(req, res, next) {
    const { productId } = req.params;
    
    try {
        const product = await productService.deleteProduct({ productId });

        res.status(200).json({
            data: product,
            message: "product deleted"
        });
    } catch (error) {
        next(error);
    }
});


module.exports = router;