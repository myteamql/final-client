<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      {{message}}
    </div>
  </div>
</template>

<script>
  import axios from "axios";
export default {
  name: "App",
  data: () => ({
    message: ""
  }),
  methods: {
    getMessages() {
      axios
              .get("http://localhost:8080/test")
              .then((response) => {
                this.message = response.data;
                this.$emit("success");
              })
              .catch(() => {
              });
    },

  },
  created() {
    this.getMessages();
  }
};
</script>
