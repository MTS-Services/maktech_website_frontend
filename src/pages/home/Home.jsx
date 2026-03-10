import AnimatedLines from '../../components/AnimatedLines'
import Banner from './components/Banner'

const Home = () => {
  return (
    <div className="relative min-h-screen bg-black-bg">
      {/* Animated vertical lines background */}
      <AnimatedLines />
      
      {/* Page content */}
      <div className="relative z-10">
        <Banner />
      </div>
    </div>
  )
}

export default Home
