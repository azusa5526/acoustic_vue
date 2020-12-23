<template>
  <div class="dashboardProducts mx-4 py-4">
    <div class="d-flex flex-column flex-sm-row align-items-end flex-wrap bg-white mb-3 py-2 py-md-4 px-md-4">
      <div class="input-group mr-4 mb-3 mb-sm-0 flex-grow">
        <div class="dropdown mb-sm-0">
          <button
            @click="getCategoryList()"
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ categoryTag }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a
              v-for="(item, index) in categorys"
              :key="index"
              @click="
                categoryTag = item;
                changeCategoryTag();
              "
              class="dropdown-item"
              href="#"
              >{{ item }}</a
            >
          </div>
        </div>

        <input
          v-model="searchTitle"
          v-on:keyup.enter="changeSearchTitle()"
          type="text"
          class="form-control"
          placeholder="輸入名稱"
        />
        <button
          class="btn btn-primary btn-nowrap d-none d-sm-block"
          @click="changeSearchTitle()"
          type="button"
        >
          搜索名稱
        </button>
        <button
          class="btn btn-danger btn-nowrap d-none d-sm-block"
          @click="clearFilters()"
          type="button"
        >
          清除條件
        </button>
        <button
          class="btn btn-primary btn-nowrap d-block d-sm-none"
          @click="changeSearchTitle()"
          type="button"
        >
          <i class="fas fa-search"></i>
        </button>
        <button
          class="btn btn-danger btn-nowrap d-block d-sm-none"
          @click="clearFilters()"
          type="button"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>

      <button
        class="btn btn-primary btn-nowrap px-4 px-sm-6 px-lg-10 mr-4 mr-sm-0"
        @click="openProductModal(true)"
      >
        新增產品
      </button>
    </div>

    <div class="px-md-4">
      <table class="table-sm mb-3 test bg-white border w-100">
        <thead>
          <tr class="bg-white">
            <th class="d-none d-sm-table-cell">類別</th>
            <th>名稱</th>
            <th class="d-none d-sm-table-cell">原價</th>
            <th>售價</th>
            <th>啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pagedProducts" :key="item.id">
            <td class="d-none d-sm-table-cell">{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="d-none d-sm-table-cell">{{ item.origin_price | currency }}</td>
            <td>{{ item.price | currency }}</td>
            <td>
              <div
                class="toggle btn btn-sm btn-primary"
                data-toggle="toggle"
                role="button"
                style="width: 46.325px; height: 30.8px"
                :class="{ 'bg-light off': item.is_enabled === 0 }"
                @click="quickActiveProduct(item)"
              >
                <input
                  :false-value="0"
                  :true-value="1"
                  type="checkbox"
                  data-toggle="toggle"
                  data-size="sm"
                  v-model="tempProduct.is_enabled"
                />

                <div class="toggle-group">
                  <label class="btn btn-primary btn-sm toggle-on">On</label>
                  <label class="btn btn-light btn-sm toggle-off">Off</label>
                  <span class="toggle-handle btn btn-light btn-sm"></span>
                </div>
              </div>
            </td>
            <td>
              <button
                class="btn btn-sm btn-primary btn-nowrap"
                @click="openProductModal(false, item)"
              >
                編輯
              </button>
              <button class="btn btn-sm btn-danger btn-nowrap" @click="openDelProductModal(item)">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination></Pagination>
    </div>

    <div
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      id="productModal"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>編輯產品</span>
            </h5>
            <button aria-label="Close" class="close" data-dismiss="modal" type="button">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">圖片連結</label>
                  <input
                    class="form-control"
                    id="image"
                    placeholder="輸入連結"
                    type="text"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    新增圖片
                    <i class="fas fa-circle-notch fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input
                    class="form-control"
                    @change="uploadFile"
                    id="customFile"
                    ref="files"
                    type="file"
                  />
                </div>
                <img :src="tempProduct.imageUrl" alt class="img-fluid" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">產品名稱</label>
                  <input
                    class="form-control"
                    id="title"
                    placeholder="輸入名稱"
                    type="text"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">類別</label>
                    <input
                      class="form-control"
                      id="category"
                      placeholder="輸入類別"
                      type="text"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      class="form-control"
                      id="unit"
                      placeholder="輸入單位"
                      type="unit"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      class="form-control"
                      id="origin_price"
                      placeholder="輸入原價"
                      type="number"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      class="form-control"
                      id="price"
                      placeholder="輸入售價"
                      type="number"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    class="form-control"
                    id="description"
                    placeholder="輸入產品描述"
                    rows="4"
                    type="text"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">產品內容</label>
                  <textarea
                    class="form-control"
                    id="content"
                    placeholder="輸入產品內容"
                    rows="4"
                    type="text"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      :false-value="0"
                      :true-value="1"
                      class="form-check-input"
                      id="is_enabled"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal" type="button">取消</button>
            <button class="btn btn-primary" type="button" @click="uploadProduct">
              <i class="fas fa-circle-notch fa-spin" v-if="status.itemUploading"></i> 修改
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      aria-hidden="true"
      aria-labelledby="exampleModalLabel"
      class="modal fade"
      id="delProductModal"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button aria-label="Close" class="close" data-dismiss="modal" type="button">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            即將刪除產品
            <strong class="text-danger">{{ tempProduct.title }}</strong> ( 產品一旦刪除將無法恢復 )
          </div>
          <div class="modal-footer">
            <button @click="deleteProduct" class="btn btn-danger" type="button">
              <i class="fas fa-circle-notch fa-spin" v-if="status.itemUploading"></i> 刪除
            </button>
            <button class="btn btn-primary" data-dismiss="modal" type="button">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'DashboardProducts',
  components: {
    Pagination
  },

  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      status: {
        itemUploading: false,
        fileUploading: false
      },
      categorys: [],
      categoryTag: '選擇類別',
      searchTitle: ''
    };
  },

  methods: {
    ...mapActions(['getAllProducts']),

    changeCategoryTag() {
      this.$store.commit('CATEGORYTAG', this.categoryTag);
      this.filterProducts();
    },

    changeSearchTitle() {
      this.$store.commit('TITLETAG', this.searchTitle);
      this.filterProducts();
    },

    clearFilters() {
      this.searchTitle = '';
      this.categoryTag = '所有產品';
      this.changeSearchTitle();
      this.changeCategoryTag();
    },

    filterProducts() {
      this.$store.dispatch('filterProducts');
    },

    openProductModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $('#productModal').modal('show');
    },

    openDelProductModal(item) {
      this.tempProduct = Object.assign({}, item);
      $('#delProductModal').modal('show');
    },

    uploadProduct() {
      const vm = this;
      let api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product`;
      let httpMethod = 'post';
      vm.status.itemUploading = true;

      if (!vm.isNew) {
        api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }

      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        if (response.data.success) {
          vm.status.itemUploading = false;
          $('#productModal').modal('hide');
          vm.getAllProducts();
        } else {
          vm.status.itemUploading = false;
          $('#productModal').modal('hide');
          this.$store.commit('UPDATEMESSAGE', { message: '上傳產品失敗', status: 'danger' });
        }
      });
    },

    uploadFile() {
      const vm = this;
      const uploadedFile = this.$refs.files.files[0];
      const formData = new FormData();
      vm.status.fileUploading = true;

      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/upload`;

      vm.$http
        .post(url, formData, {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        })
        .then((response) => {
          if (response.data.success) {
            vm.status.fileUploading = false;
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          } else {
            vm.status.fileUploading = false;
            this.$store.commit('UPDATEMESSAGE', { message: '上傳圖片失敗', status: 'danger' });
          }
        });
    },

    quickActiveProduct(item) {
      this.tempProduct = Object.assign({}, item);
      this.isNew = false;
      this.$store.dispatch('updateLoading', true);
      if (this.tempProduct.is_enabled === 0) {
        this.tempProduct.is_enabled = 1;
      } else {
        this.tempProduct.is_enabled = 0;
      }
      this.uploadProduct();
    },

    deleteProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
      vm.status.itemUploading = true;

      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.status.itemUploading = false;
          $('#delProductModal').modal('hide');
          vm.getAllProducts();
        } else {
          vm.status.itemUploading = false;
          $('#delProductModal').modal('hide');
          this.$store.commit('UPDATEMESSAGE', { message: '刪除產品失敗', status: 'danger' });
        }
      });
    },

    getCategoryList() {
      const vm = this;
      const result = new Set();
      result.add('所有產品');
      vm.allProducts.forEach(function (item) {
        result.add(item.category);
      });
      vm.categorys = Array.from(result);
    }
  },

  computed: {
    ...mapGetters(['allProducts', 'pagedProducts'])
  },

  created() {
    this.getAllProducts();
    this.$store.dispatch('changePageSize', 12);
  },

  destroyed() {
    this.clearFilters();
  }
};
</script>
