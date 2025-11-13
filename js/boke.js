// 获取所有详情按钮
const detailBtns = document.querySelectorAll('.detail-btn');
const articleDetailBtns = document.querySelectorAll('.article-detail-btn');

// 为开发日志详情按钮添加点击事件
detailBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    // 找到对应的解决步骤容器
    const solutionDiv = this.nextElementSibling;

    // 切换显示状态
    if (solutionDiv.style.display === 'none') {
      solutionDiv.style.display = 'block';
      this.classList.add('active');
    } else {
      solutionDiv.style.display = 'none';
      this.classList.remove('active');
    }
  });
});

// 为文章详情按钮添加点击事件
articleDetailBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    // 找到对应的完整内容容器 - 通过父元素查找
    const articleItem = this.closest('.article-item');
    const fullContentDiv = articleItem.querySelector('.article-full-content');

    // 切换显示状态
    if (fullContentDiv.style.display === 'none') {
      fullContentDiv.style.display = 'block';
      this.classList.add('active');
      this.innerHTML = '收起内容 <span class="iconfont icon-jiantouyou"></span>';
    } else {
      fullContentDiv.style.display = 'none';
      this.classList.remove('active');
      this.innerHTML = '阅读全文 <span class="iconfont icon-jiantouyou"></span>';
    }
  });
});