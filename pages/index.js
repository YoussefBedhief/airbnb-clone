import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LargeCard from '../components/LargeCard'
import MediumCard from '../components/MediumCard'
import SmallCard from '../components/SmallCard'

export default function Home ({exploreData, cardData}) {
  return (
    <div className="">
      <Head>
        <title>Airbnb clone</title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/2111/2111320.png" />
      </Head>

    {/*Header */}
    <Header />
    {/*Banner */}
    <Banner />
    {/*Main */}
    <main className='max-w-7xl mx-auto px-8 sm:px-16'>
      <section className='pt-6 '>
        <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
          {exploreData?.map((item) => (
          <SmallCard 
          key={item.img}
          img={item.img}
          location={item.location}
          distance={item.distance} />
          ))}
        </div>

      </section>
      <section >
      <h2 className='text-4xl font-semibold pb-5'>Live Anywhere</h2>
      <div className='flex space-x-3 overflow-scroll scrollbar-hide p-4 -ml-3'>
        {cardData?.map(item =>(
              <MediumCard 
              key={item.img}
              img={item.img}
              title={item.title} />
            ))}
      </div>
            
      </section>
      <LargeCard 
      img="https://links.papareact.com/4cj"
      title="The Greatest Outdoors"
      description="WishLists curated by Airbnb."
      buttonText="Get Inspired"
      />
    </main>
    {/*Header */}
    <Footer />


    </div>
  )
}

export async function getStaticProps(){
  const exploreData = await fetch('https://links.papareact.com/pyp').
  then(
    res => res.json()
  )
  const cardData = await fetch('https://links.papareact.com/zp1').
  then(
    res => res.json()
  )
  return{
    props:{
      exploreData,
      cardData
    }
  }
}