// import React, { useState } from "react";
// import { Editor, EditorState } from "draft-js";
// import "draft-js/dist/Draft.css";

// import { EditorState, RichUtils, getDefaultKeyBinding, Editor } from "draft-js";
// import React from "react";
// import "draft-js/dist/Draft.css";
// import "./basic.css";

// const DraftEditor = () => {
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );

//   const handleChange = (newEditorState: EditorState) => {
//     setEditorState(newEditorState);
//   };

//   return (
//     <div className="editor-container">
//       <Editor editorState={editorState} onChange={handleChange} />
//     </div>
//   );
// };

// export default DraftEditor;

// import React, { useCallback, useMemo, useRef, useState } from "react";
// import {
//   Editor,
//   EditorState,
//   RichUtils,
//   convertToRaw,
//   convertFromRaw,
// } from "draft-js";
// import "draft-js/dist/Draft.css";

// const GutenbergEditor = () => {
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );
//   const editorRef = useRef<Editor | null>(null);

//   const handleEditorChange = (newEditorState: EditorState) => {
//     setEditorState(newEditorState);
//   };

//   const handleBoldClick = () => {
//     handleInlineStyleToggle("BOLD");
//   };

//   const handleItalicClick = () => {
//     handleInlineStyleToggle("ITALIC");
//   };

//   const handleHeadingOneClick = () => {
//     handleBlockTypeToggle("header-one");
//   };

//   const handleHeadingTwoClick = () => {
//     handleBlockTypeToggle("header-two");
//   };

//   const handleBlockTypeToggle = (blockType: string) => {
//     setEditorState(RichUtils.toggleBlockType(editorState, blockType));
//   };

//   const handleInlineStyleToggle = (inlineStyle: string) => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
//   };

//   const handleSaveClick = () => {
//     const contentState = editorState.getCurrentContent();
//     const rawContentState = convertToRaw(contentState);
//     console.log(rawContentState); // Vous pouvez utiliser rawContentState pour enregistrer le contenu dans votre backend
//   };

//   const renderBlockStyleButton = useCallback(
//     (label: string, blockType: string) => {
//       const currentBlockType = RichUtils.getCurrentBlockType(editorState);
//       const isActive = currentBlockType === blockType;

//       return (
//         <button
//           className={`block-style-button ${isActive ? "active" : ""}`}
//           onClick={() => handleBlockTypeToggle(blockType)}
//         >
//           {label}
//         </button>
//       );
//     },
//     []
//   );

//   const renderInlineStyleButton = useCallback(
//     (label: string, inlineStyle: string) => {
//       const currentInlineStyle = editorState.getCurrentInlineStyle();
//       const isActive = currentInlineStyle.has(inlineStyle);

//       return (
//         <button
//           className={`inline-style-button ${isActive ? "active" : ""}`}
//           onClick={() => handleInlineStyleToggle(inlineStyle)}
//         >
//           {label}
//         </button>
//       );
//     },
//     []
//   );

//   const focusEditor = () => {
//     editorRef.current?.focus();
//   };

//   return (
//     <div className="editor-container" onClick={focusEditor}>
//       <div className="editor-toolbar">
//         {renderBlockStyleButton("H1", "header-one")}
//         {renderBlockStyleButton("H2", "header-two")}
//         {renderInlineStyleButton("B", "BOLD")}
//         {renderInlineStyleButton("I", "ITALIC")}
//         <button onClick={handleSaveClick}>Save</button>
//       </div>
//       <Editor
//         ref={editorRef}
//         editorState={editorState}
//         onChange={handleEditorChange}
//       />
//     </div>
//   );
// };

// export default GutenbergEditor;

// class RichEditorExample extends React.Component {
//   constructor(props: {} | Readonly<{}>) {
//     super(props);
//     this.state = { editorState: EditorState.createEmpty() };

//     this.focus = () => this.refs.editor.focus();
//     this.onChange = (editorState) => this.setState({ editorState });

//     this.handleKeyCommand = this._handleKeyCommand.bind(this);
//     this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
//     this.toggleBlockType = this._toggleBlockType.bind(this);
//     this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
//   }

//   _handleKeyCommand(command, editorState) {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       this.onChange(newState);
//       return true;
//     }
//     return false;
//   }

