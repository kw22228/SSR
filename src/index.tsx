import * as ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const rootElement = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
rootElement.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);
