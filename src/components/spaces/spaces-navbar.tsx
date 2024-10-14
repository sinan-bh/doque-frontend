import AddPeople from "./add-people";
import MembersAvatars from "./members-avatars";
import SpacesMenu from "./spaces-dropdown";

export default function Navbar() {
  return (
    <div className="flex rounded-md justify-between h-12 shadow-sm bg-white px-4 items-center">
      <div className="flex items-center">
        <SpacesMenu />
      </div>
      <div className="flex gap-4">
        <AddPeople />
        <MembersAvatars />
      </div>
    </div>
  );
}
