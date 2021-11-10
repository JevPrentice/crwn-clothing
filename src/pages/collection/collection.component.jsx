import React from "react"
import './collection.styles.scss'
import {useParams} from "react-router-dom";
import {selectCollection} from "../../redux/shop/shop.selectors";
import {connect} from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = state => {
    const params = useParams();
    const {collectionId} = params;
    const collection = selectCollection(collectionId)(state);
    const {title, items} = collection;
    return <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>{
            items.map(item => <CollectionItem key={item.id} item={item}/>)
        }</div>
    </div>;
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(CollectionPage);

