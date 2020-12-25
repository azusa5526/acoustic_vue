<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination m-0">
        <li :class="{ disabled: !pagination.has_pre }" class="page-item">
          <a
            @click="changePage(pagination.current_page - 1)"
            aria-label="Previous"
            class="page-link"
            href="#"
          >
            <span aria-hidden="true">Prev</span>
          </a>
        </li>
        <li
          :class="{ active: pagination.current_page == page }"
          :key="page"
          class="page-item"
          v-for="page in pagination.total_pages"
        >
          <a @click="changePage(page)" class="page-link" href="#">{{ page }}</a>
        </li>
        <li :class="{ disabled: !pagination.has_next }" class="page-item">
          <a
            @click="changePage(pagination.current_page + 1)"
            aria-label="Next"
            class="page-link"
            href="#"
          >
            <span aria-hidden="true">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },

  methods: {
    changePage(targetPage) {
      this.$store.commit('products/PAGINATIONCOUNTER', targetPage);
    }
  },

  computed: {
    ...mapGetters('products', ['pagination'])
  }
};
</script>
