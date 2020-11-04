<template>
  <div class="d-flex flex-column vh-100">
    <Navbar></Navbar>

    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  name: 'SingleProduct',
  components: {
    Navbar,
    Footer
  }
};
</script>
