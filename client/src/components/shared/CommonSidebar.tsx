import UserCard from "@/features/users/UserCard";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CommonSidebar = () => {
  return (
    <aside className="sticky left-0 top-0 flex h-screen w-[272px] flex-col border-l-2 border-border bg-background px-2 pb-2 pt-4 max-lg:hidden">
      <div className="flex flex-col items-center justify-center">
        <Avatar className="h-24 w-24">
          <AvatarImage />
          <AvatarFallback fullName="Isitha Sathsara" className="text-3xl" />
        </Avatar>
        <div className="mt-2 text-center">
          <h1 className="text-xl font-semibold">Isitha Sathsara</h1>
          <h1 className="text-sm font-light text-muted-foreground">
            isitha_sathsara
          </h1>
        </div>
        <div className="mt-4 flex items-center divide-x">
          <div className="space-y-1 px-4 text-center">
            <p>2.4k</p>
            <p className="text-xs text-muted-foreground">Followings</p>
          </div>
          <div className="space-y-1 px-4 text-center">
            <p>1.8k</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="space-y-1 px-4 text-center">
            <p>5.2k</p>
            <p className="text-xs text-muted-foreground">Likes</p>
          </div>
        </div>
      </div>
      <p className="mt-6 text-sm font-semibold">Suggestions</p>
      <div className="hide-scrollbar mt-2 flex-1 space-y-2 overflow-y-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
          <UserCard key={index} />
        ))}
      </div>
    </aside>
  );
};

export default CommonSidebar;
