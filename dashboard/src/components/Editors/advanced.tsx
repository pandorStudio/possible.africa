import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const CustomAdvancedEditor: React.FC<{content?: string}> = ({content}) => {
    const [editorContent, setEditorContent] = useState(content ? content : "");

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    };
    
    return (
      <ReactQuill
        style={{ height: "500px", width: "100%" }}
        modules={modules}
        onChange={setEditorContent}
        theme="snow"
        placeholder="Placez votre contenu ici..."
      />
    );
 };