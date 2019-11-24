<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link :to="{name : 'home'}">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isLogin === false" link :to="{name : 'login'}">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else link :to="{name : 'mypage'}">
          <v-list-item-action>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>mypage</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{name : 'board'}">
          <v-list-item-action>
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>board</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Vue Study</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items>
          <v-menu offset-y v-if="isLogin">
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                v-on="on"
                icon
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item link :to="{name : 'mypage'}">
                <v-list-item-title>mypage</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$store.dispatch('logout')">
                <v-list-item-title>logOut</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        <v-btn text v-else link :to="{name : 'login'}">Login</v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapState} from "vuex"

  export default {
    props: {
      source: String,
    },
    computed:{
        ...mapState(["isLogin"]),
    },
    data: () => ({
      drawer: false,
    }),
  }
</script>