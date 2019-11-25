<template>
    <div class="pa-5">
        <v-stepper v-model="e1">
            <v-stepper-items>
            <v-stepper-content
             step="1"
             >
                <v-card
                    class="mx-auto"
                    max-width="344"
                    >
                    <v-img
                        src="http://digitalchosun.dizzo.com/site/data/img_dir/2015/08/27/2015082711745_0.jpg"
                        height="180px"
                    ></v-img>
                    <v-card-title>
                        {{userInfo.id}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{userInfo.name}}<br/>
                        {{userInfo.role}}
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn
                        color="primary"
                        @click="e1 = 2"
                        >
                        Modify
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    </v-card>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card
                    class="mx-auto"
                    max-width="344"
                    >
                    <v-img
                        src="https://petrico.site/wp-content/uploads/2018/09/20180928_160957.jpg"
                        height="180px"
                    ></v-img>
                    <v-card-title>
                        {{userInfo.id}}
                    </v-card-title>
                    <v-card-subtitle>
                        {{userInfo.name}}<br/>
                        {{userInfo.role}}
                    </v-card-subtitle>
                    <v-expand-transition>
                        <div>
                        <v-divider></v-divider>
                        <v-card-text>
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
                        </div>
                    </v-expand-transition>
                    <v-divider></v-divider>
                    <v-card-actions>
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
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    </v-card>
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
                this.$store.dispatch('logout')
                this.$router.push({ name: "home" });
            })
            .catch(err =>{
            console.log(err);
            })
        }
    }
}
</script>
