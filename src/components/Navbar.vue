<template>
  <div class="header">
    <nav class="navbar navbar-expand-md navbar-light fixed-top bg-transparent transition">
      <h1 class="mb-0 ml-sm-6 mr-10 py-3 py-sm-4 py-md-5">
        <a class="navbar-brand whiteIcon p-0" href="index.html">acoustic</a>
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
        <i class="fas fa-bars text-secondary"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto mt-3 mt-md-0">
          <li class="nav-item px-5">
            <a class="nav-link text-white py-md-0" href="products.html">所有產品</a>
          </li>
          <li class="nav-item px-5">
            <a class="nav-link text-white py-md-0" href="news.html">最新消息</a>
          </li>
          <li class="nav-item px-5">
            <a class="nav-link text-white py-md-0" href="appointment.html">預約試聽</a>
          </li>
          <li class="d-block d-md-none nav-item px-5">
            <a class="nav-link text-white py-md-0" href="login.html">會員登入</a>
          </li>
        </ul>
      </div>

      <ul class="icon d-none d-md-flex navbar-nav mr-5">
        <li class="nav-item">
          <a class="text-white" href="#"><i class="far fa-user-circle"></i></a>
        </li>
        <li class="nav-item pl-6">
          <a class="text-white" href="#"><i class="fas fa-search"></i></a>
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
