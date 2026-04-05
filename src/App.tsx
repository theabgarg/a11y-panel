import AccessibilityWidget from "./lib/components/AccessibilityWidget";
import AccessibilityIcon from "./lib/components/assets/AccessibilityIcon";

const customTheme = {
  primary: "#0e5eb1",
  background: "#ffffff",
  widgetBackground: "#ffffff",
  text: "#1f2937",
  iconColor: "#ffffff",
};

const CustomIcon = () => <AccessibilityIcon />;

export default function App() {
  return (
    <div className="App">
      <AccessibilityWidget
        theme={customTheme}
        initialPosition={{ x: 100, y: 100 }}
        customIcon={<CustomIcon />}
      />
    </div>
  );
}
