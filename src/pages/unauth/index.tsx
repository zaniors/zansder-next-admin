import left from '../../assets/unauth/left.svg'
import logo from '../../assets/unauth/logo.svg'
import right from '../../assets/unauth/right.svg'
import './index.scss'
import SignInPage from './signin'
import { SignUpPage } from './signup'

const UnAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='unauth-container-page'>
      <header
        className='header'
        style={{ backgroundImage: `url(${logo})` }}
      ></header>
      <section
        className='backgroud'
        style={{ backgroundImage: `url(${right}), url(${left})` }}
      ></section>
      {children}
    </section>
  )
}

export const unauthRoutingModule = {
  path: '',
  childRoutes: [
    { path: 'signin', component: SignInPage },
    { path: 'signup', component: SignUpPage },
  ],
}

export default UnAuthLayout
