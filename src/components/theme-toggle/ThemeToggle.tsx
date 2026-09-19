import { useTheme } from '../../hooks/useTheme';
import { IconButton } from '../ui/IconButton';
import { MoonIcon, SunIcon } from '../icons';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Ativar tema claro' : 'Ativar tema escuro';

  return (
    <IconButton aria-label={label} onClick={toggleTheme}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}
