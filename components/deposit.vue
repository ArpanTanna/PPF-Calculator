<template>
    <div class="row clearfix">
        <div class="col-md-6">
            <div class="form-group">
                <datepicker placeholder="Select Date" input-class="form-control" v-model="record.date"></datepicker>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">₹</div>
                    </div>
                    <input type="number" class="form-control" v-model.number="record.dep" min="0" placeholder="Deposit Amount">
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <a href="javascript:void(0);" @click="removeDeposit()"><font-awesome-icon :icon="fas.faTimes"/> </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vue-moment-datepicker';

    //import '@fortawesome/fontawesome/styles.css';
    //import fontawesome from '@fortawesome/fontawesome';
    //import { faEdit } from '@fortawesome/fontawesome-free-solid';

    import { fas } from '@fortawesome/free-solid-svg-icons'

    export default {
        components: {
            Datepicker
        },
        props: ['record'],
        data: function () {
            return {
                depositdata: this.record
            }
        },
        methods: {
            removeDeposit() {
                this.$emit('delete-row');
            }
        },
        computed: {
            fas() {
                return fas
            }
        },
        mounted() {

        }
    }
</script>
