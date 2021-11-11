import React from "react"
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import {Route, Routes} from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import {convertCollectionsSnapshotToMap, firestore} from "../../firebase/firebase.utils";
import {connect} from "react-redux";
import {UpdateCollections} from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        // Observable pattern -> live streaming updates.
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        });
        // Promise style.
        // collectionRef.get().then(snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({loading: false});
        // });
        // Native 'fetch' style.
        // fetch("https://firestore.googleapis.com/v1/projects/crwn-db-325ea/databases/(default)/documents/collections")
        //     .then(response => response.json())
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(e => console.log(e));
    }

    render() {
        const {loading} = this.state;
        return <div className='shop-page'>
            <Routes>
                <Route path="/" element={<CollectionsOverviewWithSpinner isLoading={loading}/>}/>
                <Route path=':collectionId' element={<CollectionPageWithSpinner isLoading={loading}/>}/>
            </Routes>
        </div>;
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: collectionsMap => dispatch(UpdateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
