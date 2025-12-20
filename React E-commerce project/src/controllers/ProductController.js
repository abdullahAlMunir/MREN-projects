import {
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySimilarityService,
    ListByKeywordService,
    ListByRemarkService,
    DetailsService,
    ReviewListService,
    CreateReviewService,
    ProductListByFilterService
} from "../services/ProductServices.js";


export async function ProductDetails(req, res) {
    let result = await DetailsService(req);
    return res.status(200).json(result);
}
export async function ProuctBrandList(req, res) {
    let result = await BrandListService();
    return res.status(200).json(result);
}
export async function ProuctCategoryList(req, res) {
    let result = await CategoryListService();
    return res.status(200).json(result);
}
export async function ProuctSliderList(req, res) {
    let result = await SliderListService();
    return res.status(200).json(result);
}       // Uncompleted
export async function ProductListByBrand(req, res) {
    let result = await ListByBrandService(req);
    return res.status(200).json(result);
}
export async function ProductListByCategory(req, res) {
    let result = await ListByCategoryService(req);
    return res.status(200).json(result);
}
export async function ProductListBySimilarity(req, res) {
    let result = await ListBySimilarityService(req);
    return res.status(200).json(result);
}
export async function ProductListByKeyword(req, res) {
    let result = await ListByKeywordService(req);
    return res.status(200).json(result);
}
export async function ProductListByRemark(req, res) {
    let result = await ListByRemarkService(req);
    return res.status(200).json(result);
}
export async function ProductReviewList(req, res) {
    let result = await ReviewListService(req);
    return res.status(200).json(result);
}
export async function CreateReview(req, res) {
    let result = await CreateReviewService(req);
    return res.status(200).json(result);
}
export async function ProductListByFilter(req, res) {
    let result = await ProductListByFilterService(req);
    return res.status(200).json(result);
}