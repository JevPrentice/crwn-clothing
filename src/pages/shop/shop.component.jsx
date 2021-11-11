import React from "react"
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import {Route, Routes} from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import {connect} from "react-redux";
import {fetchCollectionsStartAsync} from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import {createStructuredSelector} from "reselect";
import {selectIsCollectionFetching, selectIsCollectionsLoaded} from "../../redux/shop/shop.selectors";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
    }

    render() {
        const {isCollectionFetching, isCollectionLoaded} = this.props;
        return <div className='shop-page'>
            <Routes>
                <Route path="/" element={<CollectionsOverviewWithSpinner isLoading={isCollectionFetching}/>}/>
                <Route path=':collectionId'
                       element={<CollectionPageWithSpinner isLoading={!isCollectionLoaded}/>}/>
            </Routes>
        </div>;
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
