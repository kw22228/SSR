import React from 'react';
import { hydrate } from 'react-dom';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { Provider } from 'react-redux';

// import configureStore from './store';
// import GlobalStyle from './styles/GlobalStyle';
import App from './App';

loadableReady(() => {
    // const rootElement = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    const rootElement = document.getElementById('root');
    hydrate(
        // <Provider store={store}>
        <BrowserRouter>
            <>
                {/* <GlobalStyle /> */}
                <App />
            </>
        </BrowserRouter>,
        // </Provider>,
        rootElement,
    );
});

if (module.hot) module.hot.accept();
