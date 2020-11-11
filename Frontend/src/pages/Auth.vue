<template>
  <div class="auth-wrapper">
    <card class="card" id="auth-card">
      <h1 id="auth-title">Authentication</h1>
      <div>
        <form @submit.prevent>
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
              @click.native.prevent="check()"
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
import authenticationService from "../plugins/authenticationService"
export default {
  data() {
    return {
      password: "",
    };
  },
  mounted() {},
  methods: {
    check() {
      if(this.password !== "") {
          authenticationService.authenticate(this.password)
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

#auth-card {
  padding: 3em;
}

#auth-title {
  padding-bottom: 1rem;
}
</style>
