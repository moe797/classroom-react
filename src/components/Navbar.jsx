import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { default as BsNavbar } from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { BiLogIn } from 'react-icons/bi';
import { IoCreateOutline } from 'react-icons/io5';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GiBookmarklet } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Avatar from './UI/Avatar';

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/');
  };
  return (
    <BsNavbar bg="dark" variant="dark" expand={false}>
      <Container fluid className="d-flex justify-content-start gap-4">
        {user && (
          <BsNavbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
        )}
        <BsNavbar.Brand
          as={Link}
          to={user ? 'classes' : '/'}
          className="d-flex gap-3 align-items-center"
        >
          <GiBookmarklet style={{ fontSize: '40px' }} />
          Classroom
        </BsNavbar.Brand>
        {user && (
          <>
            <BsNavbar.Offcanvas
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="start"
              className="text-bg-dark offcanvas-size-sm"
            >
              <Offcanvas.Header closeButton closeVariant="white">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                  <BsNavbar.Brand
                    as={Link}
                    to="classes"
                    className="d-flex gap-3 align-items-center"
                  >
                    <GiBookmarklet style={{ fontSize: '40px' }} />
                    Classroom
                  </BsNavbar.Brand>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link>Classes</Nav.Link>
                  <Nav.Link>Archived</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </BsNavbar.Offcanvas>
            <Avatar onLogout={handleLogout} />
          </>
        )}
        {!user && (
          <>
            <Nav className="ms-auto flex-row gap-4 px-3">
              <LinkContainer to={'login'}>
                <Nav.Link className="d-flex align-items-center">
                  <BiLogIn className="me-2" />
                  Login
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={'register'}>
                <Nav.Link className="d-flex align-items-center">
                  <IoCreateOutline className="me-2" />
                  Register
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </>
        )}
      </Container>
    </BsNavbar>
  );
};
export default Navbar;
