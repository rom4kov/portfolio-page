import { useState, SetStateAction, useRef, Dispatch } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

type TextContentProps = {
  setTextContent: Dispatch<SetStateAction<string>>;
  initialValue: string;
};

const TextEditor = ({ setTextContent, initialValue }: TextContentProps) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [value, setValue] = useState<string>(initialValue);
  const tinymceScriptSrc = process.env.REACT_APP_FLASK_ENV === 'development'
    ? '../../public/tinymce/tinymce.min.js'
    : '/tinymce/tinymce.min.js';

  return (
    <>
      <Editor
        value={value}
        tinymceScriptSrc={tinymceScriptSrc}
        licenseKey="gpl"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        onEditorChange={(newValue, editor) => {
          setValue(newValue);
          setTextContent(editor.getContent());
        }}
        init={{
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          skin: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "oxide-dark"
            : "oxide",
          content_css: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "default",
        }}
      />
    </>
  );
};

export default TextEditor;
