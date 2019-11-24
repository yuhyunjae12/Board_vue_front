<template>
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
        <div class="pa-2">
          <v-btn
            icon
            @click="goBoardStarting"
          >
          <v-icon>mdi-home</v-icon>
          </v-btn>
        </div>
        <v-select
              v-model="Keywordcolum"
              flat
              solo-inverted
              hide-details
              :items="keyWord"
              label="KeyWord"
            ></v-select>
          
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            label="Search"
          ></v-text-field>
        <div class="pa-2">
          <v-btn
            icon
            @click="getBoardList"
          >
          <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
            <v-spacer></v-spacer>
              <v-btn
                large
                depressed
                color="blue"
                @click="goInsert"
              >
              글작성
              </v-btn>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card
            @click="goBoardDetail(item.postId)"
            >
              <v-card-title class="subheading font-weight-bold">{{ item.author }}</v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                >
                  <v-list-item-content class="blue--text">{{ key }}:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item[key] }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ length }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import axios from "axios"
  export default {
    data () {
      return {
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        length: 0,
        itemsPerPage: 12,
        Keywordcolum:'',
        keyWord: [
            'author',
            'content',
            'title',
        ],
        keys: [
          'title',
          'content',
          'createdAt',
        ],
        items: [],
      }
    },
    created: function(){
        this.getBoardList()
    },
    computed: {
      filteredKeys () {
        console.log(this.keys.filter(key => key !== `Name`));
        return this.keys.filter(key => key !== `Name`)
      },
    },
    methods: {
        getBoardList(){
            let boardPage = this.page -1;
            axios.get("/v1/board/free/posts?page=" + boardPage 
                      + "&Keywordcolum=" + this.Keywordcolum
                      + "&search=" + this.search)
            .then(res =>{
                console.log(res);
                this.items = res.data.page.content
                this.length = res.data.page.totalPages
                this.totalVisible = res.data.page.size
            })
            .catch(err =>{
                console.log(err);
            })
        },
      nextPage () {
        if (this.page + 1 <= this.length) {
            this.page += 1
            this.getBoardList();
            }
      },
      formerPage () {
        if (this.page - 1 >= 1) {
            this.page -= 1
            this.getBoardList();
        }
      },
      goInsert(){
        this.$router.push({ name: "boardInsert" });
      },
      goBoardDetail(no){
        console.log(localStorage.getItem('X-AUTH-TOKEN'));
        this.$router.push({ name: "boardDetail", params: { postId: no } });
      },
      goBoardStarting(){

        //어떻게 구현할지 잘 모르겠음...
        this.search = '';
        this.Keywordcolum = '';

        this.getBoardList();
      }
    },
  }
</script>