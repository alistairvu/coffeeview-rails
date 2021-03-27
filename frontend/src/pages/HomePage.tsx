import Container from "react-bootstrap/Container"

const HomePage: React.FC = () => {
  return (
    <Container className="text-center py-3">
      <h1>Welcome to coffeeview!</h1>
      <h3 style={{ fontSize: 30 }}>
        Get started by logging in, signing up, or browsing around!
      </h3>
    </Container>
  )
}

export default HomePage
