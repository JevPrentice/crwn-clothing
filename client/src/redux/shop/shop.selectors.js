import {createSelector} from "reselect";
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector([selectShop],
    shop => shop.collections);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections
        ? Object.keys(collections).map(key => collections[key])
        : []
);

export const selectCollection = memoize(collectionUrlParam =>
        createSelector([selectCollections],
            collections => collections
                ? collections[collectionUrlParam]
                : null)
    // lodash.memoize: here we are memoizing the return of our function
);

export const selectIsCollectionFetching = createSelector([selectShop], shop => shop.isFetching);

export const selectIsCollectionsLoaded = createSelector([selectShop],
    shop => !!shop.collections);

// double bang !! does a falsely check on the value and returns a boolean value
