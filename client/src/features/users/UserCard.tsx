import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UserCard = () => {
  const [isFollow, setIsFollow] = useState<boolean>(false);

  const handleFollow = () => {
    setIsFollow((pre) => !pre);
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-secondary/40 p-1.5 transition-colors duration-300 hover:bg-secondary/70">
      <div className="flex items-center gap-x-2">
        <Link to="/explore">
          <Avatar>
            <AvatarImage />
            <AvatarFallback fullName="Isitha Sathsara" />
          </Avatar>
        </Link>
        <div className="pointer-events-none select-none">
          <h1 className="text-sm">Isitha Sathsara</h1>
          <p className="flex items-center gap-2 text-xs font-extralight text-muted-foreground">
            <span>Likes</span>
            <span>2</span>
          </p>
        </div>
      </div>
      <Button size="sm" className="h-max p-2 text-xs" onClick={handleFollow}>
        {isFollow ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

export default UserCard;
