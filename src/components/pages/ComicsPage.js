import React from 'react';
import { Helmet } from 'react-helmet';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';

export default function ComicsPage() {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of comics" />
        <title>Comics page</title>
      </Helmet>
      <AppBanner />
      <ComicsList />
    </>
  );
}
