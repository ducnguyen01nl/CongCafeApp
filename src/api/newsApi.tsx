import firestore from '@react-native-firebase/firestore'
import ToastService from '../service/ToastService'
import storage from '@react-native-firebase/storage'
import ToastMessage from '../components/ToastMessage'
import { AppLang } from '../assets/languages'

export const newsApi = {
    addNews: async (params: any) => {
        try {
            const docRef = await firestore().collection('news').add(params)
            const idNewItem = docRef.id;
            await docRef.update({ id: idNewItem })
            console.log('thêm thành công', docRef.id);
            ToastService.showToast(AppLang('them_moi_bai_viet_thanh_cong'),0)

        } catch (error) {
            console.log(error);

        }
    },
    updateNews: async(id:string,params:any) =>{
        await firestore()
        .collection('news')
        .doc(id)  
        .update(params)
        .then(() =>{
          console.log('success');
          ToastService.showToast(AppLang('cap_nhat_bai_viet_thanh_cong'),0)
        })
        .catch((error) =>{
          console.log(error);
          
        })
    },
    updateFileNews: async (url: any, name: any) => {
        const reference = storage().ref(`news/${name}`);
        try {
            await reference.putFile(url);
            return reference.getDownloadURL()
        } catch (error) {
            console.log(error);

        }
    },
    getListNews: async() =>{
        try {
            const listNews: any[] = []
            await firestore()
                .collection('news')
                .get()
                .then((querysnapshot: any) => {
                    querysnapshot.forEach((documentSnapshot: any) => {
                        listNews.push(documentSnapshot.data())
                    })
                })
            return listNews
        } catch (error) {
            console.log(error);

        }
    },
    deleteItemNews: async(id:string) =>{
        firestore()
        .collection('news')
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