import React from "react"
import './collection.styles.scss'
import {useParams} from "react-router-dom";

const CollectionPage = () => {
    const params = useParams();
    const {collectionId} = params;
    return <div className='collection'>
        <h2>{collectionId}</h2>
    </div>;
};

export default CollectionPage;

