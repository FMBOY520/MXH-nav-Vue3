<script setup>
import { ref } from 'vue'

// 内容
const content = ref('欢迎来到喵星汇，一个用于收藏个人常用网站的导航，此网站用于分享一些开发类、娱乐类、音乐类和影视类等网站，也会分享一些开源项目。此项目的开源地址：<a href="https://gitee.com/FMBOY/mxh-nav" target="_blank" style="color: #c6c9cf;">点我</a>')
// 网站版本
const version = ref('1.0.0')
</script>

<template>
  <footer>
    <!-- ---------- 信息 ---------- -->
    <div class="info">
      <div class="info-left">
        <div class="title">
          <div class="logo">
            <img src="/favicon.ico" alt="">
          </div>
          <div class="name">
            <h2>喵星汇</h2>
            <p>mxh.fmboy.com</p>
          </div>
        </div>
        <div class="content" v-html="content"></div>
      </div>

      <div class="info-conter">
        <a target="_blank"
          href="https://qm.qq.com/cgi-bin/qm/qr?k=EcLOPfOlyracU7D30tuxcZT5va5oMsq5&jump_from=webapi&authKey=ir7Xc3FeaPDeuBO1X7o2UEuOz7dERRQWd548kM3JYFALR7HCob5ELEH9imuWBKJ3">
          <img src="@/assets/icon/QQ.svg" alt="">
        </a>
        <a target="_blank" href="mailto:fmboy520@qq.com">
          <img src="@/assets/icon/Email.svg" alt="">
        </a>
      </div>

      <div class="info-right">
        <div class="QR">
          <div class="url"><img src="@/assets/img/QR/FMBOY-GongZhongHao.jpg" alt=""></div>
          <p class="title">公众号</p>
        </div>
        <div class="QR">
          <div class="url"><img src="@/assets/img/QR/FMBOY-ZanShangMa.jpg" alt=""></div>
          <p class="title">微信赞赏</p>
        </div>
      </div>
    </div>
    <!-- ---------- 版权 ---------- -->
    <div class="copyright">
      <span class="info">Copyright © 2024-2025&nbsp;<a href="/" style="color: #c6c9cf;">喵星汇</a></span>
      <span class="version">网站版本：{{ version }}</span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  padding: 20px;
  background-color: #1a1a1a;

  /* ---------- 信息 ---------- */
  .info {
    display: flex;

    .info-left {
      width: 100%;

      .title {
        margin: 20px 0;

        .logo {
          display: inline-block;
          margin-right: 5px;
          width: 40px;

          img {
            width: 100%;
          }
        }

        .name {
          display: inline-block;
          color: #7700ff;

          h2 {
            font-size: 25px;
            font-family: 'youyuan';
          }

          p {
            font-size: 14px;
            font-family: 'simhei';
          }
        }

      }

      .content {
        color: #6c757d;
        font-size: 14px;
      }
    }

    .info-conter {
      padding: 20px;
      width: 100%;

      a {
        display: inline-block;
        margin: 4px;
        padding: 8px;
        width: 35px;
        height: 35px;
        background-color: #363738;
        border-radius: 10px;
        transition: .2s;

        img {
          width: 100%;
        }
      }

      a:hover {
        background-color: #202224;
      }
    }

    .info-right {
      padding: 20px 0;
      width: 100%;
      text-align: right;

      .QR {
        display: inline-block;
        margin: 0 10px;
        width: 100px;

        .url {
          padding: 5px;
          width: 100px;
          height: 100px;
          background-color: #363738;
          border-radius: 5px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .title {
          margin: 10px 0;
          color: #6c757d;
          font-size: 10px;
          text-align: center;
        }
      }
    }
  }

  /* ---------- 版权 ---------- */
  .copyright {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
    color: #6c757d;
    font-size: 12px;
  }

  /* ---------- 移动端适配 ---------- */
  @media(max-width:600px) {

    /* ---------- 信息 ---------- */
    .info {
      flex-wrap: wrap;

      .info-left {
        .title {
          text-align: center;
        }

        .content {
          text-align: center;
        }
      }

      .info-conter {
        text-align: center;
      }

      .info-right {
        text-align: center;
      }
    }

    /* ---------- 版权 ---------- */
    .copyright {
      display: block;
      text-align: center;

      .info {
        display: block;
        margin-bottom: 10px;
      }

      .version {
        display: block;
        color: #505050;
        font-size: 10px;
      }
    }
  }
}
</style>