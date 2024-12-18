import { Outlet } from "react-router-dom";

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Layout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh' }}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
};

export default Layout;
