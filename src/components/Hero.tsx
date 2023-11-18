import React from 'react';
import { Tldraw, TldrawEditor, DefaultColorStyle, Editor } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';

const Hero = () => {
  const handleMount = (editor: Editor) => {
    editor.setCurrentTool('draw');
    editor.setStyleForNextShapes(DefaultColorStyle, 'blue');
  };

  const customComponents = {
    Background: () => <div style={{ backgroundColor: 'black', width: '100%', height: '100%' }} />,
    // Define other custom components as needed
  };

  return (
    <div style={{
      width: '100%', // Take up full width of parent
      height: '100vh', // Take up full viewport height

    }}>
      <div style={{
        width: '430px', // Set fixed width for Tldraw editor
        height: '200px', // Set fixed height for Tldraw editor
        borderRadius: '10px', // Optional: rounded corners
      }}>
        <Tldraw
          onMount={handleMount}
          components={customComponents}
          hideUi // Hides the default UI
        />
      </div>
    </div>
  );
};

export default Hero;
