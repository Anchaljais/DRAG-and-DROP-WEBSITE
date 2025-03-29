import React, { useState, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../constants';
import { Rnd } from 'react-rnd';
import { templates } from './templates';
import { prebuiltComponents } from '../prebuiltComponents';
import '../styles.css';

const WebsiteSection = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showComponents, setShowComponents] = useState(false);
  const [currentTextSize, setCurrentTextSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [textAlign, setTextAlign] = useState('left');
  const [fontWeight, setFontWeight] = useState('normal');
  const canvasRef = useRef(null);

  // Layer manipulation functions
  const bringToFront = (id) => {
    setElements(prev => {
      const maxZ = Math.max(...prev.map(el => el.zIndex), 0);
      return prev.map(el =>
        el.id === id ? { ...el, zIndex: maxZ + 1 } : el
      );
    });
  };

  const sendToBack = (id) => {
    setElements(prev => {
      const minZ = Math.min(...prev.map(el => el.zIndex), 0);
      return prev.map(el =>
        el.id === id ? { ...el, zIndex: minZ - 1 } : el
      );
    });
  };

  const moveUp = (id) => {
    setElements(prev => {
      const element = prev.find(el => el.id === id);
      if (!element) return prev;

      const nextElements = prev.filter(el => el.zIndex > element.zIndex);
      if (nextElements.length === 0) return prev;

      const nextZ = Math.min(...nextElements.map(el => el.zIndex));
      return prev.map(el =>
        el.id === id ? { ...el, zIndex: nextZ } : el
      );
    });
  };

  const moveDown = (id) => {
    setElements(prev => {
      const element = prev.find(el => el.id === id);
      if (!element) return prev;

      const prevElements = prev.filter(el => el.zIndex < element.zIndex);
      if (prevElements.length === 0) return prev;

      const prevZ = Math.max(...prevElements.map(el => el.zIndex));
      return prev.map(el =>
        el.id === id ? { ...el, zIndex: prevZ } : el
      );
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.minHeight = `${Math.max(
        1000,
        ...elements.map(el => el.y + el.height)
      )}px`;
    }
  }, [elements]);

  const [, drop] = useDrop({
    accept: Object.values(ItemTypes),
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const x = offset ? offset.x - canvasRect.left : 100;
      const y = offset ? offset.y - canvasRect.top : 100;

      let newElement;
      const maxZ = Math.max(...elements.map(el => el.zIndex), 0);

      if (item.component) {
        newElement = {
          ...item.component,
          id: Date.now().toString(),
          x,
          y,
          zIndex: maxZ + 1,
          fontSize: currentTextSize,
          fontFamily,
          color: textColor,
          textAlign,
          fontWeight
        };
      } else {
        newElement = {
          ...createNewElement(item.type, x, y),
          zIndex: maxZ + 1
        };
      }

      setElements(prev => [...prev, newElement]);
      setSelectedElement(newElement.id);
    },
  });

  const createNewElement = (type, x, y) => {
    const defaults = {
      id: Date.now().toString(),
      type,
      x,
      y,
      zIndex: elements.length + 1,
      color: textColor,
      backgroundColor: '#ffffff',
      borderColor: '#dddddd',
      borderWidth: 1,
      borderRadius: 0,
      padding: 10,
      content: '',
      fontSize: currentTextSize,
      fontFamily,
      fontWeight,
      textAlign,
      animation: 'none',
      animationDuration: 1,
      animationDelay: 0
    };

    const typeSpecific = {
      [ItemTypes.HEADING1]: {
        content: 'Heading 1',
        fontSize: 32,
        fontWeight: 'bold',
        height: 60
      },
      [ItemTypes.HEADING2]: {
        content: 'Heading 2',
        fontSize: 28,
        fontWeight: 'bold',
        height: 50
      },
      [ItemTypes.HEADING3]: {
        content: 'Heading 3',
        fontSize: 24,
        fontWeight: 'bold',
        height: 45
      },
      [ItemTypes.PARAGRAPH]: {
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        height: 100
      },
      [ItemTypes.IMAGE]: {
        content: null,
        height: 200,
        width: 300
      },
      [ItemTypes.VIDEO]: {
        content: null,
        height: 225,
        width: 400,
        controls: true,
        autoplay: false,
        loop: false,
        muted: false
      },
      [ItemTypes.NAVBAR]: {
        content: `
          <div class="nav-logo">Logo</div>
          <div class="nav-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        `,
        height: 60,
        width: '100%',
        backgroundColor: '#2c3e50',
        color: '#ffffff'
      },
      [ItemTypes.SIDEBAR]: {
        content: `
          <div class="sidebar-header">Menu</div>
          <a href="#">Dashboard</a>
          <a href="#">Profile</a>
          <a href="#">Settings</a>
        `,
        width: 250,
        height: '100%',
        backgroundColor: '#34495e',
        color: '#ffffff'
      },
      [ItemTypes.BUTTON]: {
        content: 'Click Me',
        height: 40,
        width: 120,
        backgroundColor: '#3498db',
        color: '#ffffff',
        borderRadius: 4
      },
      [ItemTypes.CARD]: {
        content: `
          <div class="card-header">Card Title</div>
          <div class="card-body">Card content goes here</div>
          <div class="card-footer">Footer</div>
        `,
        height: 200,
        width: 300,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      },
      [ItemTypes.TESTIMONIAL]: {
        content: `
          <div class="testimonial-quote">"This is an amazing product!"</div>
          <div class="testimonial-author">- Happy Customer</div>
        `,
        height: 150,
        width: 350,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 20
      }
    };

    return { ...defaults, ...(typeSpecific[type] || { width: 200, height: 100 }) };
  };

  const handleImageUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setElements(prev => prev.map(el =>
          el.id === id ? { ...el, content: e.target.result } : el
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setElements(prev => prev.map(el =>
          el.id === id ? { ...el, content: e.target.result } : el
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContentChange = (id, value) => {
    setElements(prev => prev.map(el =>
      el.id === id ? { ...el, content: value } : el
    ));
  };

  const handleStyleChange = (id, property, value) => {
    setElements(prev => prev.map(el =>
      el.id === id ? { ...el, [property]: value } : el
    ));
  };

  const handleResizeStop = (id, e, direction, ref, delta, position) => {
    setElements(prev => prev.map(el =>
      el.id === id ? {
        ...el,
        width: parseInt(ref.style.width),
        height: parseInt(ref.style.height),
        ...position
      } : el
    ));
  };

  const handleDragStop = (id, e, d) => {
    setElements(prev => prev.map(el =>
      el.id === id ? { ...el, x: d.x, y: d.y } : el
    ));
  };

  const saveDesign = () => {
    const design = { elements };
    localStorage.setItem('websiteDesign', JSON.stringify(design));
    alert('Design saved successfully!');
  };

  const loadDesign = () => {
    const saved = localStorage.getItem('websiteDesign');
    if (saved) {
      setElements(JSON.parse(saved).elements);
      alert('Design loaded successfully!');
    }
  };

  const applyTemplate = (templateType) => {
    const template = templates.find(t => t.name.toLowerCase().includes(templateType.toLowerCase()));
    if (template) {
      setElements(template.elements.map(el => ({
        ...el,
        id: Date.now().toString() + Math.random(),
        fontSize: currentTextSize,
        fontFamily,
        color: textColor,
        textAlign,
        fontWeight
      })));
    }
  };

  const renderElement = (element) => {
    const isSelected = selectedElement === element.id;
    const style = {
      color: element.color,
      backgroundColor: element.backgroundColor,
      border: `${element.borderWidth}px solid ${element.borderColor}`,
      borderRadius: `${element.borderRadius}px`,
      padding: `${element.padding}px`,
      fontSize: `${element.fontSize}px`,
      fontFamily: element.fontFamily,
      fontWeight: element.fontWeight,
      textAlign: element.textAlign,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      animation: element.animation !== 'none' ?
        `${element.animation} ${element.animationDuration}s ease ${element.animationDelay}s both` : 'none'
    };

    let content;
    switch (element.type) {
      case ItemTypes.IMAGE:
        content = (
          <div style={style}>
            {element.content ? (
              <img
                src={element.content}
                alt="Uploaded"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            ) : (
              <label className="custom-file-input">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(element.id, e)}
                />
                <div className="upload-content">
                  <span className="upload-icon">🖼️</span>
                  <span>Click to upload image</span>
                </div>
              </label>
            )}
          </div>
        );
        break;
      case ItemTypes.VIDEO:
        content = (
          <div style={style}>
            {element.content ? (
              <video
                src={element.content}
                controls={element.controls}
                autoPlay={element.autoplay}
                loop={element.loop}
                muted={element.muted}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <label className="custom-file-input">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoUpload(element.id, e)}
                />
                <div className="upload-content">
                  <span className="upload-icon">🎬</span>
                  <span>Click to upload video</span>
                </div>
              </label>
            )}
          </div>
        );
        break;
      case ItemTypes.NAVBAR:
      case ItemTypes.SIDEBAR:
      case ItemTypes.CARD:
      case ItemTypes.TESTIMONIAL:
        content = (
          <div
            style={style}
            dangerouslySetInnerHTML={{ __html: element.content }}
          />
        );
        break;
      default:
        content = (
          <div style={style}>
            {element.content}
          </div>
        );
    }

    return (
      <Rnd
        key={element.id}
        size={{ width: element.width, height: element.height }}
        position={{ x: element.x, y: element.y }}
        onDragStop={(e, d) => handleDragStop(element.id, e, d)}
        onResizeStop={(e, direction, ref, delta, position) =>
          handleResizeStop(element.id, e, direction, ref, delta, position)
        }
        bounds="parent"
        enableResizing={element.type !== ItemTypes.NAVBAR && element.type !== ItemTypes.SIDEBAR}
        minWidth={100}
        minHeight={40}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElement(element.id);
        }}
        style={{
          zIndex: element.zIndex,
          outline: isSelected ? '2px dashed #3498db' : 'none'
        }}
      >
        {content}
        {isSelected && (
          <div className="element-controls">
            <div className="control-row">
              <input
                type="text"
                value={element.content}
                onChange={(e) => handleContentChange(element.id, e.target.value)}
                placeholder="Enter content"
              />
            </div>
            <div className="control-row">
              <label>Font Size</label>
              <input
                type="range"
                min="8"
                max="72"
                value={element.fontSize}
                onChange={(e) => handleStyleChange(element.id, 'fontSize', parseInt(e.target.value))}
              />
              <span>{element.fontSize}px</span>
            </div>
            <div className="control-row">
              <label>Text Color</label>
              <input
                type="color"
                value={element.color}
                onChange={(e) => handleStyleChange(element.id, 'color', e.target.value)}
              />
              <label>BG Color</label>
              <input
                type="color"
                value={element.backgroundColor}
                onChange={(e) => handleStyleChange(element.id, 'backgroundColor', e.target.value)}
              />
            </div>
            <div className="layer-controls">
              <button onClick={() => bringToFront(element.id)} title="Bring to Front">
                <span>⬆️⬆️</span>
              </button>
              <button onClick={() => sendToBack(element.id)} title="Send to Back">
                <span>⬇️⬇️</span>
              </button>
              <button onClick={() => moveUp(element.id)} title="Move Up">
                <span>⬆️</span>
              </button>
              <button onClick={() => moveDown(element.id)} title="Move Down">
                <span>⬇️</span>
              </button>
            </div>
            <div className="control-row">
              <button
                className="delete-btn"
                onClick={() => {
                  setElements(prev => prev.filter(el => el.id !== element.id));
                  setSelectedElement(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Rnd>
    );
  };

  return (
    <div className="website-section">
      <div className="canvas-controls">
        <button onClick={() => setShowTemplates(!showTemplates)}>
          Templates
        </button>
        <button onClick={() => setShowComponents(!showComponents)}>
          Components
        </button>
        <button onClick={saveDesign}>Save</button>
        <button onClick={loadDesign}>Load</button>
      </div>

      {showTemplates && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select a Template</h2>
            <div className="template-grid">
              {templates.map((template, index) => (
                <div
                  key={index}
                  className="template-card"
                  onClick={() => {
                    setElements(template.elements.map(el => ({
                      ...el,
                      id: Date.now().toString() + Math.random()
                    })));
                    setShowTemplates(false);
                  }}
                >
                  <div className="template-preview">
                    {template.name}
                  </div>
                  <div className="template-desc">{template.description}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowTemplates(false)}>Close</button>
          </div>
        </div>
      )}

      {showComponents && (
        <div className="modal">
          <div className="modal-content">
            <h2>Prebuilt Components</h2>
            <div className="component-grid">
              {prebuiltComponents.map((component, index) => (
                <div
                  key={index}
                  className="component-card"
                  onClick={() => {
                    setShowComponents(false);
                  }}
                >
                  <div className="component-preview">
                    {component.name}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowComponents(false)}>Close</button>
          </div>
        </div>
      )}

      <div
        className="canvas-area"
        ref={(node) => {
          canvasRef.current = node;
          drop(node);
        }}
        onClick={() => setSelectedElement(null)}
      >
        {elements
          .sort((a, b) => a.zIndex - b.zIndex)
          .map(renderElement)}
      </div>
    </div>
  );
};

export default WebsiteSection;