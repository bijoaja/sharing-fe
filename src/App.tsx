import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ErrorAlert } from './components/ErrorAlert';
import { Dashboard } from './pages/Dashboard';
import { ArticlePreview } from './pages/ArticlePreview';
import { ArticleForm } from './pages/ArticleForm';
import { PreviewPage } from './pages/PreviewPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background text-on-background font-body-md text-body-md flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Main content */}
        <div className="flex flex-col flex-1 w-full">
          <Header onMenuToggle={toggleSidebar} />
          <ErrorAlert />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/article/new" element={<ArticleForm />} />
            <Route path="/article/:id" element={<ArticlePreview />} />
            <Route path="/article/:id/edit" element={<ArticleForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
