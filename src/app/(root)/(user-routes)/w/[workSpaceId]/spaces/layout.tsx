import Navbar from "@/components/spaces/spaces-navbar";
import BoardsProvider from "@/contexts/boards-context";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4">
      <BoardsProvider>
        <Navbar />
        {children}
      </BoardsProvider>
    </div>
  );
}
