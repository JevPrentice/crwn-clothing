import React from "react";
import {ErrorImageContainer, ErrorImageOverlay, ErrorImageText, ErrorImageTitle} from "./error.boundry.styles";

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.log(`Error boundary found an error: ${error}, ${errorInfo}`);
    }

    render() {
        if (this.state.hasError)
            return <ErrorImageOverlay>
                {/*<ErrorImageContainer imageUrl='https://i.imgur.com/U3vTGjX.png'>*/}
                <ErrorImageContainer imageUrl={process.env.PUBLIC_URL + '/leaky-website.png'}/>
                <ErrorImageTitle>There’s a Leak in the Website!</ErrorImageTitle>
                <ErrorImageText>
                    The boat had looked good to the naked eye. But you wear a very strong prescription and should have
                    been wearing glasses. As you cling on to the bouey the coast guard had thrown at you, you watch the
                    water rush into you beloved dingy. The leak sprays water higher and higher. Then the boat was
                    swallowed and sunk into the abyss.
                </ErrorImageText>
            </ErrorImageOverlay>;

        return this.props.children;
    }
}

export default ErrorBoundary;
