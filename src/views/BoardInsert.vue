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
            src="https://t1.daumcdn.net/cfile/tistory/99EB9D345D6879932F"
            height="200px"
          ></v-img>
          <v-card-subtitle>
            {{this.$store.state.userInfo.name}}
          </v-card-subtitle>
          <v-card-title>
                <v-text-field
                v-model="title"
                :counter="10"
                :rules="titleRules"
                label="title"
                required
                ></v-text-field>
            </v-card-title>
        <v-expand-transition>
            <div>
              <v-card-text>
                <v-textarea
                    autocomplete="content"
                    label="content"
                    v-model="content"
                    :rules="contentRules"
                ></v-textarea>
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
      title: '',
      titleRules: [
        v => !!v || 'title is required',
        v => (v && v.length <= 10) || 'title must be less than 10 characters',
      ],
      content: '',
      contentRules: [
        v => !!v || 'Content is required'
      ],
    }),

    methods: {
      Insert () {
        if (this.$refs.form.validate()) {
          this.snackbar = true

            let ParamsPost ={
                author: this.$store.state.userInfo.name,
                title: this.title,
                content: this.content
            };

            axios.post("/v1/board/free/post/", ParamsPost).then(res =>{
            console.log(res);
                this.$router.push({ name: "board" });
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