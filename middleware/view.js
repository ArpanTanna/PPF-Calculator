import firebase from 'firebase';

export default async function({ params, app, store, redirect }) {
    /*try {
        debugger;
        let messageRef = app.$fireStore.collection('records').doc(params.id)
        let messageDoc = await messageRef.get();
        // console.log(messageDoc)
        if(messageDoc.exists) {
            store.commit('setRecord', params.id);
            //localStorage.setItem("record", context.params.id);
            app.router.push('/');
            // redirect('/')
            return redirect('/');
        }else {
            console.log('Id is wrong');
        }
    } catch (e) {
        console.log(1233);
        console.log(e);
    }*/

}
