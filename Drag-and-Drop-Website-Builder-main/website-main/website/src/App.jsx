import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import WebsiteSection from './components/WebsiteSection';
import Toolbar from './components/Toolbar';
import './styles.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <Toolbar
          onTextSizeChange={(size) => console.log('Text size changed:', size)}
          onFontFamilyChange={(font) => console.log('Font family changed:', font)}
          onTextColorChange={(color) => console.log('Text color changed:', color)}
          onTextAlignChange={(align) => console.log('Text align changed:', align)}
          onFontWeightChange={(weight) => console.log('Font weight changed:', weight)}
          onApplyTemplate={(template) => console.log('Template applied:', template)}
          onShowComponents={() => console.log('Show components clicked')}
          onShowTemplates={() => console.log('Show templates clicked')}
        />
        <WebsiteSection />
      </div>
    </DndProvider>
  );
}

export default App;