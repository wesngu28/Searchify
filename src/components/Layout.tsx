import Navbar from './Navbar'
import Header from './Header'
import layoutStyles from '../styles/Layout.module.css'
import { ReactNode } from 'react';

interface Props {
    children: ReactNode
}

export default function Layout ( {children}: Props) {
    return(
        <div className={layoutStyles.main}>
            <Navbar />
            <div className={layoutStyles.container}>
                <Header />
                {children}
            </div>
        </div>
    )
}