import React from "react"
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import {Route, Routes} from "react-router-dom";
import CategoryPage from "../category/category.component";

const ShopPage = () => <div className='shop-page'>
    <Routes>
        <Route path="/" element={<CollectionsOverview/>}/>
        <Route path=':categoryId' element={<CategoryPage/>}/>
    </Routes>
</div>

export default (ShopPage);
