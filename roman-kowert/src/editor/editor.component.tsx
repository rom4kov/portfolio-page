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
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  return (
    <>
      <Editor
        value={value}
        tinymceScriptSrc="../../public/tinymce/tinymce.min.js"
        licenseKey="your-license-key"
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
