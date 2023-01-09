import loadable from '@loadable/component';
import React, { Component } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router';

import Header from '@components/Header';
import Footer from '@components/Footer';

const Home = loadable(() => import(/* webpackChunkName: "Home" */ '@pages/Home'));
const News = loadable(() => import(/* webpackChunkName: "News" */ '@pages/News'));

class App extends Component {
    render() {
        return (
            <div>
                <HelmetProvider>
                    <Helmet>
                        <title>Home</title>
                    </Helmet>
                </HelmetProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/news" element={<News />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default App;
