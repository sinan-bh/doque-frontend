import NavbarBoarderList from "@/components/task-list/navbar-boarder-list";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavbarBoarderList />
      {children}
    </div>
  );
}
