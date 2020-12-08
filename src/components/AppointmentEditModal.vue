<template>
  <div
    aria-hidden="true"
    aria-labelledby="exampleModalLabel"
    class="modal fade"
    id="editAppointmentModal"
    role="dialog"
    tabindex="-1"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>編輯預約</span>
          </h5>
          <button aria-label="Close" class="close" data-dismiss="modal" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-for="item in tempAppointments" :key="item.id" class="mb-5">
            <div class="card">
              <div class="card-header d-flex justify-content-between align-items-center py-3">
                <div class="appointmentTitle">{{ item.time }} {{ item.name }}</div>
                <div class="appointmentEdit" v-if="item.isConfirmed === 'unchecked'">
                  <button
                    class="btn btn-sm btn-primary"
                    type="button"
                    @click="uploadAppointment(item.id, 'confirm')"
                  >
                    確認
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    data-dismiss="modal"
                    type="button"
                    @click="uploadAppointment(item.id, 'reject')"
                  >
                    拒絕
                  </button>
                </div>
              </div>
              <table class="table mb-0">
                <tbody>
                  <tr>
                    <th width="75px" class="border-right text-center p-2">型號</th>
                    <td class="p-2 pl-5">{{ item.title }}</td>
                  </tr>
                  <tr>
                    <th width="75px" class="border-right text-center p-2">日期</th>
                    <td class="p-2 pl-5">{{ item.date }}</td>
                  </tr>
                  <tr>
                    <th width="75px" class="border-right text-center p-2">時間</th>
                    <td class="p-2 pl-5">{{ item.time }}</td>
                  </tr>
                  <tr>
                    <th width="75px" class="border-right text-center p-2">狀態</th>
                    <td v-if="item.isConfirmed === 'unchecked'" class="p-2 pl-5 text-info">
                      預約處理中
                    </td>
                    <td v-if="item.isConfirmed === 'confirm'" class="p-2 pl-5 text-success">
                      預約成功
                    </td>
                    <td v-if="item.isConfirmed === 'reject'" class="p-2 pl-5 text-danger">
                      預約失敗
                    </td>
                  </tr>
                  <tr>
                    <th width="75px" class="border-right text-center p-2">訊息</th>
                    <td v-if="item.isConfirmed === 'unchecked'">
                      <select
                        class="form-control"
                        id="messageSelect"
                        name="訊息選擇"
                        v-model="tempMessage"
                      >
                        <option value="" selected="selected">--- 請選擇 ---</option>
                        <option value="預約完成，期待您的到來">預約完成，期待您的到來</option>
                        <option value="預約失敗，器材或空間不足">預約失敗，器材或空間不足</option>
                        <option value="預約失敗，該時段預約已滿">預約失敗，該時段預約已滿</option>
                      </select>
                    </td>
                    <td v-else>
                      {{ item.message }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery';

export default {
  name: '',
  components: {},

  data() {
    return {};
  },

  created() {}
};
</script>
