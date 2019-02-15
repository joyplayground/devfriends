import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Window, TitleBar, Box, Text } from 'react-desktop/macOs';
import '@common/sw-setup';
import './index.css';

class App extends Component {
    render() {
        return (
            <Window
                chrome
                height="300px"
                padding="10px"
            >
                <TitleBar title="hello" controls isFullScreen={true} />
                <Text>Hello World</Text>
            </Window>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('.app-root'));
