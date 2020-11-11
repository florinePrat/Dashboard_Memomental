<template>
  <div class="auth-wrapper">
    <card class="card">
      <h1>Authentication</h1>
      <div>
        <form @submit.prevent>
          <div class="row">
            <div class="col-md-12">
              <fg-input
                type="email"
                label="Email"
                placeholder="Email"
                v-model="email"
              >
              </fg-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <fg-input
                type="password"
                label="Password"
                placeholder="Password"
                v-model="password"
              >
              </fg-input>
            </div>
          </div>

          <div class="text-center">
            <p-button
              type="submit"
              round
              @click.native.prevent="authentication()"
            >
              check authentication
            </p-button>
          </div>
        </form>
      </div>
    </card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {},
  methods: {
    authentication() {
      if(email !== "" && password !== "") {
          
      }
    },
  },
};
</script>
<style>
.auth-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.card {
  padding: 3em;
}

h1 {
  padding-bottom: 1rem;
}
</style>
