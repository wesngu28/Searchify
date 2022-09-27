import Navbar from './NavBar'
import Header from './Header'
import layoutStyles from '../styles/Layout.module.css'
import { ReactNode } from 'react';
import Metadata from './Metadata';

interface Props {
    children: ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <>
            <Metadata />
            <div className={layoutStyles.main}>
                <Navbar />
                <div className={layoutStyles.container}>
                    <Header />
                    {children}
                </div>
            </div>
        </>
    )
}