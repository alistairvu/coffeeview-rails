import Container from "react-bootstrap/Container"
import { AppHeader } from "./components/app"

const App: React.FC = () => {
  return (
    <>
      <header>
        <AppHeader />
      </header>
      <main>
        <Container className="text-center py-5">
          <h1>Welcome to React!</h1>
          <h3 style={{ fontSize: 30 }}>
            Get started by editing{" "}
            <code style={{ color: "red" }}>src/App.tsx</code>
          </h3>
        </Container>
      </main>
    </>
  )
}

export default App
