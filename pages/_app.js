import { Grommet } from 'grommet';
import 'styles/global.css';

const theme = {
  global: {
    font: {
      family: 'Nanum Gothic',
      size: '18px',
      height: '20px',
    },
  },
  anchor: {
    hover: {
      textDecoration: 'none',
    },
  },
};

export default function App({ Component, pageProps }) {
  return (
    <Grommet theme={theme}>
      <Component {...pageProps} />
    </Grommet>
  );
}