//   _mapKeyToEditorCommand(e) {
//     if (e.keyCode === 9 /* TAB */) {
//       const newEditorState = RichUtils.onTab(
//         e,
//         this.state.editorState,
//         4 /* maxDepth */
//       );
//       if (newEditorState !== this.state.editorState) {
//         this.onChange(newEditorState);
//       }
//       return;
//     }
//     return getDefaultKeyBinding(e);
//   }

//   _toggleBlockType(blockType) {
//     this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
//   }

//   _toggleInlineStyle(inlineStyle) {
//     this.onChange(
//       RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
//     );
//   }

//   render() {
//     const { editorState } = this.state;

//     // If the user changes block type before entering any text, we can
//     // either style the placeholder or hide it. Let's just hide it now.
//     let className = "RichEditor-editor";
//     var contentState = editorState.getCurrentContent();
//     if (!contentState.hasText()) {
//       if (contentState.getBlockMap().first().getType() !== "unstyled") {
//         className += " RichEditor-hidePlaceholder";
//       }
//     }

//     return (
//       <div className="RichEditor-root">
//         <BlockStyleControls
//           editorState={editorState}
//           onToggle={this.toggleBlockType}
//         />
//         <InlineStyleControls
//           editorState={editorState}
//           onToggle={this.toggleInlineStyle}
//         />
//         <div className={className} onClick={this.focus}>
//           <Editor
//             blockStyleFn={getBlockStyle}
//             customStyleMap={styleMap}
//             editorState={editorState}
//             handleKeyCommand={this.handleKeyCommand}
//             keyBindingFn={this.mapKeyToEditorCommand}
//             onChange={this.onChange}
//             placeholder="Tell a story..."
//             ref="editor"
//             spellCheck={true}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// // Custom overrides for "code" style.
// const styleMap = {
//   CODE: {
//     backgroundColor: "rgba(0, 0, 0, 0.05)",
//     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//     fontSize: 16,
//     padding: 2,
//   },
// };

// function getBlockStyle(block) {
//   switch (block.getType()) {
//     case "blockquote":
//       return "RichEditor-blockquote";
//     default:
//       return null;
//   }
// }

// class StyleButton extends React.Component {
//   constructor() {
//     super();
//     this.onToggle = (e) => {
//       e.preventDefault();
//       this.props.onToggle(this.props.style);
//     };
//   }

//   render() {
//     let className = "RichEditor-styleButton";
//     if (this.props.active) {
//       className += " RichEditor-activeButton";
//     }

//     return (
//       <span className={className} onMouseDown={this.onToggle}>
//         {this.props.label}
//       </span>
//     );
//   }
// }

// const BLOCK_TYPES = [
//   { label: "H1", style: "header-one" },
//   { label: "H2", style: "header-two" },
//   { label: "H3", style: "header-three" },
//   { label: "H4", style: "header-four" },
//   { label: "H5", style: "header-five" },
//   { label: "H6", style: "header-six" },
//   { label: "Blockquote", style: "blockquote" },
//   { label: "UL", style: "unordered-list-item" },
//   { label: "OL", style: "ordered-list-item" },
//   { label: "Code Block", style: "code-block" },
// ];

// const BlockStyleControls = (props) => {
//   const { editorState } = props;
//   const selection = editorState.getSelection();
//   const blockType = editorState
//     .getCurrentContent()
//     .getBlockForKey(selection.getStartKey())
//     .getType();

//   return (
//     <div className="RichEditor-controls">
//       {BLOCK_TYPES.map((type) => (
//         <StyleButton
//           key={type.label}
//           active={type.style === blockType}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       ))}
//     </div>
//   );
// };

// var INLINE_STYLES = [
//   { label: "Bold", style: "BOLD" },
//   { label: "Italic", style: "ITALIC" },
//   { label: "Underline", style: "UNDERLINE" },
//   { label: "Monospace", style: "CODE" },
// ];

// const InlineStyleControls = (props) => {
//   const currentStyle = props.editorState.getCurrentInlineStyle();

//   return (
//     <div className="RichEditor-controls">
//       {INLINE_STYLES.map((type) => (
//         <StyleButton
//           key={type.label}
//           active={currentStyle.has(type.style)}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       ))}
//     </div>
//   );
// };

// export default RichEditorExample;
