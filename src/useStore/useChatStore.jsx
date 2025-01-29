// import { create } from "zustand";
// import { db } from "../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useUserStore } from "./userstore";

// export const UseChatStore = create((set) => ({
//   chatId: null,
//   user: null,
//   isCurrentUserBlocked: false,
//   isRecevierBlocked: false,
  
//   changeChat: (chatId, user) => {
//     console.log(chatId)
//     console.log("Changing chatId:", chatId); 
//     const currentUser = useUserStore.getState().currentUser;
//     console.log("current:",currentUser)
//     if (user.blocked.includes(currentUser.id)) {

//       return set({
//         chatId,
//         user: null,
//         isCurrentUserBlocked: true,
//         isRecevierBlocked: false,
//       });
      
//     } else if (currentUser.blocked.includes(currentUser.id)) {
//       return set({
//         chatId,
//         user,
//         isCurrentUserBlocked: false,
//         isRecevierBlocked: true,
//       });
//     } else {
//       set({
//         chatId,
//         user,
//         isCurrentUserBlocked: false,
//         isRecevierBlocked: false,
//       });
//     }
//   },
 
// }));


// import { db } from "../../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useUser} from "../../useStore/userstore";


// const getUserByUID = async (uid) => {
//   const { currentUser } = useUser();
//   try {
//     const userRef = doc(db, "Roomchatusers", currentUser.uid ); // Assuming users are stored in a "users" collection
//     const userSnap = await getDoc(userRef);

//     if (userSnap.exists()) {
//       console.log("User Data:", userSnap.data());
//       return userSnap.data();
//     } else {
//       console.log("No user found!");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return null;
//   }
// };

// // Call function with a specific UID
// getUserByUID(currentUser.uid);
