import React from "react"
import './collection.styles.scss'
import {useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import Spinner from "../../components/spinner/spinner.component";
import CollectionItem from "../../components/collection-item/collection-item.component";

const GET_COLLECTION_BY_TITLE = gql`
    query getCollectionsByTitle($title: String!) {
        getCollectionsByTitle(title: $title) {
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

const CollectionPage = () => {
    const params = useParams();

    const {loading, error, data} = useQuery(GET_COLLECTION_BY_TITLE, {
        "variables": {title: params.collectionId},
    });

    if (loading) return <Spinner/>;
    if (error) return <p>Error : {error}</p>;

    const {title, items} = data.getCollectionsByTitle;
    return <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {items.map(item => <CollectionItem key={item.id} item={item}/>)}
        </div>
    </div>;
};

export default CollectionPage;

