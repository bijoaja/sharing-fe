import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems: NavItem[] = [
  { label: 'All Posts', href: '/' },
  { label: 'Add New', href: '/article/new' },
  { label: 'Preview', href: '/preview' },
];

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden mt-4 md:flex w-[260px] h-screen fixed left-0 top-0 bg-surface-container-lowest flex-col p-base gap-base shadow-sm dark:shadow-none z-20">
        <SidebarContent location={location} />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-0 w-[260px] h-screen md:hidden bg-surface-container-lowest flex flex-col p-base gap-base shadow-sm dark:shadow-none z-20 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed font-bold">
            Editorial CMS
          </h1>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface text-lg p-1"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <p className="text-secondary dark:text-secondary-fixed-dim text-body-sm mt-1">
          Systematic Elegance
        </p>

        {/* Navigation */}
        <SidebarContent location={location} onItemClick={onClose} />
      </aside>
    </>
  );
}

interface SidebarContentProps {
  location: ReturnType<typeof useLocation>;
  onItemClick?: () => void;
}

function SidebarContent({ location, onItemClick }: SidebarContentProps) {
  return (
    <>
      {/* Header - Desktop only*/}
      <div className="hidden md:block mb-gutter pl-3">
        <h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed font-bold">
          Editorial CMS
        </h1>
        <p className="text-secondary dark:text-secondary-fixed-dim text-body-sm mt-1">
          Systematic Elegance
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onItemClick}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg active:scale-[0.98] transition-all border-l-4 ${
                isActive
                  ? 'border-primary text-primary dark:text-primary-fixed font-semibold bg-surface-container-low dark:bg-surface-container-high'
                  : 'border-transparent text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low dark:hover:bg-surface-container-high hover:text-primary dark:hover:text-primary-fixed transition-colors'
              }`}
            >
              <span className="material-symbols-outlined text-base" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {item.label === 'All Posts' && 'article'}
                {item.label === 'Add New' && 'edit_note'}
                {item.label === 'Preview' && 'visibility'}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
