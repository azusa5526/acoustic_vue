<template>
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
            <span>ADD PRODUCT</span>
          </h5>
          <button aria-label="Close" class="close" data-dismiss="modal" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="image">IMAGE LINK</label>
                <input
                  class="form-control"
                  id="image"
                  placeholder="INPUT IMG LINK"
                  type="text"
                  v-model="tempProduct.imageUrl"
                />
              </div>
              <div class="form-group">
                <label for="customFile">
                  or UPLOAD IMG
                  <i class="fas fa-circle-notch fa-spin" v-if="status.fileUploading"></i>
                </label>
                <input
                  @change="uploadFile"
                  class="form-control"
                  id="customFile"
                  ref="files"
                  type="file"
                />
              </div>
              <img :src="tempProduct.imageUrl" alt class="img-fluid" />
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">PRODUCT TITLE</label>
                <input
                  class="form-control"
                  id="title"
                  placeholder="PRODUCT TITLE"
                  type="text"
                  v-model="tempProduct.title"
                />
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">CATEGORY</label>
                  <input
                    class="form-control"
                    id="category"
                    placeholder="INPUT CATEGORY"
                    type="text"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">UNIT</label>
                  <input
                    class="form-control"
                    id="unit"
                    placeholder="INPUT UNIT"
                    type="unit"
                    v-model="tempProduct.unit"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">ORIG PRICE</label>
                  <input
                    class="form-control"
                    id="origin_price"
                    placeholder="INPUT ORIG PRICE"
                    type="number"
                    v-model="tempProduct.origin_price"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">SELL PRICE</label>
                  <input
                    class="form-control"
                    id="price"
                    placeholder="INPUT SELL PRICE"
                    type="number"
                    v-model="tempProduct.price"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="content">PROD CONTENT</label>
                <textarea
                  class="form-control"
                  id="content"
                  placeholder="INPUT PROD CONTENT"
                  rows="4"
                  type="text"
                  v-model="tempProduct.content"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="description">PROD DESCRIPTION</label>
                <textarea
                  class="form-control"
                  id="description"
                  placeholder="INPUT PROD DESCRIPTION"
                  rows="4"
                  type="text"
                  v-model="tempProduct.description"
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
                  <label class="form-check-label" for="is_enabled">ENABLE</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-third" data-dismiss="modal" type="button">CANCEL</button>
          <button @click="updateProduct" class="btn btn-primary" type="button">
            <i class="fas fa-circle-notch fa-spin" v-if="status.itemUpdating"></i> ACCEPT
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'productModal',
  components: {},

  data() {
    return {
      isNew: false
    };
  },

  methods: {
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $('#productModal').modal('show');
    }
  }
};
</script>
