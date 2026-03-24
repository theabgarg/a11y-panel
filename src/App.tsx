import AccessibilityWidget from './lib/components/AccessibilityWidget';

const customTheme = {
  primary: 'white',
  background: '#eee',
  widgetBackground: 'white',
  text: '#000',
  iconColor: '#000'
};

const CustomIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="8" r="2" fill="currentColor"/>
    <path d="M7 13L12 18L17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function App() {
  return (
    <div className='App'>
      <AccessibilityWidget 
        theme={customTheme}
        initialPosition={{ x: 100, y: 100 }}
        customIcon={<CustomIcon />}
      />
    </div>
  );
}
