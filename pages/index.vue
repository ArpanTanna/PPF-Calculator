<template>
	<section class="container">
		<div class="clearfix mt-4">
			<div class="card">
				<div class="card-body loader-parent" v-bind:class="{ 'loading': isLoading }">
					<div class="row clearfix">
						<div class="col-md-8 mb-4">
							<h3 class="text-center mb-4 text-primary">PPF Calculator</h3>
							<div class="clearfix">
								<div class="row clearfix">
									<div class="col-md-6">
										<div class="form-group">
											<label>Financial Year</label>
											<select name="financial_year" class="form-control" v-model="fYear" @change="changeFY">
                                                <option v-for="option in financialYearTable" v-bind:value="option.id">
                                                    {{ option.name }}
                                                </option>
											</select>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label>Initial Amount</label>
											<div class="input-group">
												<div class="input-group-prepend">
													<div class="input-group-text">&#8377</div>
												</div>
												<input type="number" class="form-control" v-model.number="initialAmount" />
											</div>
										</div>
									</div>
								</div>
							</div>
                            <div class="clearfix">
                                <div class="form-group">
                                    <div class="clearfix">
                                        <label>Deposit Type</label>
                                    </div>
                                    <div class="clearfix">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" id="automatic" type="radio" name="ismanual" value="0" v-model.number="isManual" />
                                            <label class="form-check-label" for="automatic">Auto</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" id="manual" type="radio" name="ismanual" value="1" v-model.number="isManual" />
                                            <label class="form-check-label" for="manual">Manual</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="clearfix" v-if="!isManual">
                                <div class="row clearfix">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Auto Deposit Date</label>
                                            <input type="number" min="1" max="28" class="form-control" v-model="auto.date" />
                                            <small id="passwordHelpBlock" class="form-text text-muted">
                                                Date must between 1 to 28
                                            </small>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Auto Deposit Amount</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">&#8377</div>
                                                </div>
                                                <input type="number" class="form-control" v-model.number="auto.amount" min="1" max="28" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <a href="javascript:void(0);" class="btn btn-primary mb-2" @click="applyAuto()">Instant Calculate</a>
                                </div>
                            </div>
                            <div class="clearfix mt-3" v-if="isManual">
                                <div class="card mb-4">
                                    <div class="card-body">
                                        <div class="clearfix" v-for="(dep, index) in deposit">
                                            <deposit v-bind:record="dep" v-on:delete-row="deleteRow(index)"></deposit>
                                        </div>
                                        <div class="clearfix mt-1" v-if="deposit.length < 12">
                                            <a href="javascript:void(0);" class="btn btn-primary btn-sm" @click="addDeposit()">+ Add New</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <a href="javascript:void(0);" class="btn btn-primary mb-2" @click="applyManual()">Calculate</a>
                                </div>
                            </div>
						</div>
						<div class="col-md-4 result-box text-secondary">
                            <h3>&nbsp;</h3>
                            <div class="row clearfix result-row">
                                <div class="col-xl-6 col-12"><h5>Initial Amount</h5></div>
                                <div class="col-xl-6 col-12">
                                    <h5 class="text-right text-primary" v-html="calculation.initial"></h5>
                                </div>
                            </div>
                            <div class="row clearfix result-row">
                                <div class="col-xl-6 col-12"><h5>Deposit</h5></div>
                                <div class="col-xl-6 col-12"><h5 class="text-right text-primary" v-html="calculation.deposit"></h5></div>
                            </div>
                            <div class="row clearfix result-row">
                                <div class="col-xl-6 col-12"><h5>Interest</h5></div>
                                <div class="col-xl-6 col-12"><h5 class="text-right text-primary" v-html="calculation.interest"></h5></div>
                            </div>
                            <hr>
                            <div class="row clearfix result-row">
                                <div class="col-xl-6 col-12"><h5>Final Amount</h5></div>
                                <div class="col-xl-6 col-12"><h5 class="text-right text-primary" v-html="calculation.total"></h5></div>
                            </div>
                            <div class="clearfix mt-3 mb-4">
                                <div v-if="calculation.total">
                                    <a href="javascript:void(0);" class="btn btn-primary btn-block" @click="saveToDb">Save</a>
                                    <div class="clearfix mt-4" v-if="recordId">
                                        <div class="form-group">
                                            <label>Record URL</label>
                                            <div class="input-group">
                                                <input type="text" name="record_id" class="form-control" v-model="recordUrl"/>
                                                <div class="input-group-append">
                                                    <div class="input-group-text">
                                                        <a v-bind:href="recordUrl" target="_blank">
                                                            <font-awesome-icon :icon="fas.faShare"/>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <small class="form-text text-muted">You can see current calculation anytime by this URL</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import _ from 'lodash'
