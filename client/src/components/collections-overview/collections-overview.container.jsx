import React from "react";
import CollectionsOverview from "./collections-overview.component";
import {gql, useQuery} from "@apollo/client";
import Spinner from "../spinner/spinner.component";

const GET_COLLECTIONS = gql`
{
    collections {
        id
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

const CollectionsOverviewContainer = () => {
    const {loading, error, data} = useQuery(GET_COLLECTIONS);
    if (loading) return <Spinner/>;
    if (error) return <p>Error : {error}</p>;
    return <CollectionsOverview collections={data.collections}/>
};

export default CollectionsOverviewContainer;

