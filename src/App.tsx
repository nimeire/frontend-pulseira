import { useRoutes } from 'react-router-dom';
import { ScrollToTop } from './components/scroll-to-top/ScrollToTop';
import { routes } from './router/routes';

function App() {
  const element = useRoutes(routes);

  return (
    <>
      <ScrollToTop />
      {element}
    </>
  );
}

export default App;
