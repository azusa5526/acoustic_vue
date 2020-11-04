<template>
  <div class="d-flex flex-column vh-100">
    <Navbar></Navbar>

    <div class="content">
      <div class="appointment container mb-12">
        <div class="text-center py-6 py-md-8">
          <h2>預約試聽</h2>
        </div>

        <form class="px-0 px-md-12 px-lg-13 mb-11">
          <h4 class="mb-6">預約內容</h4>

          <div class="form-group row no-gutters align-items-center">
            <div class="col-sm-3 col-lg-2">
              <label for="serviceSelect">預約項目</label>
            </div>
            <div class="col-sm-9 col-lg-10">
              <select class="form-control" id="serviceSelect">
                <option class="d-none">--- 請選擇 ---</option>
                <option value="書架型">書架型音響試聽</option>
                <option value="落地型">落地型音響試聽</option>
                <option value="家庭劇院">家庭劇院音響試聽</option>
                <option value="其他">其他器材適用(AMP、SUB)</option>
              </select>
            </div>
          </div>

          <div class="form-group row no-gutters align-items-center">
            <div class="col-sm-3 col-lg-2 pr-0">
              <label for="productName">詳細型號</label>
            </div>
            <div class="col-sm-9 col-lg-10">
              <input type="text" class="form-control" id="productName" />
            </div>
          </div>

          <div class="form-group row no-gutters align-items-center mb-12">
            <div class="col-sm-3 col-lg-2 pr-0">
              <label for="date">預約時間</label>
            </div>
            <div class="col-sm-9 col-lg-10">
              <input type="datetime-local" class="form-control" id="tel" />
            </div>
          </div>

          <h4 class="mb-6">聯絡資料</h4>

          <div class="form-group row no-gutters align-items-center">
            <div class="col-sm-3 col-lg-2 pr-0">
              <label for="name">預約人姓名</label>
            </div>
            <div class="col-sm-9 col-lg-10">
              <input type="text" class="form-control" id="name" aria-describedby="emailHelp" />
            </div>
          </div>

          <div class="form-group row no-gutters align-items-center">
            <div class="col-sm-3 col-lg-2 pr-0">
              <label for="email">Email信箱</label>
            </div>
            <div class="col-sm-9 col-lg-10">
              <input type="email" class="form-control" id="email" aria-describedby="emailHelp" />
            </div>
          </div>

          <div class="form-group row no-gutters align-items-center">
            <div class="col-sm-3 col-lg-2 pr-0">
              <label for="tel">手機號碼</label>
            </div>
            <div class="col-sm-9 col-lg-10">
              <input type="tel" class="form-control" id="tel" />
            </div>
          </div>

          <button type="submit" class="offset-sm-3 offset-lg-2 btn btn-primary px-8">
            送出預約申請
          </button>
        </form>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  name: 'Appointment',
  components: {
    Navbar,
    Footer
  }
};
</script>
