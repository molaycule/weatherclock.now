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
};

export default function App({ Component, pageProps }) {
  return (
    <Grommet>
      <Component {...pageProps} />
    </Grommet>
  );
}
