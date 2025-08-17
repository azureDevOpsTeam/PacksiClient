import "./style/App.css";
import MainLayout from "./components/layout/main/MainLayout";
import LazyRouter from "./components/router/LazyRouter";
import { ThemeProvider } from "./components/hooks/context/ThemeContext";
import { queryClient } from "./setting/reactQuery/QueryClient";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <MainLayout>
            <LazyRouter/>
          </MainLayout>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
