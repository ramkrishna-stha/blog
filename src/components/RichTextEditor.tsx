"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useCallback } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc pl-6" } },
        orderedList: { HTMLAttributes: { class: "list-decimal pl-6" } },
      }),
      Link.configure({ openOnClick: false }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none min-h-[420px] px-6 py-5 focus:outline-none bg-white dark:bg-zinc-900 text-[15px] leading-relaxed",
      },
    },
  });

  const addLink = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  return (
    <div className="border border-gray-200 dark:border-zinc-700 rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-white p-3 flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
            editor?.isActive("bold")
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-200 dark:hover:text-[#008080]"
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
            editor?.isActive("italic")
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-200 dark:hover:text-[#008080]"
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
            editor?.isActive("heading", { level: 2 })
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-200 dark:hover:text-[#008080]"
          }`}
        >
          Heading 2
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
            editor?.isActive("bulletList")
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-200 dark:hover:text-[#008080]"
          }`}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={addLink}
          className="px-4 py-1.5 rounded-xl text-sm font-medium hover:bg-gray-200 dark:dark:hover:text-[#008080]"
        >
          Link
        </button>
      </div>

      <EditorContent editor={editor} className="text-white" />
    </div>
  );
}
