<template>
<div class="pa-10">
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">User Id check</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="2">Sign Up</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form
            ref="idChkForm"
            v-model="valid"
            lazy-validation
            >
            <v-card
                class="mb-12"
                color="blue lighten-5"
                height="200px"
            >
            <v-alert 
                class="mb-3"
                :value="isChkId"
                type="error">
                    중복된 아이디가 있습니다.
            </v-alert>
            <v-card-title>
                    <v-text-field
                    v-model="id"
                    :counter="25"
                    :rules="idRules"
                    label="id"
                    required
                    ></v-text-field>
                </v-card-title>
            </v-card>
        </v-form>
        <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="signContinue"
                >
                Continue
                </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-form
            ref="signForm"
            v-model="valid"
            lazy-validation
            >
            <v-card
                class="mb-12"
                color="blue lighten-5"
                height="200px"
            >
                    <v-card-title>
                        <v-text-field
                        v-model="name"
                        :counter="25"
                        :rules="nameRules"
                        label="name"
                        required
                        ></v-text-field>
                    </v-card-title>
                <v-expand-transition>
                    <div>
                    <v-card-text>
                        <v-text-field
                        v-model="password"
                        :counter="25"
                        :rules="passwordRules"
                        label="password"
                        type="password"
                        required
                        ></v-text-field>
                    </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-form>

        <v-btn
          color="success"
          @click="signUp()"
        >
          SignUp
        </v-btn>

        <v-btn 
            text
            @click="e1 =1"
        >
            Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  </div>
</template>
<script>
import axios from "axios"

  export default {
    data () {
      return {
        isChkId: false,
        e1: 0,
        valid: true,
        author: '',
        id: '',
        idRules: [
            v => !!v || 'id is required',
            v => /.+@.+\..+/.test(v) || 'id must be valid',
        ],
        password: '',
        passwordRules:[
            v => !!v || 'password is required',
        ],
        name: '',
        nameRules: [
            v => !!v || 'name is required',
            v => (v && v.length <= 10) || 'name must be less than 10 characters',
        ],
      }
    },
    methods :{
        signUp(){
            if (this.$refs.signForm.validate()) {
                this.snackbar = true

                let ParamsPost ={
                    name: this.name,
                    id: this.id,
                    password: this.password
                };

                axios.post("/v1/signup/", ParamsPost).then(res =>{
                console.log(res);
                    this.$router.push({ name: "login" });
                })
                .catch(err =>{
                console.log(err);
                })
                
            }
        },
        signContinue(){
            if (this.$refs.idChkForm.validate()) {
                let ParamsPost ={
                    id: this.id,
                };
                axios.post("/v1/signup/idchk/", ParamsPost).then(res =>{
                    console.log(res);
                    if(res.data.data === false){
                        this.snackbar = true
                        this.isChkId = false
                        this.e1 =2; 
                    }else{
                        this.isChkId = true
                    }
                })
                .catch(err =>{
                console.log(err);
                })
            }
        }
    }
  }
</script>