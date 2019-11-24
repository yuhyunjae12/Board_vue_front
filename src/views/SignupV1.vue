<template>
<v-container fill-height style="max-width:250px;">  
    <v-layout align-center row wrap>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
        <v-card
            class="mx-auto"
            max-width="344"
        >
          <v-img
            src="https://blog.hmgjournal.com/images_n/contents/170421_dog01.png"
            height="200px"
          ></v-img>
          <v-card-subtitle>
            <v-text-field
                v-model="name"
                :counter="10"
                :rules="nameRules"
                label="name"
                required
                ></v-text-field>
          </v-card-subtitle>
          <v-card-title>
                <v-text-field
                v-model="id"
                :counter="25"
                :rules="idRules"
                label="id"
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
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="Insert"
            >
            Insert
            </v-btn>

            <v-btn
            color="error"
            class="mr-4"
            @click="reset"
            >
            Reset Form
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios"

  export default {
    data: () => ({
      valid: true,
      author: '',
      name: '',
      password: '',
      passwordRules:[
        v => !!v || 'password is required',
      ],
      nameRules: [
        v => !!v || 'name is required',
        v => (v && v.length <= 10) || 'name must be less than 10 characters',
      ],
      id: '',
      idRules: [
        v => !!v || 'id is required',
        v => /.+@.+\..+/.test(v) || 'id must be valid',
      ],
    }),

    methods: {
      Insert () {
        if (this.$refs.form.validate()) {
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
      reset () {
        this.$refs.form.reset()
      },
    },
  }
</script>