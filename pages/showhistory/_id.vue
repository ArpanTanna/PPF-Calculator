<template>

</template>

<script>
    import { mapState } from 'vuex';

    export default {
        //middleware: 'view',
        computed: mapState([
            'getRecord'
        ]),
        async asyncData({app, store, params, router}) {
            /*let messageRef = app.$fireStore.collection('records').doc(params.id)
            let messageDoc = await messageRef.get();
            // console.log(messageDoc)
            if(messageDoc.exists) {
                store.commit('setRecord', params.id);
                //localStorage.setItem("record", context.params.id);
                console.log(app.router);
                //app.router.push('/');
                //redirect('/')
                //return redirect('/');
            }else {
                console.log('Id is wrong');
            }*/
            //return;
        },
        methods: {
            async checkred() {
                let params = this.$route.params;
                this.$store.commit('setRecord', params.id);
                this.$router.push('/');
            }
        },
        mounted() {
            this.checkred();
            //console.log(this.$store.state.record);
            //console.log(this.$store.getters.getRecord);
        }
    }
</script>
