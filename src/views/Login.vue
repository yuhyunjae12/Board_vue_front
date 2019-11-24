<template>
    <v-container fill-height style="max-width:450px;">
        <v-layout align-center row wrap>
            <v-flex xs12>
                <v-alert 
                class="mb-3"
                :value="isLoginError"
                type="error">
                    아이디와 비밀번호를 확인해주세요.
                </v-alert>
                <v-alert 
                class="mb-3"
                :value="isLogin"
                type="success">
                    로그인이 성공하였습니다.
                </v-alert>
                <v-card>
                    <v-toolbar flat>
                        <v-toolbar-title>로그인</v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3">
                        <v-text-field
                        v-model="id"
                        label="아이디를 입력해주세요."
                        >
                        </v-text-field>
                        <v-text-field
                        v-model="password"
                        type="password"
                        label="비밀번호를 입력해주세요."
                        >
                        </v-text-field>
                        <v-btn 
                        class="mb-3"
                        large
                        block
                        depressed
                        color="primary"
                        @click="login({id,password})"
                        >
                            로그인
                        </v-btn>
                        <v-btn 
                        class="mb-3"
                        large
                        block
                        depressed
                        color="success"
                        link :to="{name : 'signup'}"
                        >
                            가입
                        </v-btn>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import {mapState, mapActions} from "vuex"

export default {
    data(){
        return {
            id : null,
            password : null,
        }
    },
    computed:{
        ...mapState(["isLogin", "isLoginError"]),
    },
    methods:{
        ...mapActions(["login"]),
    }
}
</script>

