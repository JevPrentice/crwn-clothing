import React from "react"
import './collection.styles.scss'
import {useParams} from "react-router-dom";
import {selectCollection} from "../../redux/shop/shop.selectors";
import {connect} from "react-redux";

const CollectionPage = state => {
    const params = useParams();
    const {collectionId} = params;
    const collection = selectCollection(collectionId)(state);
    console.log(collection)
    return <div className='collection'>
        <h2>{collectionId}</h2>
    </div>;
};

const mapStateToProps = state => state;

// const mapStateToProps = (state) => {
//     return ({
//         state: state
//     });
// };

export default connect(mapStateToProps)(CollectionPage);

