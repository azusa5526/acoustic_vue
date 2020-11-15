<template>
  <header class="header">
    <nav
      class="navbar navbar-expand-md navbar-light fixed-top transition"
      :class="{ 'bg-trasparent': isTop, 'bg-white shadowBottom': !isTop }"
    >
      <h1 class="mb-0 ml-sm-3 ml-md-6 mr-10 py-3 py-sm-4 py-md-5">
        <router-link
          class="navbar-brand whiteIcon p-0"
          :class="{ whiteIcon: isTop, blackIcon: !isTop }"
          to="/"
          >acoustic</router-link
        >
      </h1>
      <button
        class="navbar-toggler border-0"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars" :class="{ 'text-white': isTop, 'text-primary': !isTop }"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto mt-3 mt-md-0 ml-">
          <li class="nav-item px-5">
            <router-link
              class="nav-link py-md-0"
              to="/products"
              :class="{ 'text-white': isTop, 'text-primary': !isTop }"
              >所有產品</router-link
            >
          </li>
          <li class="nav-item px-5">
            <router-link
              class="nav-link py-md-0"
              to="/news"
              :class="{ 'text-white': isTop, 'text-primary': !isTop }"
              >最新消息</router-link
            >
          </li>
          <li class="nav-item px-5">
            <router-link
              class="nav-link py-md-0"
              to="/appointment"
              :class="{ 'text-white': isTop, 'text-primary': !isTop }"
              >預約試聽</router-link
            >
          </li>
          <li class="d-block d-md-none nav-item px-5">
            <router-link class="nav-link py-md-0" :class="{ 'text-white': isTop, 'text-primary': !isTop }" to="/login">會員登入</router-link>
          </li>
        </ul>
      </div>

      <ul class="icon d-none d-md-flex navbar-nav mr-5">
        <li class="nav-item">
          <router-link :class="{ 'text-white': isTop, 'text-primary': !isTop }" to="/login"
            ><i class="far fa-user-circle"></i
          ></router-link>
        </li>
        <li class="nav-item pl-6">
          <a :class="{ 'text-white': isTop, 'text-primary': !isTop }" href="#"
            ><i class="fas fa-search"></i
          ></a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'IndexNavbar',
  components: {},

  data() {
    return {
      isTop: true
    };
  },

  methods: {
    handleScroll() {
      const st = window.scrollY;
      if (st < 5) {
        this.isTop = true;
      } else {
        this.isTop = false;
      }
    }
  },

  created() {
    // console.log('nav created');
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },

  destroyed() {
    // console.log('nav distroyed');
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>
