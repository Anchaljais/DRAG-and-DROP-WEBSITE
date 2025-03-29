import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../constants';
import '../styles.css';

const Tool = ({ type, children, icon = null, style = {}, onClick, isTemplate = false }) => {
  const [{ isDragging }, drag] = useDrag({
    type: type,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`tool-item ${isTemplate ? 'template-tool' : ''}`}
      style={{
        ...style,
        opacity: isDragging ? 0.6 : 1,
        cursor: 'grab',
      }}
      onClick={onClick}
    >
      {icon && <span className="tool-icon">{icon}</span>}
      {children}
      <span className="tool-hint">{isTemplate ? 'Click to apply' : 'Drag to canvas'}</span>
    </div>
  );
};

const Toolbar = ({
  onTextSizeChange,
  onFontFamilyChange,
  onTextColorChange,
  onTextAlignChange,
  onFontWeightChange,
  onApplyTemplate,
  onShowComponents,
  onShowTemplates,
  currentTextSize = 16
}) => {
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [textAlign, setTextAlign] = useState('left');
  const [fontWeight, setFontWeight] = useState('normal');
  const [activeTab, setActiveTab] = useState('text');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFontFamilyChange = (e) => {
    const newFont = e.target.value;
    setFontFamily(newFont);
    onFontFamilyChange && onFontFamilyChange(newFont);
  };

  const handleTextColorChange = (e) => {
    const newColor = e.target.value;
    setTextColor(newColor);
    onTextColorChange && onTextColorChange(newColor);
  };

  const handleTextAlignChange = (align) => {
    setTextAlign(align);
    onTextAlignChange && onTextAlignChange(align);
  };

  const handleFontWeightChange = (weight) => {
    setFontWeight(weight);
    onFontWeightChange && onFontWeightChange(weight);
  };

  const textElements = [
    { type: ItemTypes.HEADING1, icon: "H1", label: "Heading 1", defaultSize: 32 },
    { type: ItemTypes.HEADING2, icon: "H2", label: "Heading 2", defaultSize: 28 },
    { type: ItemTypes.HEADING3, icon: "H3", label: "Heading 3", defaultSize: 24 },
    { type: ItemTypes.PARAGRAPH, icon: "P", label: "Paragraph", defaultSize: 16 },
    { type: ItemTypes.LIST, icon: "•", label: "List", defaultSize: 16 },
    { type: ItemTypes.QUOTE, icon: "❝", label: "Quote", defaultSize: 20, style: { fontStyle: 'italic' } }
  ];

  const mediaElements = [
    { type: ItemTypes.IMAGE, icon: "🖼️", label: "Image" },
    { type: ItemTypes.ICON, icon: "⭐", label: "Icon" },
    { type: ItemTypes.VIDEO, icon: "📹", label: "Video" },
    { type: ItemTypes.GALLERY, icon: "🖼️🖼️", label: "Gallery" }
  ];

  const layoutElements = [
    { type: ItemTypes.CONTAINER, icon: "📦", label: "Container" },
    { type: ItemTypes.NAVBAR, icon: "⎯", label: "Navbar" },
    { type: ItemTypes.SIDEBAR, icon: "⎢", label: "Sidebar" },
    { type: ItemTypes.HERO, icon: "🌟", label: "Hero" },
    { type: ItemTypes.FOOTER, icon: "⎯", label: "Footer" },
    { type: ItemTypes.GRID, icon: "田", label: "Grid" }
  ];

  const componentElements = [
    { type: ItemTypes.BUTTON, icon: "🔘", label: "Button" },
    { type: ItemTypes.CARD, icon: "🃏", label: "Card" },
    { type: ItemTypes.TESTIMONIAL, icon: "💬", label: "Testimonial" },
    { type: ItemTypes.FORM, icon: "📝", label: "Form" },
    { type: ItemTypes.ACCORDION, icon: "↕️", label: "Accordion" },
    { type: ItemTypes.TABS, icon: "📑", label: "Tabs" }
  ];

  const templateElements = [
    { type: 'BUSINESS_TEMPLATE', icon: "🏢", label: "Business" },
    { type: 'PORTFOLIO_TEMPLATE', icon: "🎨", label: "Portfolio" },
    { type: 'BLOG_TEMPLATE', icon: "✍️", label: "Blog" },
    { type: 'ECOMMERCE_TEMPLATE', icon: "🛒", label: "E-commerce" }
  ];

  const fontOptions = [
    'Arial', 'Verdana', 'Helvetica', 'Times New Roman',
    'Courier New', 'Georgia', 'Palatino', 'Garamond',
    'Impact', 'Comic Sans MS', 'Trebuchet MS'
  ];

  const filteredElements = (elements) => {
    return elements.filter(el =>
      el.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className='toolbar'>
      <div className="toolbar-header">
        <h2>Elements</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="toolbar-tabs">
        <button
          className={activeTab === 'text' ? 'active' : ''}
          onClick={() => setActiveTab('text')}
        >
          Text
        </button>
        <button
          className={activeTab === 'media' ? 'active' : ''}
          onClick={() => setActiveTab('media')}
        >
          Media
        </button>
        <button
          className={activeTab === 'layout' ? 'active' : ''}
          onClick={() => setActiveTab('layout')}
        >
          Layout
        </button>
        <button
          className={activeTab === 'components' ? 'active' : ''}
          onClick={() => setActiveTab('components')}
        >
          Components
        </button>
      </div>

      {activeTab === 'text' && (
        <>
          <div className="tool-section">
            <h3>Text Options</h3>
            <div className="text-controls">
              <div className="control-group">
                <label>Font Size</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="8"
                    max="72"
                    value={currentTextSize}
                    onChange={(e) => onTextSizeChange(parseInt(e.target.value))}
                  />
                  <span className="size-value">{currentTextSize}px</span>
                </div>
              </div>

              <div className="control-group">
                <label>Font Family</label>
                <select
                  value={fontFamily}
                  onChange={handleFontFamilyChange}
                >
                  {fontOptions.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              <div className="control-group">
                <label>Text Color</label>
                <div className="color-picker">
                  <input
                    type="color"
                    value={textColor}
                    onChange={handleTextColorChange}
                  />
                  <span className="color-value">{textColor}</span>
                </div>
              </div>

              <div className="control-group">
                <label>Text Align</label>
                <div className="align-buttons">
                  <button
                    className={textAlign === 'left' ? 'active' : ''}
                    onClick={() => handleTextAlignChange('left')}
                  >
                    Left
                  </button>
                  <button
                    className={textAlign === 'center' ? 'active' : ''}
                    onClick={() => handleTextAlignChange('center')}
                  >
                    Center
                  </button>
                  <button
                    className={textAlign === 'right' ? 'active' : ''}
                    onClick={() => handleTextAlignChange('right')}
                  >
                    Right
                  </button>
                </div>
              </div>

              <div className="control-group">
                <label>Font Weight</label>
                <div className="weight-buttons">
                  <button
                    className={fontWeight === 'normal' ? 'active' : ''}
                    onClick={() => handleFontWeightChange('normal')}
                  >
                    Normal
                  </button>
                  <button
                    className={fontWeight === 'bold' ? 'active' : ''}
                    onClick={() => handleFontWeightChange('bold')}
                  >
                    Bold
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="tool-section">
            <h3>Text Elements</h3>
            <div className="tool-grid">
              {filteredElements(textElements).map((item) => (
                <Tool
                  key={item.type}
                  type={item.type}
                  icon={item.icon}
                  style={item.style}
                  onClick={() => onTextSizeChange(item.defaultSize)}
                >
                  {item.label}
                </Tool>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'media' && (
        <div className="tool-section">
          <h3>Media Elements</h3>
          <div className="tool-grid">
            {filteredElements(mediaElements).map((item) => (
              <Tool
                key={item.type}
                type={item.type}
                icon={item.icon}
              >
                {item.label}
              </Tool>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'layout' && (
        <div className="tool-section">
          <h3>Layout Elements</h3>
          <div className="tool-grid">
            {filteredElements(layoutElements).map((item) => (
              <Tool
                key={item.type}
                type={item.type}
                icon={item.icon}
              >
                {item.label}
              </Tool>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'components' && (
        <div className="tool-section">
          <h3>Components</h3>
          <div className="tool-grid">
            {filteredElements(componentElements).map((item) => (
              <Tool
                key={item.type}
                type={item.type}
                icon={item.icon}
              >
                {item.label}
              </Tool>
            ))}
          </div>
        </div>
      )}

      <div className="tool-section">
        <h3>Templates & Prebuilt</h3>
        <div className="template-actions">
          <button onClick={onShowTemplates}>Browse Templates</button>
          <button onClick={onShowComponents}>Prebuilt Components</button>
        </div>
        <div className="tool-grid">
          {filteredElements(templateElements).map((item) => (
            <Tool
              key={item.type}
              type={item.type}
              icon={item.icon}
              isTemplate={true}
              onClick={() => onApplyTemplate(item.type)}
            >
              {item.label} Template
            </Tool>
          ))}
        </div>
      </div>

      <div className="toolbar-footer">
        <button className="save-preset" onClick={() => alert('Feature coming soon!')}>
          Save Preset
        </button>
        <button className="clear-all" onClick={() => alert('Feature coming soon!')}>
          Clear Canvas
        </button>
      </div>
    </div>
  );
};

export default Toolbar;