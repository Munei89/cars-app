import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import DefaultLayout from 'app/layouts/DefaultLayout';

export function HomePage() {
  return (
    <DefaultLayout>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>My HomePage</span>
    </DefaultLayout>
  );
}
