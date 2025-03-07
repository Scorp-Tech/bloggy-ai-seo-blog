import TailwindAdvancedEditor from '@/components/novel_editor/advanced-editor'; // Import it normally

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 py-4 sm:px-5">
      <h1 className="mb-4">Novel Editor</h1>
      <TailwindAdvancedEditor />
    </div>
  );
}
