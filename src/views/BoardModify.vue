<template>
  <v-container fill-height style="max-width:340px;">  
    <v-layout align-center row wrap>
      <v-form ref="form" v-model="valid">
      <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-img
            src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/QsT/image/NSTeOeMe0MddpqlJ23FZV7hJGvg"
            height="200px"
          ></v-img>
          <v-card-subtitle>
            {{author}}
          </v-card-subtitle>
          <v-card-title>
            <v-text-field
              v-model="title"
              :rules="titleRules"
              :counter="10"
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
            <v-btn text @click="Modify()">Modify</v-btn>
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
      valid: false,
      author: '',
      title: '',
      content:'',
      titleRules: [
        v => !!v || 'title is required',
        v => v.length <= 10 || 'title must be less than 10 characters',
      ],
      contentRules:[
        v => !!v || 'content is required'
      ]
    }
    ),
    mounted: function(){
      this.getBoardDetail()
    },
    methods:{
      Modify(){

        let ParamsPost ={
          author: this.author,
          title: this.title,
          content: this.content
        };

        axios.put("/v1/board/post/" + this.$route.params.postId, ParamsPost).then(res =>{
          console.log(res);
          if(res.data.code == "-1006"){
            alert("소유자가아닙니다.");
          }else{
            this.$router.push({ name: "boardDetail", params: { postId: this.$route.params.postId } });
          }
        })
        .catch(err =>{
          console.log(err);
        })
      },
      getBoardDetail(){
        console.log(this.$route.params.postId)
            axios.get("/v1/board/post/" + this.$route.params.postId)
            .then(res =>{
                this.author = res.data.data.author
                this.title = res.data.data.title
                this.content = res.data.data.content
          })
          .catch(err =>{
              console.log(err);
          })
      }
    }
  }
</script>