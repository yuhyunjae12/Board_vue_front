<template>
    <div class="pa-5">
        <v-stepper v-model="e1">
            <v-stepper-items>
            <v-stepper-content step="1">
                <v-card
                class="mb-12"
                height="200px"
                outlined
                >
                <!-- <v-card-title>
                    UserName : {{userInfo.name}}
                </v-card-title> -->
                <v-card-subtitle>
                    <v-card-text>
                    UserName : {{userInfo.name}} <br/>
                    UserId : {{userInfo.id}} <br/>
                    UserRole : {{userInfo.role}}
                    </v-card-text>
                </v-card-subtitle>
                </v-card>

                <v-btn
                color="primary"
                @click="e1 = 2"
                >
                Modify
                </v-btn>

            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card
                class="mb-12"
                height="200px"
                outlined
                >

                <!-- <v-card-title>
                    UserName : {{userInfo.name}}
                </v-card-title> -->
                <v-card-subtitle>
                    <v-card-text>
                        UserName : {{userInfo.name}} <br/>
                        UserId : {{userInfo.id}} <br/>
                        UserRole : {{userInfo.role}}
                        <v-text-field
                        v-model="password"
                        :counter="25"
                        :rules="passwordRules"
                        label="password"
                        type="password"
                        required
                        style="max-width:250px;"
                        ></v-text-field>
                    </v-card-text>
                </v-card-subtitle>

                </v-card>

                <v-btn
                color="success"
                @click="goModify"
                >
                Modify
                </v-btn>

                <v-btn 
                    text
                    @click="e1=1"
                >Cancel
                </v-btn>
            </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>
<script>
import axios from "axios"

export default {
    data(){
        return{
            e1: 0,
            userInfo : this.$store.getters.getUserInfo,
            valid: true,
            author: '',
            password: '',
            passwordRules:[
                v => !!v || 'password is required',
            ]
        }
    },
    methods:{
        goModify(){
            
            let ParamsPost ={
                msrl: this.userInfo.msrl,
                password: this.password
            };

            axios.put("/v1/user/", ParamsPost).then(res =>{
                console.log(res);
                this.$router.push({ name: "home" });
            })
            .catch(err =>{
            console.log(err);
            })
        }
    }
}
</script>
