import { GlobePage, MainPage } from 'pages';
import { Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';

function App() {
  return (
    <Wrapper>
      <Header>
        <Link to="/">
          <Logo src="/static/logo/shapes.png" alt="3d logo" />
        </Link>
        <LinkWrapper>
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
            <li>simple cube</li>
          </Link>
          <Link to="/globe" style={{ textDecoration: 'none', color: '#333' }}>
            <li>globe</li>
          </Link>
        </LinkWrapper>
      </Header>
      <main>
        <Route path="/" exact={true} component={MainPage} />
        <Route path="/globe" exact={true} component={GlobePage} />
      </main>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  minHeight: '100vh',
});

const Header = styled.header({
  display: 'flex',
  position: 'sticky',
  height: '3em',
  alignItems: 'center',
  width: '100%',
  padding: '1em',
  zIndex: 100,
  background: 'rgba(256, 256, 256, 0.1)',
});

const Logo = styled.img({
  width: '2em',
  height: '2em',
  marginRight: '1em',
  cursor: 'pointer',
});

const LinkWrapper = styled.ul({
  display: 'flex',
  padding: 0,
  li: {
    listStyle: 'none',
    cursor: 'pointer',
  },
});

export default App;
