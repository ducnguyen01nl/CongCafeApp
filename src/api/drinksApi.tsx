import firestore from '@react-native-firebase/firestore'
import ToastService from '../service/ToastService'

export const drinksApi = {
    addNewDrinks: async (params: any) => {
        try {
            const docRef = await firestore().collection('items').add(params)
            const idNewItem = docRef.id;
            await docRef.update({ id: idNewItem })
            console.log('thêm thành công', docRef.id);

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
    }


}