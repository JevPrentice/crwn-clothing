import React from "react"
import './category.styles.scss'
import {useParams} from "react-router-dom";

const CategoryPage = () => {
    const params = useParams();
    const {categoryId} = params;
    return <div className='category'>
        <h2>{categoryId}</h2>
    </div>;
};

export default CategoryPage;

