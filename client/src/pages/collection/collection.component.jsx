import React, {useContext} from "react"
import './collection.styles.scss'
import {useParams} from "react-router-dom";
import CollectionItem from "../../components/collection-item/collection-item.component";
import CollectionsContext from "../../contexts/collections/collections.context";

// const CollectionPage = () => {
//     const {collectionId} = useParams();
//     return <CollectionsContext.Consumer>
//         {collections => {
//             const collection = collections[collectionId];
//             const {items, title} = collection;
//             return <div className='collection-page'>
//                 <h2 className='title'>{title}</h2>
//                 <div className='items'>
//                     {items.map(item => <CollectionItem key={item.id} item={item}/>)}
//                 </div>
//             </div>;
//         }}
//     </CollectionsContext.Consumer>;
// };

const CollectionPage = () => {
    /*
        const params = useParams();
        const {collectionId} = params;
        const collection = useSelector(selectCollection(collectionId));
        const {title, items} = collection;
     */
    const {collectionId} = useParams();
    const collections = useContext(CollectionsContext);
    const {title, items} = collections[collectionId];
    return <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {items.map(item => <CollectionItem key={item.id} item={item}/>)}
        </div>
    </div>;
};

export default CollectionPage;

