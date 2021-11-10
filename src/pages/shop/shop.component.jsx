import React from "react"
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import {Route, Routes} from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {connect} from "react-redux";
import {UpdateCollections} from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
        });
    }

    render() {
        return <div className='shop-page'>
            <Routes>
                <Route path="/" element={<CollectionsOverview/>}/>
                <Route path=':collectionId' element={<CollectionPage/>}/>
            </Routes>
        </div>;
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: collectionsMap => dispatch(UpdateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
