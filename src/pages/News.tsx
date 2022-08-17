import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styled from 'styled-components';

const Title = styled('h1')`
    margin: 0;
    font-size: 20px;
    color: orange;
`;

const News = () => (
    <div>
        <HelmetProvider>
            <Helmet>
                <title>News</title>
            </Helmet>
        </HelmetProvider>
        <Title>News</Title>
    </div>
);

export default News;
