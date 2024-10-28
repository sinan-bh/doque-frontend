import NavbarBoarderList from "@/components/task-list/navbar-boarder-list";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="p-4">
        <NavbarBoarderList />
        {children}
      </div>
    );
  }