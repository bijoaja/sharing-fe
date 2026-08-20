import { useState } from 'react';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 w-full fixed top-0 z-10 bg-surface dark:bg-on-secondary-fixed border-b border-outline-variant dark:border-on-surface-variant flex justify-between items-center pl-margin-mobile md:pl-[284px] pr-margin-mobile md:pr-margin-desktop shadow-sm dark:shadow-none">
      {/*  Hamburger & Title */}
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        <button
          onClick={onMenuToggle}
          className="md:hidden text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface active:text-primary dark:active:text-primary-fixed transition-colors p-2 -ml-2"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="font-title-sm text-title-sm font-bold text-primary dark:text-primary-fixed hidden md:block whitespace-nowrap">
          Article Manager
        </h2>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-md mx-4 relative hidden md:flex">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-on-surface-variant material-symbols-outlined">
          search
        </span>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-outline-variant dark:border-outline-variant bg-surface-container-low dark:bg-surface-container-high text-on-surface dark:text-on-surface text-body-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:focus:border-primary-fixed dark:focus:ring-primary-fixed/20"
        />
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        <button className="text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface dark:hover:text-on-surface transition-colors" aria-label="Notifications">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>
    </header>
  );
}
