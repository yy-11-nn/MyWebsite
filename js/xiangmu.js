document.addEventListener('DOMContentLoaded', function () {
  const detailBtns = document.querySelectorAll('.detail-btn');
  const projectItems = document.querySelectorAll('.project-item');

  // 详情按钮点击事件
  detailBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const projectName = this.closest('.project-item').querySelector('.project-name').textContent;
      alert(`查看项目详情: ${projectName}\n(功能开发中)`);
    });
  });

  // 添加简单的页面加载动画
  projectItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 + index * 150);
  });
});