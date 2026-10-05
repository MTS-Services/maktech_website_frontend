import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { Link } from '@tiptap/extension-link';
import { Extension } from '@tiptap/core';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { 
  MdFormatBold, 
  MdFormatItalic, 
  MdFormatUnderlined,
  MdFormatAlignLeft, 
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdEdit, 
  MdDelete,
  MdLink,
  MdArrowDropDown,
  MdFormatStrikethrough,
  MdImage,
  MdVideoLibrary,
  MdGridView,
  MdTextFields
} from 'react-icons/md';

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() { return { types: ['textStyle'] }; },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
      },
    };
  },
});

const EDITOR_STYLES = `
  .ProseMirror { outline: none; }
  .ProseMirror h1 { font-size: 2.5em !important; font-weight: 800 !important; line-height: 1.2 !important; margin-bottom: 0.5em !important; }
  .ProseMirror h2 { font-size: 2em !important; font-weight: 700 !important; line-height: 1.3 !important; margin-bottom: 0.5em !important; }
  .ProseMirror h3 { font-size: 1.5em !important; font-weight: 600 !important; line-height: 1.4 !important; margin-bottom: 0.5em !important; }
  .ProseMirror p { margin-bottom: 0.75em !important; }
`;

const GridSelector = ({ id, onSelectLayout, onRemove }) => {
  const layouts = [
    { id: '1-col', name: '1 Column', slots: 1, render: () => (
      <div className="w-full h-12 flex"><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
    )},
    { id: '2-col', name: '2 Columns', slots: 2, render: () => (
      <div className="w-full h-12 flex gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
    )},
    { id: '3-col', name: '3 Columns', slots: 3, render: () => (
      <div className="w-full h-12 flex gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
    )},
    { id: '4-col', name: '4 Columns', slots: 4, render: () => (
      <div className="w-full h-12 flex gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
    )},
    { id: '2x2', name: '2x2 Grid', slots: 4, render: () => (
      <div className="w-full h-12 flex flex-col gap-1">
        <div className="flex-1 flex gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
        <div className="flex-1 flex gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
      </div>
    )},
    { id: '1-top-2-bottom', name: 'Top Heavy', slots: 3, render: () => (
      <div className="w-full h-12 flex flex-col gap-1">
        <div className="flex-1 bg-gray-200 rounded-sm"></div>
        <div className="flex-1 flex gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
      </div>
    )},
    { id: '2-top-1-bottom', name: 'Bottom Heavy', slots: 3, render: () => (
      <div className="w-full h-12 flex flex-col gap-1">
        <div className="flex-1 flex gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
        <div className="flex-1 bg-gray-200 rounded-sm"></div>
      </div>
    )},
    { id: '1-left-2-right', name: 'Left Heavy', slots: 3, render: () => (
      <div className="w-full h-12 flex gap-1">
        <div className="flex-[2] bg-gray-200 rounded-sm"></div>
        <div className="flex-1 flex flex-col gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
      </div>
    )},
    { id: '2-left-1-right', name: 'Right Heavy', slots: 3, render: () => (
      <div className="w-full h-12 flex gap-1">
        <div className="flex-1 flex flex-col gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
        <div className="flex-[2] bg-gray-200 rounded-sm"></div>
      </div>
    )},
    { id: '1-large-3-small', name: 'Hero Top', slots: 4, render: () => (
      <div className="w-full h-12 flex flex-col gap-1">
        <div className="flex-[2] bg-gray-200 rounded-sm"></div>
        <div className="flex-1 flex gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
      </div>
    )},
    { id: '3-small-1-large', name: 'Hero Bottom', slots: 4, render: () => (
      <div className="w-full h-12 flex flex-col gap-1">
        <div className="flex-1 flex gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
        <div className="flex-[2] bg-gray-200 rounded-sm"></div>
      </div>
    )},
    { id: '2-top-3-bottom', name: 'Bento 5', slots: 5, render: () => (
      <div className="w-full h-12 flex flex-col gap-1">
        <div className="flex-1 flex gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
        <div className="flex-1 flex gap-1"><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div><div className="flex-1 bg-gray-200 rounded-sm"></div></div>
      </div>
    )}
  ];

  return (
    <div className="relative group w-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-6 mb-4">
      <div className="absolute top-4 right-4 bg-[#2a2a2a] text-gray-300 rounded-md flex items-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-600 shadow-md">
        <button type="button" onClick={() => onRemove(id)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors cursor-pointer"><MdDelete size={16} /></button>
      </div>
      <h3 className="text-sm font-bold text-gray-700 mb-6 text-center">Select Grid Layout</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {layouts.map(layout => (
          <button key={layout.id} type="button" onClick={() => onSelectLayout(id, layout.id, layout.slots)} className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition bg-white w-full max-w-[120px]">
            <div className="w-full mb-3">{layout.render()}</div>
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide text-center leading-tight">{layout.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const GridBlock = ({ block, onRemove, onUpdateBlock }) => {
  const images = block.images || Array(block.slots).fill('');
  
  const handleUpload = (index, url) => {
    const newImages = [...images];
    newImages[index] = url;
    onUpdateBlock(block.id, { images: newImages });
  };

  const renderSlot = (index, className = '') => {
    if (images[index]) {
      return (
        <div key={index} className={`relative group rounded-xl overflow-hidden shadow-sm bg-gray-100 w-full h-full ${className}`}>
           <div className="absolute top-2 right-2 bg-[#2a2a2a] text-gray-300 rounded-md flex items-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md">
             <button type="button" onClick={() => handleUpload(index, '')} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors cursor-pointer"><MdDelete size={14} /></button>
           </div>
           <img src={images[index]} alt={`Grid slot ${index}`} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      );
    }
    return (
      <div key={index} className={`relative w-full h-full min-h-[150px] border-2 border-dashed border-gray-300 rounded-xl bg-[#fafafa] flex flex-col items-center justify-center hover:bg-gray-50 transition cursor-pointer ${className}`}>
        <MdImage size={24} className="text-gray-300 mb-2" />
        <span className="text-[10px] font-bold text-gray-500 uppercase">Upload</span>
        <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleUpload(index, URL.createObjectURL(e.target.files[0]));
          }
        }} />
      </div>
    );
  };

  const renderLayout = () => {
    switch(block.layout) {
      case '1-col': return <div className="w-full">{renderSlot(0, 'aspect-video')}</div>;
      case '2-col': return <div className="grid grid-cols-2 gap-4 w-full">{renderSlot(0, 'aspect-square')}{renderSlot(1, 'aspect-square')}</div>;
      case '3-col': return <div className="grid grid-cols-3 gap-4 w-full">{renderSlot(0, 'aspect-square')}{renderSlot(1, 'aspect-square')}{renderSlot(2, 'aspect-square')}</div>;
      case '4-col': return <div className="grid grid-cols-4 gap-4 w-full">{renderSlot(0, 'aspect-square')}{renderSlot(1, 'aspect-square')}{renderSlot(2, 'aspect-square')}{renderSlot(3, 'aspect-square')}</div>;
      case '2x2': return <div className="grid grid-cols-2 gap-4 w-full">{renderSlot(0, 'aspect-square')}{renderSlot(1, 'aspect-square')}{renderSlot(2, 'aspect-square')}{renderSlot(3, 'aspect-square')}</div>;
      
      case '1-top-2-bottom': return (
        <div className="flex flex-col gap-4 w-full">
           {renderSlot(0, 'aspect-[2/1]')}
           <div className="grid grid-cols-2 gap-4">{renderSlot(1, 'aspect-[4/3]')}{renderSlot(2, 'aspect-[4/3]')}</div>
        </div>
      );
      case '2-top-1-bottom': return (
        <div className="flex flex-col gap-4 w-full">
           <div className="grid grid-cols-2 gap-4">{renderSlot(0, 'aspect-[4/3]')}{renderSlot(1, 'aspect-[4/3]')}</div>
           {renderSlot(2, 'aspect-[2/1]')}
        </div>
      );
      case '1-left-2-right': return (
        <div className="grid grid-cols-2 gap-4 aspect-[2/1.2] w-full">
           {renderSlot(0, 'h-full')}
           <div className="grid grid-rows-2 gap-4 h-full">{renderSlot(1, 'h-full')}{renderSlot(2, 'h-full')}</div>
        </div>
      );
      case '2-left-1-right': return (
        <div className="grid grid-cols-2 gap-4 aspect-[2/1.2] w-full">
           <div className="grid grid-rows-2 gap-4 h-full">{renderSlot(0, 'h-full')}{renderSlot(1, 'h-full')}</div>
           {renderSlot(2, 'h-full')}
        </div>
      );
      case '1-large-3-small': return (
        <div className="flex flex-col gap-4 w-full">
           {renderSlot(0, 'aspect-[2.5/1]')}
           <div className="grid grid-cols-3 gap-4">{renderSlot(1, 'aspect-square')}{renderSlot(2, 'aspect-square')}{renderSlot(3, 'aspect-square')}</div>
        </div>
      );
      case '3-small-1-large': return (
        <div className="flex flex-col gap-4 w-full">
           <div className="grid grid-cols-3 gap-4">{renderSlot(0, 'aspect-square')}{renderSlot(1, 'aspect-square')}{renderSlot(2, 'aspect-square')}</div>
           {renderSlot(3, 'aspect-[2.5/1]')}
        </div>
      );
      case '2-top-3-bottom': return (
        <div className="flex flex-col gap-4 w-full">
           <div className="grid grid-cols-2 gap-4">{renderSlot(0, 'aspect-[4/3]')}{renderSlot(1, 'aspect-[4/3]')}</div>
           <div className="grid grid-cols-3 gap-4">{renderSlot(2, 'aspect-square')}{renderSlot(3, 'aspect-square')}{renderSlot(4, 'aspect-square')}</div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="relative group mb-4 w-full border border-dashed border-transparent hover:border-gray-200 p-2 rounded-xl transition">
      <div className="absolute -right-2 top-2 bg-[#2a2a2a] text-gray-300 rounded-md flex items-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-600 shadow-md z-20">
        <button type="button" onClick={() => onRemove(block.id)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors cursor-pointer"><MdDelete size={16} /></button>
      </div>
      {renderLayout()}
    </div>
  );
};

const MediaPlaceholder = ({ type, onUpload, onRemove, id }) => {
  return (
    <div className="relative group w-full border-2 border-dashed border-gray-300 rounded-xl bg-[#fafafa] flex flex-col items-center justify-center py-16 mb-4 hover:bg-gray-50 transition cursor-pointer">
      <div className="absolute top-4 right-4 bg-[#2a2a2a] text-gray-300 rounded-md flex items-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-600 shadow-md">
        <button type="button" onClick={() => onRemove(id)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors cursor-pointer"><MdDelete size={16} /></button>
      </div>
      <div className="w-12 h-12 bg-white shadow-sm border border-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
        {type === 'image' && <MdImage size={24} />}
        {type === 'video' && <MdVideoLibrary size={24} />}
        {type === 'grid' && <MdGridView size={24} />}
      </div>
      <p className="text-[14px] font-bold text-gray-700">Click to upload {type === 'grid' ? 'images' : (type === 'video' ? 'video or audio' : type)}</p>
      <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-medium">SVG, PNG, JPG, MP4 OR MP3</p>
      
      <input 
        type="file" 
        accept={type === 'video' ? 'video/*,audio/*' : 'image/*'} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            const mediaType = file.type.startsWith('audio/') ? 'audio' : 'video';
            onUpload(id, url, mediaType);
          }
        }} 
      />
    </div>
  );
};

const MediaBlock = ({ id, type, src, alt, mediaType, onRemove }) => (
  <div className="relative group rounded-xl bg-[#1a1a1a] border border-gray-100 overflow-hidden mb-4 shadow-sm">
    <div className="absolute top-4 right-4 bg-[#2a2a2a] text-gray-300 rounded-md flex items-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-600 shadow-md z-20">
      <button type="button" onClick={() => onRemove(id)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors cursor-pointer"><MdDelete size={16} /></button>
    </div>
    {type === 'video' ? (
      mediaType === 'audio' ? (
        <div className="w-full h-40 flex items-center justify-center bg-gray-900 px-6">
          <audio src={src} controls className="w-full max-w-md" />
        </div>
      ) : (
        <video src={src} controls className="w-full h-auto max-h-[700px] object-contain block bg-black" />
      )
    ) : (
      <img src={src} alt={alt} className="w-full h-auto object-cover block" />
    )}
  </div>
);

const EditorMenu = ({ editor, onRemove, id }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const getHeadingLabel = () => {
    if (editor.isActive('heading', { level: 1 })) return 'H1';
    if (editor.isActive('heading', { level: 2 })) return 'H2';
    if (editor.isActive('heading', { level: 3 })) return 'H3';
    return 'P';
  };

  const currentFont = editor.getAttributes('textStyle').fontFamily || 'Font';
  const currentSize = editor.getAttributes('textStyle').fontSize?.replace('px', '') || 'Size';

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100, placement: 'top-start' }} className="bg-[#2a2a2a] text-gray-300 rounded-md shadow-xl flex items-center text-[10px] font-medium border border-gray-700 p-1 space-x-0.5 relative z-50">
      
      {/* Heading Dropdown */}
      <div className="relative">
        <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => toggleMenu('heading')} className={`flex items-center px-2 py-1.5 hover:bg-gray-700 rounded ${activeMenu === 'heading' ? 'bg-gray-700 text-white' : ''}`}>
          <span className="mr-1 w-3 text-center">{getHeadingLabel()}</span> <MdArrowDropDown size={14} />
        </button>
        {activeMenu === 'heading' && (
          <div className="absolute top-full left-0 mt-1 w-24 bg-[#2a2a2a] border border-gray-600 rounded-md shadow-lg flex flex-col p-1 z-50">
            <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => { editor.chain().focus().setParagraph().run(); setActiveMenu(null); }} className="px-2 py-1.5 hover:bg-gray-700 rounded text-left">Paragraph</button>
            <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => { editor.chain().focus().toggleHeading({ level: 1 }).run(); setActiveMenu(null); }} className="px-2 py-1.5 hover:bg-gray-700 rounded text-left font-bold text-lg">H1</button>
            <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => { editor.chain().focus().toggleHeading({ level: 2 }).run(); setActiveMenu(null); }} className="px-2 py-1.5 hover:bg-gray-700 rounded text-left font-semibold text-base">H2</button>
            <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => { editor.chain().focus().toggleHeading({ level: 3 }).run(); setActiveMenu(null); }} className="px-2 py-1.5 hover:bg-gray-700 rounded text-left font-medium text-sm">H3</button>
          </div>
        )}
      </div>
      <div className="w-px h-4 bg-gray-600 mx-1"></div>

      {/* Font Family Dropdown */}
      <div className="relative">
        <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => toggleMenu('font')} className={`flex items-center px-2 py-1.5 hover:bg-gray-700 rounded ${activeMenu === 'font' ? 'bg-gray-700 text-white' : ''}`}>
          <span className="mr-1 truncate max-w-[50px]">{currentFont}</span> <MdArrowDropDown size={14} />
        </button>
        {activeMenu === 'font' && (
          <div className="absolute top-full left-0 mt-1 w-32 bg-[#2a2a2a] border border-gray-600 rounded-md shadow-lg flex flex-col p-1 z-50">
            {['Inter', 'Poppins', 'Roboto', 'Arial', 'serif'].map(font => (
              <button key={font} type="button" onMouseDown={e => e.preventDefault()} onClick={() => { editor.chain().focus().setFontFamily(font).run(); setActiveMenu(null); }} className="px-2 py-1.5 hover:bg-gray-700 rounded text-left truncate" style={{ fontFamily: font }}>{font}</button>
            ))}
          </div>
        )}
      </div>
      <div className="w-px h-4 bg-gray-600 mx-1"></div>

      {/* Font Size Dropdown */}
      <div className="relative">
        <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => toggleMenu('size')} className={`flex items-center px-2 py-1.5 hover:bg-gray-700 rounded ${activeMenu === 'size' ? 'bg-gray-700 text-white' : ''}`}>
          <span className="mr-1 w-4 text-center">{currentSize}</span> <MdArrowDropDown size={14} />
        </button>
        {activeMenu === 'size' && (
          <div className="absolute top-full left-0 mt-1 w-16 bg-[#2a2a2a] border border-gray-600 rounded-md shadow-lg flex flex-col p-1 z-50 max-h-40 overflow-y-auto">
            {['12', '14', '16', '18', '20', '24', '30', '36', '40', '48', '60'].map(size => (
              <button key={size} type="button" onMouseDown={e => e.preventDefault()} onClick={() => { editor.chain().focus().setFontSize(`${size}px`).run(); setActiveMenu(null); }} className="px-2 py-1 hover:bg-gray-700 rounded text-left">{size}</button>
            ))}
          </div>
        )}
      </div>
      <div className="w-px h-4 bg-gray-600 mx-1"></div>
      
      {/* Formatting Icons */}
      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 hover:bg-gray-700 rounded ${editor.isActive('bold') ? 'text-white bg-gray-700' : ''}`}><MdFormatBold size={14} /></button>
      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 hover:bg-gray-700 rounded ${editor.isActive('italic') ? 'text-white bg-gray-700' : ''}`}><MdFormatItalic size={14} /></button>
      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-1.5 hover:bg-gray-700 rounded ${editor.isActive('strike') ? 'text-white bg-gray-700' : ''}`}><MdFormatStrikethrough size={14} /></button>
      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-1.5 hover:bg-gray-700 rounded ${editor.isActive('underline') ? 'text-white bg-gray-700' : ''}`}><MdFormatUnderlined size={14} /></button>
      <div className="w-px h-4 bg-gray-600 mx-1"></div>
      
      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-1.5 hover:bg-gray-700 rounded flex space-x-0.5 items-center ${editor.isActive({ textAlign: 'left' }) ? 'text-white bg-gray-700' : ''}`}>
        <MdFormatAlignLeft size={14} />
      </button>
      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-1.5 hover:bg-gray-700 rounded flex space-x-0.5 items-center ${editor.isActive({ textAlign: 'center' }) ? 'text-white bg-gray-700' : ''}`}>
        <MdFormatAlignCenter size={14} />
      </button>
      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-1.5 hover:bg-gray-700 rounded flex space-x-0.5 items-center ${editor.isActive({ textAlign: 'right' }) ? 'text-white bg-gray-700' : ''}`}>
        <MdFormatAlignRight size={14} />
      </button>
      
      <div className="w-px h-4 bg-gray-600 mx-1"></div>
      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => {
        const url = window.prompt('Enter URL:');
        if (url) editor.chain().focus().setLink({ href: url }).run();
        else if (url === '') editor.chain().focus().unsetLink().run();
      }} className={`p-1.5 hover:bg-gray-700 rounded ${editor.isActive('link') ? 'text-white bg-gray-700' : ''}`}><MdLink size={14} /></button>
      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => onRemove(id)} className="p-1.5 hover:bg-gray-700 rounded text-red-400 cursor-pointer"><MdDelete size={14} /></button>
    </BubbleMenu>
  );
};

const TextBlock = ({ id, onRemove }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-orange-500 underline' } }),
      TextStyle,
      FontFamily,
      FontSize,
    ],
    content: `
      <h2 style="font-family: Poppins; font-size: 40px">About MakTech</h2>
      <p>MakTech is a creative digital agency dedicated to helping businesses grow through innovative design and technology solutions. We specialize in Graphic Design, UI/UX Design, Web Development, App Development, Video Editing, and digital branding services that help companies build a strong and impactful online presence.</p>
      <p>Our team combines creativity, strategy, and technical expertise to deliver solutions that are not only visually engaging but also focused on performance and business growth. From startups to established brands, we work closely with our clients to transform ideas into meaningful digital experiences.</p>
      <p>At MakTech, our mission is to create high-quality digital products that drive results, strengthen brands, and help businesses succeed in an increasingly competitive digital landscape.</p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-sm lg:prose-base focus:outline-none min-h-[150px] py-4 bg-transparent text-gray-800',
      },
    },
  });

  return (
    <div className="relative group bg-white border border-dashed border-[#ff6533]/40 p-4 mb-4 mt-2">
      <style>{EDITOR_STYLES}</style>
      {editor && <EditorMenu editor={editor} onRemove={onRemove} id={id} />}
      <div className="">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export const AssetBuilder = ({ blocks, onRemove, onUpdateBlock, onAdd }) => {
  return (
    <div className="flex-1 w-full max-w-[1400px]">
      <label className="block text-sm font-medium text-gray-600 mb-2">Attach your assets<span className="text-[#ff6533] ml-0.5">*</span></label>
      
      <div className="w-full flex flex-col">
        {blocks.length === 0 && (
          <div className="flex flex-wrap items-center justify-center gap-8 py-24 bg-[#fafafa] rounded-xl border border-gray-100">
            <button type="button" onClick={() => onAdd('image')} className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-full bg-[#fff4f0] text-[#ff6533] flex items-center justify-center group-hover:bg-[#ffe5dc] transition-colors cursor-pointer">
                <MdImage size={24} />
              </div>
              <span className="text-[12px] font-medium text-gray-800">Image</span>
            </button>
            <button type="button" onClick={() => onAdd('text')} className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-full bg-[#fff4f0] text-[#ff6533] flex items-center justify-center group-hover:bg-[#ffe5dc] transition-colors cursor-pointer">
                <MdTextFields size={24} />
              </div>
              <span className="text-[12px] font-medium text-gray-800">Text</span>
            </button>
            <button type="button" onClick={() => onAdd('grid')} className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-full bg-[#fff4f0] text-[#ff6533] flex items-center justify-center group-hover:bg-[#ffe5dc] transition-colors cursor-pointer">
                <MdGridView size={24} />
              </div>
              <span className="text-[12px] font-medium text-gray-800">Photo Grid</span>
            </button>
            <button type="button" onClick={() => onAdd('video')} className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-full bg-[#fff4f0] text-[#ff6533] flex items-center justify-center group-hover:bg-[#ffe5dc] transition-colors cursor-pointer">
                <MdVideoLibrary size={24} />
              </div>
              <span className="text-[12px] font-medium text-gray-800">Video & Audio</span>
            </button>
          </div>
        )}

        {blocks.map(block => {
          if (block.type === 'grid') {
            if (!block.layout) {
              return <GridSelector key={block.id} id={block.id} onRemove={onRemove} onSelectLayout={(id, layout, slots) => onUpdateBlock(id, { layout, slots, images: Array(slots).fill('') })} />;
            }
            return <GridBlock key={block.id} block={block} onRemove={onRemove} onUpdateBlock={onUpdateBlock} />;
          }
          if (['image', 'video'].includes(block.type) && !block.src) {
             return <MediaPlaceholder key={block.id} id={block.id} type={block.type} onRemove={onRemove} onUpload={(id, url, mediaType) => onUpdateBlock(id, { src: url, mediaType })} />;
          }
          if (['image', 'video'].includes(block.type) && block.src) {
            return <MediaBlock key={block.id} id={block.id} type={block.type} src={block.src} alt={block.type} mediaType={block.mediaType} onRemove={onRemove} />;
          }
          if (block.type === 'text') {
            return <TextBlock key={block.id} id={block.id} onRemove={onRemove} />;
          }
          if (block.type === 'thanks') {
            return (
              <div key={block.id} className="relative group rounded-xl bg-gradient-to-br from-[#1a1a1a] via-[#2a1a1a] to-[#4a1a00] border border-gray-100 overflow-hidden mb-4 shadow-sm flex items-center justify-center py-24">
                <div className="absolute top-4 right-4 bg-[#2a2a2a] text-gray-300 rounded-md flex items-center opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-gray-600 shadow-md">
                  <button type="button" onClick={() => onRemove(block.id)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors cursor-pointer"><MdDelete size={16} /></button>
                </div>
                <div className="text-center">
                  <h2 className="text-white text-3xl font-light tracking-widest border-b border-white/20 pb-2 mb-2 uppercase">Thanks <span className="text-sm align-middle tracking-normal italic mx-2 lowercase">for</span></h2>
                  <h1 className="text-white text-5xl font-bold tracking-[0.2em] uppercase">Watching</h1>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
