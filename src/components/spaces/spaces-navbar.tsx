import MembersAvatars from "./members-avatars";
import SpacesMenu from "./spaces-dropdown";

export default function Navbar() {
  return (
    <div className="flex rounded-md justify-between h-12 shadow-sm bg-white px-4 items-center dark:bg-darkBg ">
      <div className="flex items-center">
        <SpacesMenu />
      </div>
      <div className="flex gap-4">
        <MembersAvatars />
      </div>
    </div>
  );
}
