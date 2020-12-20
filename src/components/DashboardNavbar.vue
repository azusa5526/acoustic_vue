<template>
  <header class="header">
    <nav class="dashboardNavbar navbar navbar-light bg-white shadowBottom">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a href="#" class="nav-link p-0" @click="toggleSidebar()">
            <svg
              t="1608403507691"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="28023"
              width="32"
              height="32"
            >
              <path
                d="M853.333333 714.666667v64H170.666667v-64h682.666666zM320 405.333333v213.333334l-149.333333-106.666667 149.333333-106.666667z m533.333333 85.333334v64H405.333333v-64h448z m0-234.666667v64H170.666667v-64h682.666666z"
                p-id="28024"
                fill="#515151"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
      <ul class="d-flex mb-0">
        <button class="btn btn-sm btn-primary">123</button>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'DashboardNavbar',
  components: {},

  data() {
    return {};
  },

  methods: {
    ...mapActions('dashboardLayout', ['toggleSidebar'])
  }
};
</script>
