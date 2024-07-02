<template>
  <div class="wrap">
    <div class="area" style="flex: 1">
      <div class="row-1" style="height: 100%">
        <div class="card" style="flex: 1">
          <h3 class="title">各区域物资总数量统计</h3>
          <div class="cont">
            <BaseChart :options="wzzslOptions"></BaseChart>
          </div>
        </div>
        <div class="card row-6" style="flex: 2">
          <div class="card2" style="flex: 1">
            <h3 class="title">各区域物资清点率统计</h3>
            <div class="cont jdt-wrap">
              <dl>
                <dt>东部</dt>
                <dd><el-progress stroke-linecap="butt" color="#5470c6" :stroke-width="20" :percentage="60" /></dd>
              </dl>
              <dl>
                <dt>南部</dt>
                <dd><el-progress stroke-linecap="butt" color="#5470c6" :stroke-width="20" :percentage="33" /></dd>
              </dl>
              <dl>
                <dt>西部</dt>
                <dd><el-progress stroke-linecap="butt" color="#5470c6" :stroke-width="20" :percentage="80" /></dd>
              </dl>
              <dl>
                <dt>北部</dt>
                <dd><el-progress stroke-linecap="butt" color="#5470c6" :stroke-width="20" :percentage="20" /></dd>
              </dl>
              <dl>
                <dt>中部</dt>
                <dd><el-progress stroke-linecap="butt" color="#5470c6" :stroke-width="20" :percentage="50" /></dd>
              </dl>
            </div>
          </div>
          <div class="card2" style="flex: 1">
            <h3 class="title">各区域物资接收率统计</h3>
            <div class="cont jdt-wrap">
              <dl>
                <dt>东部</dt>
                <dd><el-progress stroke-linecap="butt" color="#5470c6" :stroke-width="20" :percentage="21" /></dd>
              </dl>
              <dl>
                <dt>南部</dt>
                <dd><el-progress stroke-linecap="butt" color="#5470c6" :stroke-width="20" :percentage="12" /></dd>
              </dl>
              <dl>
                <dt>西部</dt>
                <dd><el-progress stroke-linecap="butt" color="#5470c6" :stroke-width="20" :percentage="35" /></dd>
              </dl>
              <dl>
                <dt>北部</dt>
                <dd><el-progress stroke-linecap="butt" color="#5470c6" :stroke-width="20" :percentage="11" /></dd>
              </dl>
              <dl>
                <dt>中部</dt>
                <dd><el-progress stroke-linecap="butt" color="#5470c6" :stroke-width="20" :percentage="19" /></dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="area" style="flex: 2">
      <div class="row-2" style="height: 100%">
        <div class="area" style="flex: 3">
          <div class="row-3" style="height: 100%">
            <div class="area row-4" style="flex: 1">
              <div class="card" style="flex: 1">
                <h3 class="title">全区域点位信息汇总</h3>
                <div class="cont info-wrap">
                  <dl>
                    <dt>计划点位数</dt>
                    <dd><span class="num" style="color: #5470c6">1106</span></dd>
                  </dl>
                  <dl>
                    <dt>清点点位数</dt>
                    <dd><span class="num" style="color: #fac858">106</span><b>10%</b></dd>
                  </dl>
                  <dl>
                    <dt>接收点位数</dt>
                    <dd><span class="num" style="color: #91cc75">45</span><b>4%</b></dd>
                  </dl>
                </div>
              </div>
              <div class="card" style="flex: 2">
                <h3 class="title">全区域点位接收数TOP10</h3>
                <div class="cont">
                  <BaseChart :options="dwjsTopOptions"></BaseChart>
                </div>
              </div>
            </div>
            <div class="area row-4" style="flex: 1">
              <div class="card" style="flex: 1">
                <h3 class="title">全区域单位信息汇总</h3>
                <div class="cont info-wrap">
                  <dl>
                    <dt>计划点位数</dt>
                    <dd><span class="num" style="color: #5470c6">1106</span></dd>
                  </dl>
                  <dl>
                    <dt>清点点位数</dt>
                    <dd><span class="num" style="color: #fac858">106</span><b>10%</b></dd>
                  </dl>
                  <dl>
                    <dt>接收点位数</dt>
                    <dd><span class="num" style="color: #91cc75">45</span><b>4%</b></dd>
                  </dl>
                </div>
              </div>
              <div class="card" style="flex: 2">
                <h3 class="title">全区域单位接收数TOP10</h3>
                <div class="cont">
                  <BaseChart :options="danweijsTopOptions"></BaseChart>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card row-5" style="flex: 1">
          <div class="card2" style="flex: 1">
            <h3 class="title">各区域点位数量排行统计</h3>
            <div class="cont">
              <BaseChart :options="qydwslOptions"></BaseChart>
            </div>
          </div>
          <div class="card2" style="flex: 1">
            <h3 class="title">各区域接收点位数统计</h3>
            <div class="cont">
              <BaseChart :options="qyjsdwOptions"></BaseChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import BaseChart from '@/components/BaseChart/index.vue'
