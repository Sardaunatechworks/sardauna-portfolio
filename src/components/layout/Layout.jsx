import { Outlet } from 'react-router-dom';
import Header from '../navigation/Header';
import Footer from './Footer';

export default function Layout() {
    return (
        <>
            <Header />
            <main id="main-content" style={{ paddingTop: '72px' }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
