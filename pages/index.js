import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Layer, Clock, Text, TextInput, Button, Footer } from 'grommet';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [greeting, setGreeting] = useState('');
  const [show, setShow] = useState(false);
  const [nickname, setNickname] = React.useState('');

  useEffect(() => {
    // set show modal
    const _n = localStorage.getItem('_n');
    if (!_n) {
      setShow(true);
    } else {
      setShow(false);
      setNickname(_n); // set nickname
    }
    // set greeting
    const hour = new Date().getHours();
    setGreeting(
      hour >= 0 && hour <= 11
        ? 'Good morning'
        : hour >= 12 && hour <= 16
        ? 'Good afternoon'
        : hour >= 17 && hour <= 20
        ? 'Good evening'
        : 'Good night'
    );
    // fetch background image
    const fetchImage = () => {
      fetch('https://source.unsplash.com/random?nature').then((res) =>
        setImageUrl(res.url)
      );
    };
    fetchImage();
    const interval = setInterval(() => {
      fetchImage();
    }, [20000]);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container'>
      <Head>
        <title>Weather Clock Now</title>
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
              opacity: true,
            }}>
            <Text textAlign='center'>{`${greeting}${
              nickname === '' ? '' : ','
            } ${nickname}`}</Text>
            <Clock type='digital' size='xxlarge' />
          </Box>
          <Footer
            background={{
              color: 'dark-1',
              dark: true,
              opacity: true,
            }}
            width='100vw'
            pad='medium'>
            <Box className='info'></Box>
          </Footer>
        </Box>
        {show && (
          <Layer
            responsive={false}
            onEsc={() => setShow(false)}
            onClickOutside={() => setShow(false)}>
            <Box pad='medium' width='268px'>
              <Text margin={{ bottom: 'xsmall' }}>Enter your nickname</Text>
              <Box margin={{ bottom: 'medium' }}>
                <TextInput
                  placeholder='Nickname'
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                />
              </Box>
              <Button
                label='save'
                onClick={() => {
                  localStorage.setItem('_n', nickname); // set nickname in local storage
                  setShow(false); // hide modal
                }}
              />
            </Box>
          </Layer>
        )}
      </main>
    </div>
  );
}
