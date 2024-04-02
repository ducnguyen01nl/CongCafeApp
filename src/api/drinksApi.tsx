import firestore from '@react-native-firebase/firestore'
import ToastService from '../service/ToastService'
import storage from '@react-native-firebase/storage'
import ToastMessage from '../components/ToastMessage'
import { AppLang } from '../assets/languages'

export const drinksApi = {
    addNewDrinks: async (params: any) => {
        try {
            const docRef = await firestore().collection('items').add(params)
            const idNewItem = docRef.id;
            await docRef.update({ id: idNewItem })
            console.log('thêm thành công', docRef.id);
            ToastService.showToast(AppLang('them_moi_mat_hang_thanh_cong'),0)

        } catch (error) {
            console.log(error);

        }
    },
    updateDrinks: async(id:string,params:any) =>{
        await firestore()
        .collection('items')
        .doc(id)  
        .update(params)
        .then(() =>{
          console.log('success');
          ToastService.showToast(AppLang('cap_nhat_mat_hang_thanh_cong'),0)
        })
        .catch((error) =>{
          console.log(error);
          
        })
    },
    updateFile: async (url: any, name: any) => {
        const reference = storage().ref(`drinks/${name}`);
        console.log('reference', reference);
        try {
            await reference.putFile(url);
            return reference.getDownloadURL()
        } catch (error) {
            console.log(error);

        }
    },
    getListDrinks: async () => {
        try {
            const listDrinks: any[] = []
            await firestore()
                .collection('items')
                .get()
                .then((querysnapshot: any) => {
                    querysnapshot.forEach((documentSnapshot: any) => {
                        listDrinks.push(documentSnapshot.data())
                    })
                })
            return listDrinks
        } catch (error) {
            console.log(error);

        }
    },

    getItemDrink: async (idItem: string) => {
        try {
            const documentSnapshot = await firestore()
                .collection('items')
                .doc(idItem)
                .get();
            if (documentSnapshot.exists) {
                const item = documentSnapshot.data();
                return item;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);

        }
    },
    deleteItemDrink: async(id:string) =>{
        firestore()
        .collection('items')
        .doc(id)
        .delete()
        .then(() =>{
            ToastService.showToast(AppLang('xoa_thanh_cong'),0)
        })
        .catch((error) =>{
            console.log(error);
            
        })
    }


}