import { getFirestore, doc, setDoc, getDoc} from "firebase/firestore"; 

const db = getFirestore();

export const addUserToFirestore = async (
  userId: string, 
  userData: { name: string; email: string; role: string; approved: boolean }
) => {
  try {
    await setDoc(doc(db, "users", userId), userData);
    console.log("User data added to Firestore successfully.");
  } catch (error) {
    console.error("Error adding user data to Firestore:", error);
  }
};

export const getUserApprovalStatus = async (userId: string): Promise<boolean> => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData?.approved === true;
      } else {
        console.error("No user document found");
        return false;
      }
    } catch (error) {
      console.error("Error fetching user approval status:", error);
      return false;
    }
  };

  export const getUserApprovalStatusAndRole = async (userId: string): Promise<{ isApproved: boolean; role: string }> => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          isApproved: userData?.approved === true,
          role: userData?.role || "",
        };
      } else {
        console.error("No user document found");
        return { isApproved: false, role: "" };
      }
    } catch (error) {
      console.error("Error fetching user approval status and role:", error);
      return { isApproved: false, role: "" };
    }
  };

  export const fetchUserData = async (userId: string) => {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("User data not found");
    }
  };
  