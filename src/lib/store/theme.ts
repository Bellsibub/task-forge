import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

type ThemeState = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
};

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
};

const themeStore = createStore<ThemeState>()(
    persist(
        (set) => ({
            theme: prefersDark,
            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === 'light' ? 'dark' : 'light',
                })),
        }),
        {
            name: 'theme',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    applyTheme(state.theme);
                }
            },
        },
    ),
);

themeStore.subscribe((state) => {
    applyTheme(state.theme);
});

export default themeStore;
