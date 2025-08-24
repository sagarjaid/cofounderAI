// import LoginWithGoogle from '@/components/LoginWithGoogle';
// import SEOMeta from '@/components/SEOMeta';
import React from 'react';
// import Typewriter from 'typewriter-effect';
// import { useRouter } from 'next/router';
// import HeroCard from '@/components/HeroCard';
// import Testimonial from '@/components/Testimonial';
// import Footer from '@/components/Footer';
// import Nav from '@/components/Nav';

const Home = () => {
  return (
    <>
      {/* <SEOMeta
        title='Careerdekho AI — AI Career Discovery Tool'
        description='Find the perfect career for you with the help of AI. Let our AI-powered career discovery tool help you find the right career fit!'
      /> */}
      <div className='flex flex-col gap-8 md:gap-14 pb-6 items-center '>
        <div className='w-full flex flex-col items-center bg-gradient-to-t from-white via-blue-200 to-white'>
          <main className='flex max-w-5xl gap-6 items-center flex-col w-full'>
            {/* <Nav /> */}
            <div className='flex flex-col text-center items-center pt-16 text-base font-extrabold xs:text-2xl sdm:text-3xl sm:gap-3 md:text-4xl mdx:text-5xl '>
              <div>Find Your Co-Founder in Days, Not Months</div>
              <p className='text-center text-xs sm:text-base'>
              Join an exclusive network of verified entrepreneurs. Connect with Hackers, Hipsters, and Hustlers who are ready to build the next big thing together.
              </p>
              
            </div>


            <div className='flex flex-col items-center gap-4 text-center  text-gray-600 sm:text-base'>
              <a href='/'>
                <img
                  src='/usedby.png'
                  className='w-[250px]'
                />{' '}
              </a>
              <p className='text-center text-xs sm:text-base'>
                40,000+ people already signup
              </p>
              {/* <LoginWithGoogle /> */}
              <span className='text-xs'>✓ No credit card required</span>
            </div>
          </main>
        </div>

        {/* <iframe
          className="w-full max-w-6xl  aspect-video rounded-2xl border-4 border-black bg-black shadow-2xl sm:w-11/12"
          src="https://www.youtube.com/embed/bWC7SYxkyfg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe> */}

        <div className=' w-full flex items-center justify-center'>
          <div className=' m-4 flex max-w-4xl flex-col items-center text-center justify-center gap-4 rounded-2xl bg-blue-500 p-8 text-white'>
            <div className='mt-4 text-3xl font-bold'>
              Take the first step toward your dream career today!
            </div>
            <p className='max-w-lg text-center'>
              Are you struggling to decide on the right career path for you? Let
              our AI-powered career guidance tool help you find the perfect fit!
            </p>
            {/* <LoginWithGoogle /> */}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Home;