import { wzzslOpt, dwjsTopOpt, danweijsTopOpt, qydwslOpt, qyjsdwOpt } from './chartsConfig.js'

onMounted(() => {})

const wzzslOptions = reactive(wzzslOpt)
const dwjsTopOptions = reactive(dwjsTopOpt)
const danweijsTopOptions = reactive(danweijsTopOpt)

const qydwslOptions = reactive(qydwslOpt)
const qyjsdwOptions = reactive(qyjsdwOpt)
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  @include flex(column, 20px);
  // 隐式区域
  .area {
    // background: #f5f5f5;
    height: 100%;
  }
  // 显式区域
  .card {
    background-color: #fff;
    border: #ddd 1px solid;
    border-radius: 6px;
    height: 100%;
    @include flex(column, 0px);
    .title {
      padding-top: 10px;
      padding-bottom: 5px;
      font-size: 18px;
      text-align: center;
      font-weight: bold;
    }
    .cont {
      flex: 1;
    }
  }
  .card2 {
    height: 100%;
    @include flex(column, 0px);
    .title {
      padding-top: 10px;
      padding-bottom: 5px;
      font-size: 18px;
      text-align: center;
      font-weight: bold;
    }
    .cont {
      flex: 1;
    }
  }
  // 进度条
  .jdt-wrap {
    padding: 5px 50px 10px;
    box-sizing: border-box;
    @include flex(column, 18px);
    justify-content: center;
    align-items: center;
    ::v-deep(.el-progress) {
      margin: 0 !important;
    }
    dl {
      @include flex(row, 10px);
      width: 100%;
      dt {
        width: 60px;
      }
      dd {
        flex: 1;
      }
    }
  }
  .info-wrap {
    padding: 5px 50px 10px;
    box-sizing: border-box;
    @include flex(column, 18px);
    justify-content: center;
    align-items: center;
    dl {
      @include flex(row, 10px);
      width: 100%;
      dt {
        width: 120px;
        display: flex;
        align-items: center;
        font-size: 18px;
      }
      dd {
        flex: 1;
        text-align: right;
      }
      span {
        font-size: 36px;
        font-weight: bold;
      }
      b {
        display: inline-block;
        width: 40px;
        margin-left: 6px;
        border: #ddd 1px solid;
        text-align: center;
        border-radius: 4px;
      }
    }
  }

  .row-1 {
    @include flex(row, 15px);
  }
  .row-2 {
    @include flex(row, 15px);
  }
  .row-3 {
    @include flex(column, 15px);
  }
  .row-4 {
    @include flex(row, 15px);
  }
  .row-5 {
    @include flex(column, 15px);
  }
  .row-6 {
    @include flex(row, 15px);
  }
}
</style>
