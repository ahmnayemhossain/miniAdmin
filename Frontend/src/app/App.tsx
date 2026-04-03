import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="mini-admin-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;