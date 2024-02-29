import { getDocs, query, where } from "firebase/firestore"
import { userRef } from "../firebase/firebaseConfig"
import storage from '@react-native-firebase/storage'

export const userApi = {
    getUserInfoByUid: async(params:any) => {
        const q = query(userRef,where('uid','==',params))
        const querySnapshot = await getDocs(q)
        // querySnapshot.forEach((doc) =>{
            if(!querySnapshot.empty){
                const userData =  querySnapshot.docs[0].data();                
                return userData
            }
        // })
        
    },
    getUserInfoById: async(params:any) => {        
        try {
            const q = query(userRef, where('user_id', '==', params));
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.size > 0) {
                const doc = querySnapshot.docs[0];
                const userData = doc.data();
                const image =  await storage().ref(`user/${userData?.img}`).getDownloadURL()
                return {...userData,imgUrl:image};
            } else {
                console.log('User not found');
                return null; // or throw an error, depending on your needs
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error; // Propagate the error to the caller
        }
    
        
    }
}