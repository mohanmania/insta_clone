// // import { create } from "zustand";
// // import { db } from "../firebase/firebase";
// // import { doc, getDoc } from "firebase/firestore";

// // export const useUserStore = create((set) => ({
  
// //   currentUser: null,
// //   isLoading:true,
// //   fetchUserInfo: async (uid) => {
// //     if (!uid) {
// //       console.log("No UID provided, resetting currentUser to null");
// //       return set({ currentUser: null ,isLoading:false});
      
// //     }
    
// //     try {
       
// //       // console.log(`Fetching user info for UID: ${uid}`);
// //       const docRef = doc(db, "usersdetails", uid);
// //       const docSnap = await getDoc(docRef);
// //     //   console.log("docSnap",docSnap)
// //       if (docSnap.exists()) {
// //         // console.log("Fetched User Data:", docSnap.data());
// //         set({ currentUser: docSnap.data(),isLoading:false });
// //         // console.log("::::",docSnap.data().id)
// //       } else {
// //         console.log("No user found for UID:", uid);
// //         set({ currentUser: null,isLoading:false });

// //       }
      
// //     } catch (err) {
// //       console.error("Error fetching user info:", err);
// //       set({ currentUser: null });
// //     }
// //   }
 
// // }));


// // import { doc, getDoc } from "firebase/firestore";
// // import { create } from "zustand";
// // import { db } from "../firebase/firebase";

// // export const useUserStore = create((set) => ({
// //     currentUser: null,
// //     isLoading: true,
// //     fetchUserInfo: async (uid) => {
// //         if (!uid) return set({ currentUser: null, isLoading: false });
        
// //         try {
// //             const docRef = doc(db, "userdetails", uid);
// //             const docSnap = await getDoc(docRef);
            
// //             if (docSnap.exists()) {
// //                 set({ currentUser: docSnap.data(), isLoading: false });
// //             } else {
// //                 set({ currentUser: null, isLoading: false });
// //             }
// //         } catch (err) {
// //             console.error("Error fetching user info:", err);
// //             set({ currentUser: null, isLoading: false });
// //         }
// //     }
// // }));





// import { create } from "zustand";
// import { db } from "../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";

// export const useUserStore = create((set) => ({
  
//   currentUser: null,
//   isLoading:true,
//   fetchUserInfo: async (uid) => {
//     if (!uid) {
//       console.log("No UID provided, resetting currentUser to null");
//       return set({ currentUser: null ,isLoading:false});
      
//     }
    
//     try {
//       // console.log(`Fetching user info for UID: ${uid}`);
//       const docRef = doc(db, "usersdetails", uid);
//       const docSnap = await getDoc(docRef);
//       console.log("docSnap",docSnap)
//       if (docSnap.exists()) {
//         console.log("Fetched User Data:", docSnap.data());
//         set({ currentUser: docSnap.data().id,isLoading:false });
//         console.log("::::",docSnap.data().id)
//       } else {
//         console.log("No user found for UID:", uid);
//         set({ currentUser: null,isLoading:false });

//       }
      
//     } catch (err) {
//       console.error("Error fetching user info:", err);
//       set({ currentUser: null });
//     }
//   }
 
// }));


// useStore.js
import {create} from "zustand";

const useUserStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));

export default useUserStore;