import { fas } from '@fortawesome/free-solid-svg-icons'
import deposit from '~/components/deposit.vue'

export default {
	components: {
		Logo, deposit
	},
	middleware: 'homepage',
	data () {
		return {
		    isLoading: 0,
			interestPercentTable: {
				'201704': 7.9,
				'201707': 7.8,
				'201801': 7.6,
				'201810': 8,
                '201907': 7.9
			},
			financialYearTable: [
				{id : 1718, name : "2017-2018"},
				{id : 1819, name : "2018-2019"},
				{id : 1920, name : "2019-2020"}
			],
            fYearData: {'baseDate': '', 'endDate': '', 'itKey': ''},
            fYear: 1920,
            initialAmount: 0,
            isManual: 0,
            auto: {'date': 1, 'amount': 1000},
            deposit: [{'date': '', 'dep': ''}],
            amount: [],
            interest: [],
            calculation: {'initial': 0, 'deposit': 0, 'interest': 0, 'total': 0},
            saveObj: {},
            recordId: ''
        }
	},
	head () {
		return {
			meta: [
				// hid is used as unique identifier. Do not use `vmid` for it as it will not work
				//{ hid: 'description', name: 'description', content: 'First Nuxt App' }
			]
		}
	},
    computed: {
        fas() {
            return fas
        },
        recordUrl() {
            return this.$el.baseURI+'showhistory/'+this.recordId;
        }
    },
    asyncData({ store }) {
        console.log(store.state)
    },
    methods: {
        async test() {
            let messageRef = this.$fireStore.collection('records').doc('XDb91QAJ3DCrLXnv2tnD')
            let messageDoc = await messageRef.get();
            console.log(messageDoc.data());
        },
        async saveToDb() {
            let $this = this;
            try {
                this.$fireStore.collection('records').add($this.saveObj)
                .then(function(docRef) {
                    $this.recordId = docRef.id;
                    alert('Record saved successfully.');
                    //console.log(docRef);
                });
            } catch (e) {
                alert(e);
                return;
            }
        },
        copyToClip () {

        },
	    getNormalData(obj, key, isObj) {
	        if(isObj == 1) {
                var normalData = JSON.parse(JSON.stringify(obj[key]));
            }
            else {
                var normalData = JSON.parse(JSON.stringify(obj));
            }
	        return normalData;
        },

        addDeposit() {
	        if(this.deposit.length < 12) {
                this.deposit.push({'date': '', 'dep': ''});
            }
        },

        deleteRow(index) {
	        this.deposit.splice(index, 1);
        },

        applyAuto() {
            if(this.auto.amount > 0 && this.auto.date >= 1 && this.auto.date <= 28)
            {
                this.deposit = [];
                this.amount = [];
                this.interest = [];
                this.calculation = {'initial': 0, 'deposit': 0, 'interest': 0, 'total': 0};

                // Object.assign({}, this.fYearData)
                let tempDate = _.cloneDeep(this.fYearData.baseDate);

                //$filter('filter')($scope.deposit, function (value, index, array) {
                for(var i=0; i<12; i++) {
                    var ym = this.$moment(tempDate).format('YYYY-MM');
                    var ymd = ym+'-'+('0' + this.auto.date).slice(-2);
                    this.$set(this.deposit, i, {'date': ymd, 'dep': this.auto.amount});
                    tempDate.setMonth(tempDate.getMonth() + 1, 1);
                }

                this.calc();
            }
            else {
                alert('Please fill up proper data.');
            }
        },

        applyManual() {
            this.amount = [];
            this.interest = [];
            this.calculation = {'initial': 0, 'deposit': 0, 'interest': 0, 'total': 0};
            this.calc();
        },

        calc() {
            //var tempDate = this.fYearData.baseDate;
            let tempDate = _.cloneDeep(this.fYearData.baseDate);
            var count = 0;
            var itKey = this.getNormalData(this.fYearData.itKey, '', 0);
            var prevKey = '';
            var lateDeposit = 0;

            while(tempDate < this.fYearData.endDate && count < 12)
            {
                var ym = this.$moment(tempDate).format('YYYYMM');
                var lastDate = tempDate;
                lastDate.setMonth(lastDate.getMonth() + 1, 0);

                // Get Interest rate
                if(this.interestPercentTable.hasOwnProperty(ym)) {
                    itKey = ym;
                }
                var intPercent = this.getNormalData(this.interestPercentTable, itKey, 1);

                // Get Default Amount
                if(count == 0) {
                    //this.amount[ym] = this.initialAmount;
                    let td = this.getNormalData(this.initialAmount, '', 0);
                    this.$set(this.amount, ym, td);
                }
                else {
                    //this.amount[ym] = this.amount[prevKey];
                    let td = this.getNormalData(this.amount, prevKey, 1);
                    this.$set(this.amount, ym, td);
                }

                // Added deposit amount between 5th to last date of previous month
                //this.amount[ym] += lateDeposit;
                let td = this.getNormalData(this.amount, ym, 1);
                this.$set(this.amount, ym, td+lateDeposit);
                lateDeposit = 0;

                // Get deposit
                var dateOne = ym+'01';
                var dateFive = ym+'05';
                var dateLast = this.$moment(lastDate).format('YYYYMMDD');

                //$filter('filter')($scope.deposit, function (value, index, array) {
                let $this = this;
                this.deposit.forEach(function(value, key) {
                    if(value.date !== '' && value.dep > 0) {
                        var dateDeposit = $this.$moment(value.date).format('YYYYMMDD');
                        if(dateDeposit >= dateOne && dateDeposit <= dateLast) {
                            if(dateDeposit <= dateFive) {
                                //$this.amount[ym] += value.dep;
                                let td = $this.getNormalData($this.amount, ym, 1);
                                $this.$set($this.amount, ym, td+value.dep);
                            }
                            else {
                                lateDeposit += _.cloneDeep(value.dep);
                            }
                            count+=1;
                        }
                    }
                });

                // Calculate interest
                let interestTemp = this.amount[ym] * ((intPercent / 12) / 100);
                this.$set(this.interest, ym, interestTemp);

                // Loop end procedure
                prevKey = ym;
                tempDate.setMonth(tempDate.getMonth() + 1, 1);
            }

            // Late deposit for last month
            /*if(lateDeposit > 0) {
                var ym = this.$moment(tempDate).format('YYYYMM');
                this.$set(this.amount, ym, _.cloneDeep(this.amount[prevKey])+lateDeposit);
            }*/

            //var da = this.depositAmount();
            var da = _.cloneDeep(this.amount[prevKey]);
            // Late deposit for last month
            if(lateDeposit > 0) {
                da = da + lateDeposit;
            }

            var ia = this.interestAmount();
            this.calculation.initial = this.convertDisplay(this.initialAmount);
            this.calculation.deposit = this.convertDisplay(da - this.initialAmount);
            this.calculation.interest = this.convertDisplay(ia);
            this.calculation.total = this.convertDisplay(da+ia);

            // update save object
            this.saveObj = {
                'fYear': _.cloneDeep(this.fYear), 'initialAmount': _.cloneDeep(this.initialAmount),
                'isManual': _.cloneDeep(this.isManual), 'auto': _.cloneDeep(this.auto),
                'deposit': _.cloneDeep(this.deposit)
            };
        },

        changeFY() {
            var sYear = this.fYear.toString().substring(0,2);
            var eYear = this.fYear.toString().slice(-2);
            this.fYearData.baseDate = new Date('20'+sYear+'-04-01');
            this.fYearData.endDate = new Date('20'+eYear+'-03-31');

            var intper = ''; var sMonth = '20'+sYear+'04';
            var tempIPT = this.interestPercentTable;
            Object.keys(tempIPT).forEach(function(key) {
                if(key <= sMonth) {
                    intper = key;
                }
            });
            if(intper !== '') {
                this.fYearData.itKey = intper;
            }

            this.deposit = [{'date': '', 'dep': ''}];
            this.amount = [];
            this.interest = [];
            this.calculation = {'initial': 0, 'deposit': 0, 'interest': 0, 'total': 0};
            this.recordId = '';
        },

        interestAmount() {
            var total = 0;
            this.interest.forEach(function(interestA, ym){
                total += interestA;
            });
            return total;
        },

        depositAmount() {
            var total = 0;
            this.amount.forEach(function(amountA, ym){
                total = amountA;
            });
            return total;
        },

        convertDisplay(val) {
            return val.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            });
        },

        async checkred(id) {
            this.isLoading = 1;
            let messageRef = this.$fireStore.collection('records').doc(id)
            let messageDoc = await messageRef.get();
            if(messageDoc.exists) {
                let data = messageDoc.data();
                this.fYear = data.fYear;
                this.initialAmount = data.initialAmount;
                this.isManual = data.isManual;
                this.auto = data.auto;
                this.deposit = data.deposit;
                this.calc();
                this.isLoading = 0;
            }
            this.isLoading = 0;
        }
    },
    mounted() {
        this.changeFY();
        let isStored = this.$store.getters.getRecord;
        if(isStored) {
            this.checkred(isStored)
        }
    }

}
</script>

