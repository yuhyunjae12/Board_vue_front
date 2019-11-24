<template>
  <v-container fill-height style="max-width:450px;">
    <v-layout align-center row wrap>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>
                <v-toolbar flat>
                  <v-toolbar-title>자유게시판</v-toolbar-title>
                </v-toolbar>
              </th>
            </tr>
            <tr>
              <th class="text-left">postNo</th>
              <th class="text-left">Name</th>
              <th class="text-left">title</th>
              <th class="text-left">createdAt</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in boardList" :key="item.name">
              <td>{{ item.postId }}</td>
              <td>{{ item.author }}</td>
              <td @click="goBoardDetail(item.postId)">{{ item.title }}</td>
              <td>{{ item.createdAt }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <v-btn 
                  class="mb-3 float-right"
                  large
                  depressed
                  @click="goInsert()"
                  >
                      글작성
                </v-btn>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <v-pagination
                  v-model="page"
                  :circle="circle"
                  :disabled="disabled"
                  :length="length"
                  :page="page"
                  :total-visible="totalVisible"
                  @input="getBoardList"
                ></v-pagination>
              </td>
            </tr>
          </tfoot>
        </template>
      </v-simple-table>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios"

  export default {
    data () {
      return {
        boardList: [],
        circle: false,
        disabled: false,
        length: 0,
        page: 1,
        totalVisible: 10,
      }
    },
    created: function(){
        this.getBoardList()
    },
    methods:{
        getBoardList(){
          console.log(this.page);
          let boardPage = this.page -1;
            axios.get("/v1/board/free/posts?page=" + boardPage)
            .then(res =>{
                this.boardList = res.data.page.content
                this.length = res.data.page.totalPages
                this.totalVisible = res.data.page.size
            })
            .catch(err =>{
                console.log(err);
            })
        },
        goBoardDetail(no){
          console.log(localStorage.getItem('X-AUTH-TOKEN'));
            this.$router.push({ name: "boardDetail", params: { postId: no } });
        },
        goInsert(){
          this.$router.push({ name: "boardInsert" });
        }
    }
  }
</script>