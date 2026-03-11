import { Languages, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useAppPreferences } from "@/contexts/AppPreferences";

export function AppControls() {
  const { language, toggleLanguage } = useAppPreferences();
  const { theme, setTheme } = useTheme();
  const currentTheme = theme === "light" || theme === "dark" || theme === "system" ? theme : "system";
  const nextTheme = currentTheme === "light" ? "dark" : currentTheme === "dark" ? "system" : "light";
  const ThemeIcon = currentTheme === "light" ? Sun : currentTheme === "dark" ? Moon : Monitor;

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="rounded-full px-3" onClick={toggleLanguage}>
        <Languages className="w-4 h-4" />
        {language === "en" ? "EN" : "SW"}
      </Button>
      <Button variant="outline" size="sm" className="rounded-full px-3" onClick={() => setTheme(nextTheme)}>
        <ThemeIcon className="w-4 h-4" />
        {currentTheme === "light" ? "Light" : currentTheme === "dark" ? "Dark" : "System"}
      </Button>
    </div>
  );
}
