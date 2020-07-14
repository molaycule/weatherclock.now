import { useEffect, useState } from 'react';
import Head from 'next/head';
import { version } from '../package.json';
import {
  Box,
  Layer,
  Clock,
  Text,
  TextInput,
  Button,
  Header,
  Anchor,
} from 'grommet';

const weatherIcons = {
  cloud: 'cloud',
  drizzle: 'drizzle',
  lightning: 'lightning',
  rain: 'rain',
  snow: 'snow',
  sun: 'sun',
  wind: 'wind',
};

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [greeting, setGreeting] = useState('');
  const [showNickname, setShowNickname] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [nickname, setNickname] = useState('');
  const [temperature, setTemperature] = useState('');
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  const [weatherCode, setWeatherCode] = useState('');

  const successfulLookup = (position) => {
    const { latitude: lat, longitude: long } = position.coords;
    fetch(`/api/weather?lat=${lat}&long=${long}`)
      .then((res) => res.json())
      .then((data) => {
        setTemperature(data.main.temp);
        setWeather(data.weather[0].main);
        setWeatherCode(data.weather[0].id);
        setShowWeather(true);
      });
    fetch(`/api/location?lat=${lat}&long=${long}`)
      .then((res) => res.text())
      .then((data) => {
        const locationNames = data.split(',');
        setLocation(
          `${locationNames[locationNames.length - 2]}, ${
            locationNames[locationNames.length - 1]
          }`
        );
      });
  };

  useEffect(() => {
    // resize listener
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    // get user location
    if (window.navigator.geolocation) {
      // Geolocation available
      window.navigator.geolocation.getCurrentPosition(
        successfulLookup,
        console.log
      );
    }
    // set show nickname modal
    const _n = localStorage.getItem('_n');
    if (!_n) {
      setShowNickname(true);
    } else {
      setShowNickname(false);
      setNickname(_n); // set nickname
    }
    // set greeting
    const hour = new Date().getHours();
    setGreeting(
      hour >= 0 && hour <= 11
        ? 'morning'
        : hour >= 12 && hour <= 16
        ? 'afternoon'
        : hour >= 17 && hour <= 20
        ? 'evening'
        : 'night'
    );
    // fetch background image
    if (greeting) {
      const fetchImage = () => {
        fetch(
          `https://source.unsplash.com/random?${greeting},weather`
        ).then((res) => setImageUrl(res.url));
      };
      fetchImage();
      const interval = setInterval(() => fetchImage(), [15000]);
      return () => clearInterval(interval);
    }
  }, [greeting]);

  return (
    <div className='container'>
      <Head>
        <title>Weather Clock Now</title>
        <meta name='title' content='Weather Clock Now' />
        <meta name='description' content='a simple clock and weather web app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Box
          className='full'
          align='center'
          animation='fadeIn'
          justify='center'
          background={{
            color: 'dark-1',
            dark: true,
            position: 'center',
            repeat: 'no-repeat',
            size: 'cover',
            image: `url(${imageUrl})`,
          }}>
          <Header
            background={{
              color: 'dark-1',
              dark: true,
              opacity: true,
            }}
            width='100vw'
            pad='medium'>
            <Box className='logo'></Box>
            <Box className='icon info' onClick={() => setShowInfo(true)}></Box>
          </Header>
          <Box
            className='full'
            align='center'
            animation='fadeIn'
            justify='center'
            width='100vw'
            background={{
              color: 'dark-1',
              dark: true,
              opacity: true,
            }}>
            {greeting && (
              <Text
                margin={{ bottom: 'xsmall' }}
                textAlign='center'>{`Good ${greeting}${
                nickname === '' ? '' : ','
              } ${nickname}`}</Text>
            )}
            <Clock type='digital' size='xxlarge' />
            {showWeather && (
              <>
                <Box direction='row' pad='small'>
                  <Box
                    className={`icon weather weather-${
                      weatherCode >= 200 && weatherCode < 300
                        ? weatherIcons.lightning
                        : weatherCode >= 300 && weatherCode < 500
                        ? weatherIcons.drizzle
                        : weatherCode >= 500 && weatherCode < 600
                        ? weatherIcons.rain
                        : weatherCode >= 600 && weatherCode < 700
                        ? weatherIcons.snow
                        : weatherCode >= 700 && weatherCode < 800
                        ? weatherIcons.wind
                        : weatherCode === 800
                        ? weatherIcons.sun
                        : weatherIcons.cloud
                    }`}></Box>
                  <Text>
                    {temperature}&deg; {weather}
                  </Text>
                </Box>
                {location && (
                  <Box direction='row'>
                    <Box className={`icon-sm location`}></Box>
                    <Text size='xsmall'>{location}</Text>
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
        {showNickname && (
          <Layer
            responsive={false}
            onEsc={() => setShowNickname(false)}
            onClickOutside={() => setShowNickname(false)}>
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
                  setShowNickname(false); // hide nickname modal
                }}
              />
            </Box>
          </Layer>
        )}
        {showInfo && (
          <Layer
            responsive={false}
            onEsc={() => setShowInfo(false)}
            onClickOutside={() => setShowInfo(false)}>
            <Box pad='small' width='268px'>
              <Text margin={{ bottom: 'xsmall' }}>Weather Clock Now</Text>
              <div
                style={{
                  width: '100%',
                  height: 1,
                  border: '0.25px solid #eee',
                  marginBottom: 10,
                }}
              />
              <Text size='xsmall' margin={{ bottom: 'xsmall' }}>
                Version <Anchor label={version} />
              </Text>
              <Text size='xsmall' margin={{ bottom: 'xsmall' }}>
                Author{' '}
                <Anchor
                  target='_blank'
                  href='//github.com/moodele'
                  label='Mohammed Agboola'
                />
              </Text>
              <Text size='xsmall' margin={{ bottom: 'xsmall' }}>
                Images from{' '}
                <Anchor
                  target='_blank'
                  href='//unsplash.com'
                  label='unsplash'
                />
              </Text>
              <Text size='xsmall' margin={{ bottom: 'xsmall' }}>
                Icons from{' '}
                <Anchor
                  target='_blank'
                  href='//feathericons.com'
                  label='feathericons'
                />
              </Text>
              <Text size='xsmall' margin={{ bottom: 'xsmall' }}>
                UI library from{' '}
                <Anchor
                  target='_blank'
                  href='//v2.grommet.io'
                  label='grommet'
                />
              </Text>
            </Box>
          </Layer>
        )}
      </main>
    </div>
  );
}
