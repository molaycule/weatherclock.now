import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Clock, Text } from 'grommet';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const fetchImage = () => {
      fetch('https://source.unsplash.com/random?nature').then((res) =>
        setImageUrl(res.url)
      );
    };
    fetchImage();
    const interval = setInterval(() => {
      fetchImage();
    }, [15000]);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container'>
      <Head>
        <title>Clock Now</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Box
          align='center'
          animation='fadeIn'
          justify='center'
          height='100vh'
          background={{
            color: 'dark-1',
            dark: true,
            position: 'center',
            repeat: 'no-repeat',
            size: 'cover',
            image: `url(${imageUrl})`,
          }}>
          <Box
            align='center'
            animation='fadeIn'
            justify='center'
            height='100vh'
            width='100vw'
            background={{
              color: 'dark-1',
              dark: true,
              opacity: true
            }}>
            <Text>Clock.now</Text>
            <Clock type='digital' size='xlarge' />
          </Box>
        </Box>
      </main>
    </div>
  );
}
