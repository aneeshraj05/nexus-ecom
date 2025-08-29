"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const SaveUser = () => {
  const { user } = useUser();

  useEffect(() => {
    const saveUserToDB = async () => {
      if (!user) return;

      try {
        await fetch("/api/users/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            name: user.firstName + " " + user.lastName,
            email: user.primaryEmailAddress?.emailAddress,
            imageUrl: user.profileImageUrl,
          }),
        });
      } catch (err) {
        console.error("Failed to save user:", err);
      }
    };

    saveUserToDB();
  }, [user]);

  return null;
};

export default SaveUser;
