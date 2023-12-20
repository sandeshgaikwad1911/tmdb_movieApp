import HeroBanner from './heroBanner/HeroBanner'
import './style.scss'
const Home = () => {
  return (
    <div className='homepage'>
      <HeroBanner/>
      <div style={{height: '1000px'}}></div>
    </div>
  )
}

export default Home