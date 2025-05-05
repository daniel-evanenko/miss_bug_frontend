
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { UserIndex } from './pages/UserIndex.jsx'
import { MsgIndex } from './pages/MsgIndex.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { BugProvider } from './context/BugContext.jsx'


export function App() {
    return (
        <UserProvider>
            <BugProvider>
                <Router>
                    <AppHeader />
                    <main className='container'>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/bug' element={<BugIndex />} />
                            <Route path='/bug/:bugId' element={<BugDetails />} />
                            <Route path='/about' element={<AboutUs />} />
                            <Route path='/user' element={<UserIndex />}></Route>
                            <Route path='/user/:userId' element={<UserDetails />}></Route>
                            <Route path='/msg' element={<MsgIndex />}></Route>
                        </Routes>
                    </main>
                    <AppFooter />
                </Router>
            </BugProvider>
        </UserProvider>
    )
}
