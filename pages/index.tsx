import Header from '../components/header';
import MainLayout from '../layouts/MainLayout';

import Homepage from '../modules/homepage/Homepage';

export default function HomePage() {
  return (
    <>
      <MainLayout>
        <Homepage />
      </MainLayout>
    </>
  );
}
