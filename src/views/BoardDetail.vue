<template>
  <v-container fill-height style="max-width:450px;">
    <v-layout align-center row wrap>
      <v-card
          class="mx-auto"
          max-width="344"
        >
          <v-img
            src="https://ewhagift.ewha.ac.kr/ezstock/035434400_1534729386.jpg"
            height="200px"
          ></v-img>
          <v-card-title>
            {{detail.title}}
          </v-card-title>
          <v-card-subtitle>
            {{detail.author}}
          </v-card-subtitle>
          <v-expand-transition>
            <div>
              <v-divider></v-divider>
              <v-card-text>
                {{detail.content}}
              </v-card-text>
            </div>
          </v-expand-transition>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text @click="goModify()">Modify</v-btn>
            <v-btn
              color="purple"
              text
              @click="goDelete()"
            >
              Delete
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-layout>
  </v-container>
</template>
<script>
import axios from "axios"

  export default {
    data () {
      return {
        no :this.$route.params.postId,
        detail:[],
      }
    },
    mounted: function(){
      this.getBoardDetail()
    },
    methods:{
        getBoardDetail(){
            console.log(this.no)
            axios.get("/v1/board/post/" + this.no)
            .then(res =>{
                console.log(res);
                this.detail = res.data.data;
            })
            .catch(err =>{
                console.log(err);
            })
        },
        goModify(){
          this.$router.push({ name: "boardModify", params: { postId: this.no } });
        },
        goDelete(){
          const deleteChk = confirm('삭제 하시겠습니까?');
          if(deleteChk){
            axios.delete("/v1/board/post/" + this.no)
                .then(res =>{
                  console.log(res)
                  if(res.data.code == "-1006"){
                    alert("소유자가아닙니다.");
                  }else{
                    /* this.$router.push({ name: "boardDetail", params: { postId: this.$route.params.postId } }); */
                    this.$router.push({ name: "board" });
                  }
                })
                .catch(err =>{
                  console.log(err)
                })
            }
        }
    }
  }
</script>