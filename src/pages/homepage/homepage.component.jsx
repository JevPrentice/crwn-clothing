import React from "react";

import Directory from "../../components/directory/directory.component";
import {HomePageContainer} from "./homepage.styles";

const HomePage = () =>
    <HomePageContainer>
        <div className='directory-menu'>
            <Directory/>
        </div>
    </HomePageContainer>;

export default HomePage;
