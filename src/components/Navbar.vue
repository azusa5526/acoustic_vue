<template>
  <div class="header">
    <nav class="navbar navbar-expand-md navbar-light bg-white shadowBottom">
      <h1 class="mb-0 ml-sm-6 mr-10 py-3 py-sm-4 py-md-5">
        <router-link class="navbar-brand p-0" to="/">acoustic</router-link>
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
        <i class="fas fa-bars text-primary"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto mt-3 mt-md-0">
          <li class="nav-item px-5">
            <router-link class="nav-link py-md-0" to="/products">所有產品</router-link>
          </li>
          <li class="nav-item px-5">
            <router-link class="nav-link py-md-0" to="/news">最新消息</router-link>
          </li>
          <li class="nav-item px-5">
            <router-link class="nav-link py-md-0" to="/appointment">預約試聽</router-link>
          </li>
          <li class="d-block d-md-none nav-item px-5">
            <router-link class="nav-link py-md-0" to="/login">會員登入</router-link>
          </li>
        </ul>
      </div>

      <ul class="icon d-none d-md-flex navbar-nav mr-5">
        <li class="nav-item">
          <router-link to="/login"><i class="far fa-user-circle"></i></router-link>
        </li>
        <li class="nav-item pl-6">
          <a href="#"><i class="fas fa-search"></i></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  components: {}
};
</script>
